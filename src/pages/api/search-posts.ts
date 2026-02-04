import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    const allBlogPosts = await getCollection('blog');
    const searchData = allBlogPosts.map((post: CollectionEntry<'blog'>) => {
      const cleanSlug = post.id.replace(/\.(md|mdx|astro)$/i, '');

      return {
        slug: cleanSlug,
        data: {
          title: post.data.title,
          publishDate: post.data.publishDate,
        },
        body: post.body || '',
      };
    });

    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600',
      },
    });
  } catch (error) {
    console.error('記事データの取得エラー:', error);
    return new Response(
      JSON.stringify({ error: '記事データの取得に失敗しました' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
