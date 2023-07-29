import type { APIContext } from 'astro';
import { getCollection, getEntryBySlug } from 'astro:content';
import { getOgImage } from '../../components/OgImage';

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  return posts.map(post => ({
    params: { slug: post.slug.replace(/\//g, '-') },
  }));
}

export async function get({ params }: APIContext) {
  const originalSlug = params.slug.replace(/-/g, '/');
  const post = await getEntryBySlug('blog', originalSlug);
  const body = await getOgImage(post?.data.title ?? 'No title');

  return { body, encoding: 'binary' };
}
