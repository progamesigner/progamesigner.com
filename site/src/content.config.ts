import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ en: z.string().min(1), 'zh-tw': z.string().min(1) });

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        order: z.number().int(),
        tier: z.enum(['featured', 'shipped', 'community', 'misc']),
        name: z.string(),
        tagline: localized,
        status: z.enum(['live', 'maintained', 'archived', 'concept']),
        year: z.string(),
        stack: z.array(z.string()).min(1),
        links: z
          .object({ try: z.url().optional(), source: z.url().optional() })
          .refine((links) => links.try ?? links.source, 'A project needs a try or source link'),
        cover: image().optional(),
      })
      .strict(),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z
    .object({
      project: reference('projects'),
      lang: z.enum(['en', 'zh-tw']),
      summary: z.string(),
      role: z.string(),
      facts: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      draft: z.boolean().default(false),
    })
    .strict(),
});

export const collections = { projects, caseStudies };
