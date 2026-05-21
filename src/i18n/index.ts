// i18n utility: t(locale, key) with fallback chain.
//
// Usage in Astro components:
//   import { t } from '~/i18n';
//   <a>{t(lang, 'nav.reader')}</a>
//   <p>{t(lang, 'footer.versionMeta', { version: '0.9.2', lastUpdated: '05/19/26' })}</p>

import { DEFAULT_LOCALE, DICT_FALLBACK, type Locale } from './locales';
import type { UIDict } from './ui/en';
import enDict from './ui/en';
import jaDict from './ui/ja';
import koDict from './ui/ko';
import zhHansDict from './ui/zh-Hans';
import zhHantDict from './ui/zh-Hant';

const DICTS: Record<Locale, UIDict> = {
	en: enDict,
	'zh-Hans': zhHansDict,
	'zh-Hant': zhHantDict,
	ja: jaDict,
	ko: koDict,
};

// Type-level dotted key extraction. Recurses into nested objects.
type DotKeys<T, Prefix extends string = ''> = {
	[K in keyof T & string]: T[K] extends Record<string, unknown>
		? DotKeys<T[K], `${Prefix}${K}.`>
		: `${Prefix}${K}`;
}[keyof T & string];

export type TranslationKey = DotKeys<UIDict>;

function getByPath(dict: UIDict, key: string): string | undefined {
	const segs = key.split('.');
	// biome-ignore lint/suspicious/noExplicitAny: traversing typed dict
	let cur: any = dict;
	for (const s of segs) {
		if (cur && typeof cur === 'object' && s in cur) cur = cur[s];
		else return undefined;
	}
	return typeof cur === 'string' ? cur : undefined;
}

function interpolate(
	template: string,
	params?: Record<string, string | number>,
): string {
	if (!params) return template;
	return template.replace(/\{(\w+)\}/g, (_, k) =>
		k in params ? String(params[k]) : `{${k}}`,
	);
}

/**
 * Look up a translation. Follows DICT_FALLBACK chain when key missing in target locale.
 * Throws in development if key is missing in all locales (catches typos at build time).
 */
export function t(
	locale: Locale,
	key: TranslationKey,
	params?: Record<string, string | number>,
): string {
	const chain: Locale[] = [locale, ...DICT_FALLBACK[locale]];
	for (const lang of chain) {
		const found = getByPath(DICTS[lang], key);
		if (found !== undefined) return interpolate(found, params);
	}
	// Final fallback: try the default locale even if not in chain (defensive).
	const lastResort = getByPath(DICTS[DEFAULT_LOCALE], key);
	if (lastResort !== undefined) return interpolate(lastResort, params);
	// Loud failure — catches typos in dev / build.
	throw new Error(`i18n: missing translation for "${key}" (locale=${locale})`);
}

export type { Locale } from './locales';
// Re-exports for convenience.
export {
	DEFAULT_LOCALE,
	HTML_LANG,
	isLocale,
	LOCALES,
	NATIVE_NAMES,
} from './locales';
