// Hreflang + locale URL helpers.
// Borrowed from sgai's `unprefixed()` pattern, adapted for BCP-47 locale codes.

import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '~/i18n/locales';

// Site URL — keep in sync with astro.config.mjs `site` field.
// Imported here as a string because content collection schemas and scripts
// outside Astro can't read Astro.site.
export const SITE = 'https://www.slax.com';

/**
 * Strip the leading locale prefix from a path.
 * - "/zh-Hans/reader/" → "/reader/"
 * - "/reader/"         → "/reader/"  (no change, default locale has no prefix)
 * - "/zh-Hant/"        → "/"
 */
export function unprefixed(pathname: string): string {
	const trimmed = pathname.startsWith('/') ? pathname.slice(1) : pathname;
	if (trimmed === '') return '/';
	const [first, ...rest] = trimmed.split('/');
	if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
		return '/' + rest.join('/');
	}
	return pathname;
}

/**
 * Add a locale prefix to a locale-agnostic path.
 * - withLocale("/reader/", "zh-Hans") → "/zh-Hans/reader/"
 * - withLocale("/reader/", "en")      → "/reader/"
 * - withLocale("/", "zh-Hans")        → "/zh-Hans/"
 */
export function withLocale(path: string, locale: Locale): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	// Ensure trailing slash on root-like paths to match Astro's directory output
	if (locale === DEFAULT_LOCALE) return clean;
	// Strip leading slash to avoid "/zh-Hans//" if path is "/"
	if (clean === '/') return `/${locale}/`;
	return `/${locale}${clean}`;
}

/**
 * Detect the locale of a given path. Default locale if no prefix.
 */
export function detectLocale(pathname: string): Locale {
	const trimmed = pathname.startsWith('/') ? pathname.slice(1) : pathname;
	const first = trimmed.split('/')[0];
	if (first && isLocale(first)) return first as Locale;
	return DEFAULT_LOCALE;
}

export interface Alternate {
	hreflang: string;
	href: string;
}

/**
 * Build the complete <link rel="alternate"> set for a page.
 *
 * @param currentPath  Astro.url.pathname (e.g. "/zh-Hans/reader/")
 * @param available    Which locales have a translation of this page.
 *                     Default: all LOCALES (use for static pages).
 *                     For content pages, pass only the locales that actually have the slug.
 * @param siteOrigin   Absolute origin (https://www.slax.com). Defaults to SITE constant.
 */
export function buildAlternates(
	currentPath: string,
	available: readonly Locale[] = LOCALES,
	siteOrigin: string = SITE,
): Alternate[] {
	const stem = unprefixed(currentPath);
	const out: Alternate[] = available.map((lang) => ({
		hreflang: lang,
		href: new URL(withLocale(stem, lang), siteOrigin).toString(),
	}));
	// x-default always points to the default locale's URL
	if (available.includes(DEFAULT_LOCALE)) {
		out.push({
			hreflang: 'x-default',
			href: new URL(withLocale(stem, DEFAULT_LOCALE), siteOrigin).toString(),
		});
	}
	return out;
}

/**
 * Build canonical URL for the current page (always points to itself, including locale prefix).
 */
export function buildCanonical(
	currentPath: string,
	siteOrigin: string = SITE,
): string {
	return new URL(currentPath, siteOrigin).toString();
}
