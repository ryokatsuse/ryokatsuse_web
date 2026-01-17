import type { APIContext } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { getOgImage } from '../../components/OgImage';

// ブログ記事の型を定義
type BlogEntry = {
  slug: string;
  data: {
    title: string;
    publishDate: string;
    ogImageURL?: string;
    twitterCard?: string;
    description?: string;
    updatedDate?: string;
  };
};

// 静的ビルド用に設定を変更
export const prerender = true;

// SSGの場合に使用するパス設定
export async function getStaticPaths() {
  try {
    const posts = await getCollection('blog');

    return posts.map(post => ({
      params: { slug: post.slug.replace(/\//g, '-') },
    }));
  } catch (error) {
    console.error('getStaticPathsエラー:', error);
    return [];
  }
}

export async function GET({ params, request }: APIContext) {
  if (!params.slug) {
    console.error('slugパラメータがありません');
    throw new Error('slugパラメータが指定されていません');
  }

  try {
    // キャッシュバスティング用のクエリパラメータを取得
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.has('t');

    // サーブするときのキャッシュヘッダー設定
    const cacheHeaders = forceRefresh
      ? { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      : { 'Cache-Control': 'public, max-age=31536000, immutable' };

    // 単純なテキスト文字列のケース（テストページからのリクエスト）
    if (params.slug.startsWith('これは') || params.slug.includes('テスト')) {
      const body = await getOgImage(decodeURIComponent(params.slug));
      return new Response(new Uint8Array(body), {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          ...cacheHeaders,
        },
      });
    }

    // ブログ記事のケースを処理
    const originalSlug = params.slug.replace(/-/g, '/');

    try {
      // まず通常のスラグでの検索
      let post: BlogEntry | null = null;
      try {
        const result = await getEntry('blog', originalSlug);
        if (result) {
          post = result as BlogEntry;
        }
      } catch {
        post = null;
      }

      if (post) {
        console.log(`記事が見つかりました: ${originalSlug}, タイトル: ${post.data.title}`);
        const body = await getOgImage(post.data.title || 'No title');
        return new Response(new Uint8Array(body), {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            ...cacheHeaders,
          },
        });
      }
    } catch (error) {
      console.error(`通常スラグでの検索エラー: ${error}`);
    }

    // 日付形式のスラグの場合（例: 2022-1219 → 2022/1219）
    const dateMatch = params.slug.match(/^(\d{4})[/-](.+)$/);
    if (dateMatch) {
      try {
        const year = dateMatch[1];
        const restSlug = dateMatch[2];
        const formattedSlug = `${year}/${restSlug}`;

        let post: BlogEntry | null = null;
        try {
          const result = await getEntry('blog', formattedSlug);
          if (result) {
            post = result as BlogEntry;
          }
        } catch {
          post = null;
        }

        if (post) {
          console.log(`記事が見つかりました: ${formattedSlug}, タイトル: ${post.data.title}`);
          const body = await getOgImage(post.data.title || 'No title');
          return new Response(new Uint8Array(body), {
            status: 200,
            headers: {
              'Content-Type': 'image/png',
              ...cacheHeaders,
            },
          });
        }
      } catch (error) {
        console.error(`日付形式での検索エラー: ${error}`);
      }
    }

    // 記事が見つからない場合は、すべての記事を取得して類似のスラグを探す
    try {
      const allPosts = (await getCollection('blog')) as BlogEntry[];

      // スラグの一部が一致する記事を検索
      const searchSlug = originalSlug.replace(/^(\d{4})\//, '$1/');
      const matchingPost = allPosts.find(
        post =>
          post.slug.includes(searchSlug) ||
          searchSlug.includes(post.slug) ||
          post.slug.endsWith(originalSlug.split('/').pop() || ''),
      );

      if (matchingPost) {
        console.log(`類似スラグで記事が見つかりました: ${matchingPost.slug}, タイトル: ${matchingPost.data.title}`);
        const body = await getOgImage(matchingPost.data.title || 'No title');
        return new Response(new Uint8Array(body), {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            ...cacheHeaders,
          },
        });
      }
    } catch (error) {
      console.error(`類似スラグ検索エラー: ${error}`);
    }

    // それでも見つからない場合はスラグからタイトルを生成
    console.log(`記事が見つかりません。スラグからタイトルを生成: ${params.slug}`);
    const body = await getOgImage(decodeURIComponent(params.slug.replace(/-/g, ' ')));
    return new Response(new Uint8Array(body), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        ...cacheHeaders,
      },
    });
  } catch (error) {
    console.error('OG画像生成エラー:', error);
    // エラーが発生した場合でもレスポンスを返す
    try {
      // デフォルトのエラー画像を返す（黒背景に白文字）
      const defaultErrorImage = await getOgImage('画像生成エラー');
      return new Response(new Uint8Array(defaultErrorImage), {
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
