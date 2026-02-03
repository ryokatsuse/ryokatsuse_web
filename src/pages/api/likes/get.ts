import type { APIContext } from 'astro';
import { db, Likes, eq } from 'astro:db';

export async function GET(context: APIContext) {
  const slug = context.url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // セッションからこのユーザーがいいね済みかどうか確認
  const likedSlugs = (await context.session?.get('liked_articles')) ?? [];
  const hasLiked = likedSlugs.includes(slug);

  // DBからいいね数を取得
  const result = await db.select().from(Likes).where(eq(Likes.slug, slug));
  const count = result[0]?.count ?? 0;

  return new Response(JSON.stringify({ count, hasLiked }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
