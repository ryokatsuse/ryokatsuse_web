import { defineConfig, fontProviders, sessionDrivers } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import { markdownComponents } from './src/integrations/markdown-components';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryokatsu.dev',
  output: 'server',
  adapter: vercel(),
  session: {
    driver: sessionDrivers.memory(),
  },
  integrations: [sitemap(), react(), mdx({
    // MDXファイルでグローバルに使用できるコンポーネントを設定
    components: {
      LinkCard: './src/components/LinkCard.astro',
    },
  }), markdownComponents(), db()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
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
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Noto Sans JP',
      cssVariable: '--font-noto-sans-jp',
      weights: ['400', '500', '700'],
    },
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
    },
    rehypePlugins: [],
    remarkPlugins: [],
  },
});