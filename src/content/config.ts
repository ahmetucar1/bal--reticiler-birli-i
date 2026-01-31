import { z, defineCollection } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonical: z.string().url().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional()
  })
});

const activities = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string().optional(),
    tags: z.array(z.string()).default([]),
    source_slide: z.string().optional(),
    featured_image: z.string().optional(),
    draft: z.boolean().optional()
  })
});

export const collections = {
  pages,
  activities
};
