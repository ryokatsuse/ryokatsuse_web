import type { APIContext } from 'astro';
// @ts-expect-error - Astro DB型定義の問題
import { db, Likes } from 'astro:db';
import { eq } from 'drizzle-orm';

export async function POST(context: APIContext) {
  const body = await context.request.json().catch(() => ({}));
  const slug = body?.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const likedSlugs: string[] = (await context.session?.get('liked_articles')) ?? [];
  const hasLiked = likedSlugs.includes(slug);

  const existing = await db.select().from(Likes).where(eq(Likes.slug, slug));
  const currentCount = existing[0]?.count ?? 0;

  if (hasLiked) {
    const newCount = Math.max(0, currentCount - 1);
    if (existing.length > 0) {
      await db.update(Likes).set({ count: newCount }).where(eq(Likes.slug, slug));
    }
    const newLikedSlugs = likedSlugs.filter(s => s !== slug);
    await context.session?.set('liked_articles', newLikedSlugs);

    return new Response(JSON.stringify({ count: newCount, hasLiked: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const newCount = currentCount + 1;
    if (existing.length > 0) {
      await db.update(Likes).set({ count: newCount }).where(eq(Likes.slug, slug));
    } else {
      await db.insert(Likes).values({ slug, count: 1 });
    }
    await context.session?.set('liked_articles', [...likedSlugs, slug]);

    return new Response(JSON.stringify({ count: newCount, hasLiked: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
