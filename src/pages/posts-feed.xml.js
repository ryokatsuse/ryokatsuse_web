import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { epochMilliseconds } from '../lib/datetime';

export async function GET(context) {
  const allBlogEntries = (await getCollection('blog')).sort(
    (a, b) =>
      epochMilliseconds(b.data.publishDate) -
      epochMilliseconds(a.data.publishDate),
  );

  return rss({
    title: 'ryokatsu.dev',
    description: '雑記やエンジニアリングの記事',
    site: context.site,
    items: allBlogEntries.map((entry) => ({
      link: new URL(`/blog/${entry.id}`, import.meta.env.SITE).toString(),
      title: entry.data.title,
      pubDate: entry.data.publishDate,
    })),
  });
}
