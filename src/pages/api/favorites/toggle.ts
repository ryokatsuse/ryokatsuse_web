import type { APIContext } from 'astro';

const createErrorResponse = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const createSuccessResponse = (data: Record<string, unknown>) =>
  new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

const toggleFavoriteItem = (
  favorites: string[],
  slug: string,
): [string[], boolean] => {
  const isFavorite = favorites.includes(slug);

  const newFavorites = isFavorite
    ? favorites.filter((f: string) => f !== slug)
    : [...favorites, slug];

  return [newFavorites, !isFavorite];
};

export async function POST(context: APIContext) {
  const body = await context.request.json().catch(() => ({}));
  const slug = body?.slug;

  if (!slug) {
    return createErrorResponse('Slug parameter is required');
  }

  const favorites = (await context.session?.get('article_favorites')) ?? [];

  const [newFavorites, isFavorite] = toggleFavoriteItem(favorites, slug);

  context.session?.set('article_favorites', newFavorites);

  return createSuccessResponse({
    isFavorite,
    count: newFavorites.length,
  });
}
