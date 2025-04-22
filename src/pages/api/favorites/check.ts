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

export async function GET(context: APIContext) {
  const slug = context.url.searchParams.get('slug');

  if (!slug) {
    return createErrorResponse('Slug parameter is required');
  }

  const favorites = (await context.session?.get('article_favorites')) ?? [];

  const isFavorite = favorites.includes(slug);

  return createSuccessResponse({ isFavorite });
}
