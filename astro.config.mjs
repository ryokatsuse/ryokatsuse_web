import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { markdownComponents } from './src/integrations/markdown-components';
import { components } from './src/markdownComponents';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryokatsu.dev',
  integrations: [
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    mdx(),
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
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
  markdown: {
    // マークダウンのシンタックスハイライト
    syntaxHighlight: 'prism',
    // リハイドレーションを有効化（マークダウン内のコンポーネントを使用可能に）
    rehypePlugins: [],
    // カスタムコンポーネントを設定
    components: components,
  },
});
