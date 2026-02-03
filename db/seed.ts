import { db, Likes } from 'astro:db';

// https://astro.build/db/seed
// 開発環境用のテストデータ
export default async function seed() {
  await db.insert(Likes).values([
    { slug: '2026/burikaigi-2026', count: 15 },
    { slug: '2025/markuplint', count: 8 },
    { slug: '2025/2025-recap', count: 23 },
    { slug: '2025/a11y-chiba-2025', count: 5 },
    { slug: '2025/eratosthenes', count: 12 },
  ]);
}
