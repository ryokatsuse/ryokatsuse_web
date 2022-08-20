import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryokatsu.dev/', // this line is required
  markdown: {
    remarkPlugins: [remarkInjectDescription],
  },
  integrations: [
    image(),
    mdx(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
});

function remarkInjectDescription() {
  return (tree, { data }) => {
    const firstParagraph = select('paragraph', tree);
    data.astro.frontmatter.description = toString(firstParagraph);
  };
}