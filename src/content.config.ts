import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      author: z.string(),
      description: z.string(),
      created: z.date(),
      modified: z.date(),
    }),
});

const staticPages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/staticPages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    created: z.coerce.date().optional(),
    modified: z.coerce.date().optional(),
    ogPreview: z.string().optional(),
  }),
});

export const collections = { blog, staticPages };