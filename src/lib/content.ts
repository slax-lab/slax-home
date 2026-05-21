// Content collection helpers for i18n.
// All mdx files live under `src/content/<collection>/<locale>/...` after the migration.
// post.id from glob loader has the locale prefix in it; these helpers parse it out.

import type { CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, isLocale, type Locale } from '~/i18n/locales';

type AnyEntry = { id: string };

/**
 * Extract the locale prefix from a content entry id.
 * - "en/foo"       → "en"
 * - "zh-Hans/bar"  → "zh-Hans"
 * - "foo"          → "en"   (fallback: any entry without prefix is treated as default locale)
 */
export function entryLocale(idOrEntry: string | AnyEntry): Locale {
	const id = typeof idOrEntry === 'string' ? idOrEntry : idOrEntry.id;
	const first = id.split('/')[0];
	if (first && isLocale(first)) return first as Locale;
	return DEFAULT_LOCALE;
}

/**
 * Strip the locale prefix from a content entry id, returning the slug.
 * - "en/foo"          → "foo"
 * - "zh-Hans/bar/baz" → "bar/baz"
 * - "foo"             → "foo"
 */
export function entrySlug(idOrEntry: string | AnyEntry): string {
	const id = typeof idOrEntry === 'string' ? idOrEntry : idOrEntry.id;
	const segs = id.split('/');
	if (segs.length > 1 && isLocale(segs[0])) {
		return segs.slice(1).join('/');
	}
	return id;
}

/**
 * Filter a collection to a specific locale.
 */
export function filterByLocale<T extends AnyEntry>(
	entries: T[],
	locale: Locale,
): T[] {
	return entries.filter((e) => entryLocale(e) === locale);
}

/**
 * Group entries by their stripped slug so we can find translation siblings.
 * Returns `Map<slug, Map<locale, entry>>`.
 */
export function groupBySlug<T extends AnyEntry>(
	entries: T[],
): Map<string, Map<Locale, T>> {
	const out = new Map<string, Map<Locale, T>>();
	for (const e of entries) {
		const slug = entrySlug(e);
		const locale = entryLocale(e);
		if (!out.has(slug)) out.set(slug, new Map());
		out.get(slug)!.set(locale, e);
	}
	return out;
}

/**
 * For a given slug, return the list of locales that actually have a translation.
 * Used to build hreflang for content pages — we never list a locale that has no translation.
 */
export function availableLocalesForSlug<T extends AnyEntry>(
	entries: T[],
	slug: string,
): Locale[] {
	return entries
		.filter((e) => entrySlug(e) === slug)
		.map((e) => entryLocale(e));
}

// Re-export from i18n for convenience.
export type { Locale } from '~/i18n/locales';
