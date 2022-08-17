import rss from '@astrojs/rss';
import dayjs from '../lib/dayjs';

const postResult = import.meta.glob('./blog/*/*.md', { eager: true });
const posts = Object.values(postResult);
posts.sort((a, b) => dayjs(b.frontmatter.publishDate).tz().valueOf() - dayjs(a.frontmatter.publishDate).tz().valueOf());

export const get = () =>
  rss({
    title: 'ryokatsu.dev',
    description: '雑記やエンジニアリングの記事',
    site: import.meta.env.SITE,
    items: posts.map(post => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: dayjs(post.frontmatter.publishDate).tz().toDate(),
    })),
  });
