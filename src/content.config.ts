import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    ogImageURL: z.string().optional(),
    twitterCard: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
