import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
	}),
});

const readerAlternatives = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/reader-alternatives',
	}),
	schema: z.object({
		title: z.string(),
		competitor: z.string(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const noteAlternatives = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/note-alternatives',
	}),
	schema: z.object({
		title: z.string(),
		competitor: z.string(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
	}),
});

export const collections = { blog, readerAlternatives, noteAlternatives };
