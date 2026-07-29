/**
 * OGP画像をビルド前に静的生成して public/og/ へ書き出すスクリプト。
 *
 * Cloudflare Workers 上では @resvg/resvg-js（ネイティブバイナリ）が動かず、
 * Worker バンドルにも含められないため、Astro のルートではなく Node 側で
 * 事前生成する。出力パスは従来のエンドポイント `/og/<slug>.png` と同一なので
 * ページ側の参照は変更不要。
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { getOgImage } from '../src/components/OgImage.js';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'og');
const POEM_PREFIX = 'poems-';

const COLLECTIONS = [
  { dir: path.join(ROOT, 'src', 'content', 'blog'), prefix: '' },
  { dir: path.join(ROOT, 'src', 'content', 'poems'), prefix: POEM_PREFIX },
];

// 全記事を作り直したいときは `pnpm og --force`
const force = process.argv.includes('--force');

type Entry = { slug: string; title: string; sourcePath: string };

async function collectFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const full = path.join(dir, dirent.name);
      if (dirent.isDirectory()) return collectFiles(full);
      return /\.mdx?$/.test(dirent.name) ? [full] : [];
    }),
  );
  return files.flat();
}

function extractTitle(source: string, filePath: string): string {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`frontmatter が見つかりません: ${filePath}`);
  }
  const data = parseYaml(match[1]) as { title?: unknown };
  if (typeof data?.title !== 'string') {
    throw new Error(`title が見つかりません: ${filePath}`);
  }
  return data.title;
}

async function collectEntries(): Promise<Entry[]> {
  const entries: Entry[] = [];

  for (const { dir, prefix } of COLLECTIONS) {
    for (const filePath of await collectFiles(dir)) {
      // Astro の glob ローダーと同じ id（拡張子なしの相対パス）を再現する
      const id = path
        .relative(dir, filePath)
        .replace(/\.mdx?$/, '')
        .split(path.sep)
        .join('/');
      const source = await fs.readFile(filePath, 'utf-8');
      entries.push({
        slug: `${prefix}${id.replace(/\//g, '-')}`,
        title: extractTitle(source, filePath),
        sourcePath: filePath,
      });
    }
  }

  return entries;
}

/** 出力済みPNGがソースより新しければ再生成をスキップする */
async function isUpToDate(outPath: string, sourcePath: string) {
  if (force) return false;
  try {
    const [out, source] = await Promise.all([
      fs.stat(outPath),
      fs.stat(sourcePath),
    ]);
    return out.mtimeMs >= source.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const entries = await collectEntries();
  let generated = 0;
  let skipped = 0;

  for (const entry of entries) {
    const outPath = path.join(OUT_DIR, `${entry.slug}.png`);

    if (await isUpToDate(outPath, entry.sourcePath)) {
      skipped++;
      continue;
    }

    const png = await getOgImage(entry.title);
    await fs.writeFile(outPath, png);
    generated++;
  }

  console.log(
    `[og] ${entries.length} 件中 ${generated} 件を生成、${skipped} 件はキャッシュ済み → public/og/`,
  );
}

await main();
