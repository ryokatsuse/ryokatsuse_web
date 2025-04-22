import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
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
