import type { APIContext } from 'astro';
import { getOgImage } from '../../components/OgImage';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

// サーバーサイドレンダリングを有効にする場合は、この行のコメントを解除してください
// export const prerender = false;

// 静的生成のための全パスを生成
export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');

  return blogEntries.map((entry: CollectionEntry<'blog'>) => {
    // スラッグのフォーマットを変更（スラッシュをハイフンに）
    const formattedSlug = entry.slug.replace(/\//g, '-');

    return {
      params: { slug: formattedSlug },
      props: { title: entry.data.title, originalSlug: entry.slug },
    };
  });
}

export async function GET({ params, props }: APIContext) {
  try {
    // パラメータからslugを取得
    const { slug } = params;
    // propsから直接タイトルを取得（静的生成時）
    const propsTitle = props?.title;

    if (!slug) {
      console.error('OGP画像生成エラー: slugパラメータがありません');
      return new Response('Slug parameter is required', {
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    console.log(`【OG画像】APIエンドポイントが呼び出されました: slug="${slug}"`);

    // タイトルの決定（propsから取得するか、データベースから取得するか）
    let title = propsTitle;

    // propsからタイトルが取得できない場合（動的レンダリング時など）
    if (!title) {
      // スラッグを元の形式に戻す（ハイフンをスラッシュに）
      const originalSlug = slug.replace(/-/g, '/');
      console.log(`【OG画像】元のスラッグ形式: "${originalSlug}"`);

      // Content Collectionsからエントリを取得
      try {
        const entry = await getEntry('blog', originalSlug);

        if (entry) {
          title = entry.data.title;
          console.log(`【OG画像】記事のタイトルを取得しました: "${title}"`);
        } else {
          // フォールバック: スラッグからタイトルを生成
          title = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          console.log(`【OG画像】記事が見つからなかったため、スラッグからタイトルを生成しました: "${title}"`);
        }
      } catch (entryError) {
        console.error('【OG画像】記事の取得に失敗:', entryError);
        // フォールバック: スラッグからタイトルを生成
        title = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        console.log(`【OG画像】エラーのため、スラッグからタイトルを生成しました: "${title}"`);
      }
    }

    // OGP画像を生成
    try {
      console.log(`【OG画像】画像生成を開始します: "${title}"`);
      const imageBuffer = await getOgImage(title);
      console.log(`【OG画像】画像生成に成功しました: ${imageBuffer.byteLength} バイト`);

      // 画像を返す
      return new Response(imageBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400', // 1日キャッシュ
        },
      });
    } catch (imageError) {
      console.error('【OG画像】画像生成に失敗しました:', imageError);
      throw imageError; // 再スローして外側のtry-catchで処理
    }
  } catch (error) {
    console.error('【OG画像】全体的なエラー:', error);

    // エラー時は500エラーを返す
    return new Response('Failed to generate OGP image', {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
