import dayjs from './dayjs';

interface RssItem {
  title: string;
  slug: string;
  isExternal: boolean;
  meta: string;
}

/**
 * XML文字列から特定のタグの値を抽出する
 */
const extractValue = (text: string, tag: string): string => {
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\\[CDATA\\\[)?(.*?)(?:\\\]\\\]>)?<\/${tag}>`,
    's',
  );
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

/**
 * ScrapboxのRSSフィードからデータを取得する
 */
export async function fetchRssData(
  url: string,
  limit = 10,
): Promise<RssItem[]> {
  try {
    const response = await fetch(url);
    const text = await response.text();

    // アイテムを抽出
    const items: string[] = [];
    let remainingText = text;
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while (
      (match = itemRegex.exec(remainingText)) !== null &&
      items.length < limit
    ) {
      items.push(match[0]);
    }

    // RSSアイテムを整形
    return items.map((item) => {
      const title = extractValue(item, 'title').replace(
        /\<!\[CDATA\[(.*?)\]\]>/,
        '$1',
      );
      const link = extractValue(item, 'link');
      const pubDate = extractValue(item, 'pubDate');

      return {
        title,
        slug: link,
        isExternal: true,
        meta: `<time datetime="${new Date(pubDate).toISOString()}">
          ${dayjs(pubDate).tz().format('LL')}
        </time>`,
      };
    });
  } catch (error) {
    console.error('RSSデータの取得に失敗しました:', error);
    return [];
  }
}
