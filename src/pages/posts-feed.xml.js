import rss from '@astrojs/rss';
import dayjs from '../lib/dayjs';
import { getCollection } from 'astro:content';

export async function get(context) {
  const allBlogEntries = (await getCollection('blog')).sort(
    (a, b) => dayjs(b.data.publishDate).tz().valueOf() - dayjs(a.data.publishDate).tz().valueOf(),
  );

  return rss({
    title: 'ryokatsu.dev',
    description: '雑記やエンジニアリングの記事',
    site: context.site,
    items: allBlogEntries.map(entry => ({
      link: new URL(`/blog/${entry.slug}`, import.meta.env.SITE).toString(),
      title: entry.data.title,
      pubDate: entry.data.publishDate,
    })),
  });
}
