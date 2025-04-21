import type { APIContext } from 'astro';
import { getCollection, getEntryBySlug } from 'astro:content';
import { getOgImage } from '../../components/OgImage';

// 開発環境では動的ルーティングを使用
export const prerender = false;

// SSGの場合に使用するパス設定
export async function getStaticPaths() {
  try {
    const posts = await getCollection('blog');

    return posts.map((post: any) => ({
      params: { slug: post.slug.replace(/\//g, '-') },
    }));
  } catch (error) {
    console.error('getStaticPathsエラー:', error);
    return [];
  }
}

export async function GET({ params, request }: APIContext) {
  console.log(`OG画像リクエスト: ${params.slug}`);

  if (!params.slug) {
    console.error('slugパラメータがありません');
    throw new Error('slugパラメータが指定されていません');
  }

  try {
    // リクエストURLをログ出力
    console.log(`リクエストURL: ${request.url}`);

    // キャッシュバスティング用のクエリパラメータを取得
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.has('t');

    // サーブするときのキャッシュヘッダー設定
    const cacheHeaders = forceRefresh
      ? { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      : { 'Cache-Control': 'public, max-age=31536000, immutable' };

    // 単純なテキスト文字列のケース（テストページからのリクエスト）
    if (params.slug.startsWith('これは') || params.slug.includes('テスト')) {
      console.log(`テキストからOG画像を生成: "${params.slug}"`);
      const body = await getOgImage(decodeURIComponent(params.slug));
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          ...cacheHeaders,
        },
      });
    }

    // ブログ記事のケース
    try {
      const originalSlug = params.slug.replace(/-/g, '/');
      console.log(`ブログ記事のslugを処理: ${originalSlug}`);

      const post = await getEntryBySlug('blog', originalSlug);

      if (!post) {
        console.error(`記事が見つかりません: ${originalSlug}`);
        throw new Error(`記事が見つかりません: ${originalSlug}`);
      }

      console.log(`記事からOG画像を生成: "${post.data.title}"`);
      const body = await getOgImage(post.data.title || 'No title');

      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          ...cacheHeaders,
        },
      });
    } catch (blogError) {
      console.error(`ブログ記事取得エラー: ${blogError}`);

      // 日付形式のスラグの場合（例: 2022/1219）
      const dateMatch = params.slug.match(/^(\d{4})[/-](\d{2,4})$/);
      if (dateMatch) {
        try {
          const year = dateMatch[1];
          const dateId = dateMatch[2];
          const formattedSlug = `${year}/${dateId}`;

          console.log(`日付形式のslugで再試行: ${formattedSlug}`);
          const post = await getEntryBySlug('blog', formattedSlug);

          if (post) {
            console.log(`記事が見つかりました: ${formattedSlug}, タイトル: ${post.data.title}`);
            const body = await getOgImage(post.data.title || 'No title');
            return new Response(body, {
              status: 200,
              headers: {
                'Content-Type': 'image/png',
                ...cacheHeaders,
              },
            });
          }
        } catch (retryError) {
          console.error(`日付形式での再試行エラー: ${retryError}`);
        }
      }

      // ブログ記事が見つからない場合は、直接テキストとして処理
      console.log(`ブログ記事が見つからないため、テキストとして処理: ${params.slug}`);
      const body = await getOgImage(decodeURIComponent(params.slug.replace(/-/g, ' ')));
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          ...cacheHeaders,
        },
      });
    }
  } catch (error) {
    console.error('OG画像生成エラー:', error);
    // エラーが発生した場合でもレスポンスを返す
    try {
      // デフォルトのエラー画像を返す（黒背景に白文字）
      const defaultErrorImage = await getOgImage('画像生成エラー');
      return new Response(defaultErrorImage, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    } catch (fallbackError) {
      console.error('フォールバック画像生成エラー:', fallbackError);
      return new Response('OGP画像の生成に失敗しました', {
        status: 500,
      });
    }
  }
}
