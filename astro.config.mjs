import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { markdownComponents } from './src/integrations/markdown-components';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryokatsu.dev',
  output: 'static',
  integrations: [
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    mdx({
      // MDXファイルでグローバルに使用できるコンポーネントを設定
      components: {
        LinkCard: './src/components/LinkCard.astro',
      },
    }),
    markdownComponents(),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
      include: [],
    },
    // SSRの問題に対処する設定を追加
    ssr: {
      // 外部化しない依存関係を指定
      noExternal: [],
      // 外部化する依存関係を明示的に指定
      external: ['node:*'],
    },
    // パターンマッチングの問題を解決
    build: {
      // rollupオプションを追加
      rollupOptions: {
        // 外部依存関係を明示的に設定
        external: [],
      },
    },
    // 解決方法を明示的に設定
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Noto Sans JP',
        cssVariable: '--font-noto-sans-jp',
        weights: ['400', '500', '700'],
      },
    ],
  },
  markdown: {
    // マークダウンのシンタックスハイライト
    syntaxHighlight: 'prism',
    // シンタックスハイライト用のテーマを指定
    shikiConfig: {
      theme: 'github-dark',
    },
    // リハイドレーションを有効化（マークダウン内のコンポーネントを使用可能に）
    rehypePlugins: [],
    // コンポーネントを設定（PrismJSを使用するため）
    remarkPlugins: [],
  },
});
