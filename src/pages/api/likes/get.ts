import type { APIContext } from 'astro';
// @ts-expect-error - Astro DB型定義の問題
import { db, Likes } from 'astro:db';
import { eq } from 'drizzle-orm';

export async function GET(context: APIContext) {
  const slug = context.url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // DBからいいね数を取得
  const result = await db.select().from(Likes).where(eq(Likes.slug, slug));
  const count = result[0]?.count ?? 0;

  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
