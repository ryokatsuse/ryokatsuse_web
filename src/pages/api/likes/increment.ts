import type { APIContext } from 'astro';
import { db, Likes, eq } from 'astro:db';

export async function POST(context: APIContext) {
  const body = await context.request.json().catch(() => ({}));
  const slug = body?.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // セッションでいいね済みかどうか確認
  const likedSlugs: string[] = (await context.session?.get('liked_articles')) ?? [];
  const hasLiked = likedSlugs.includes(slug);

  if (hasLiked) {
    const result = await db.select().from(Likes).where(eq(Likes.slug, slug));
    const count = result[0]?.count ?? 0;
    return new Response(JSON.stringify({ count, hasLiked: true, message: 'Already liked' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const existing = await db.select().from(Likes).where(eq(Likes.slug, slug));

  if (existing.length > 0) {
    await db.update(Likes).set({ count: existing[0].count + 1 }).where(eq(Likes.slug, slug));
  } else {
    await db.insert(Likes).values({ slug, count: 1 });
  }

  // セッションにいいね済みを記録
  await context.session?.set('liked_articles', [...likedSlugs, slug]);

  const result = await db.select().from(Likes).where(eq(Likes.slug, slug));
  const newCount = result[0]?.count ?? 1;

  return new Response(JSON.stringify({ count: newCount, hasLiked: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
