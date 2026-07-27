import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url()
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.{md,mdx}'
  }),
  schema: z.object({
    title: z.string().min(1),
    packageName: z.string().min(1),
    author: z.string().min(1).default('纯水机'),
    description: z.string().min(1),
    version: z.string().min(1),
    icon: z.string().optional(),
    cover: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([]),
    downloadUrl: z.string().url().optional(),
    status: z.string().default('已发布'),
    updatedAt: z.coerce.date().optional(),
    order: z.number().optional()
  })
});

export const collections = { projects };
