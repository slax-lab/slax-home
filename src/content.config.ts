import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Common locale schema field. Optional in source files because the actual
// lang is inferred from the file path (e.g. `en/foo.mdx` → lang='en').
// See `src/lib/content.ts` for `entryLocale()` / `entrySlug()` helpers.
const langSchema = z.enum(['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko']).optional();

// Preserve original casing in entry ids (Astro lower-cases by default which breaks
// BCP-47 locale folders like `zh-Hans/`). Strip the extension only.
function preserveCaseId({ entry }: { entry: string }) {
	return entry.replace(/\.(md|mdx)$/, '');
}

const blog = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/blog',
		generateId: preserveCaseId,
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		product: z.enum(['reader', 'note', 'slax']),
		lang: langSchema,
		/** Reference to the canonical (English) slug for cross-locale linking. Defaults to same slug. */
		translationOf: z.string().optional(),
		/** Author slug from src/data/authors.ts. Defaults to DEFAULT_AUTHOR_SLUG. */
		author: z.string().optional(),
	}),
});

const readerAlternatives = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/reader-alternatives',
		generateId: preserveCaseId,
	}),
	schema: z.object({
		title: z.string(),
		competitor: z.string(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
		lang: langSchema,
		translationOf: z.string().optional(),
		author: z.string().optional(),
	}),
});

const noteAlternatives = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/note-alternatives',
		generateId: preserveCaseId,
	}),
	schema: z.object({
		title: z.string(),
		competitor: z.string(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
		lang: langSchema,
		translationOf: z.string().optional(),
		author: z.string().optional(),
	}),
});

const noteChangelog = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/note-changelog',
		generateId: preserveCaseId,
	}),
	schema: z.object({
		version: z.string(),
		date: z.coerce.date(),
		platforms: z.array(z.enum(['iOS', 'Android'])),
		lang: langSchema,
		translationOf: z.string().optional(),
	}),
});

const readerChangelog = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/reader-changelog',
		generateId: preserveCaseId,
	}),
	schema: z.object({
		version: z.string(),
		date: z.coerce.date(),
		platforms: z.array(z.enum(['iOS', 'Android', 'Web', 'Extensions'])),
		lang: langSchema,
		translationOf: z.string().optional(),
	}),
});

// Legal pages (Privacy / Terms) — long-form translated text, one entry per (locale, doc-name).
const legal = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/legal',
		generateId: preserveCaseId,
	}),
	schema: z.object({
		title: z.string(),
		updatedDate: z.coerce.date().optional(),
		lang: langSchema,
	}),
});

export const collections = {
	blog,
	readerAlternatives,
	noteAlternatives,
	noteChangelog,
	readerChangelog,
	legal,
};
