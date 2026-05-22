// Locale metadata: BCP-47 codes, native names, fallback chain.
// Keep this file zero-dep so it can be imported from anywhere (Astro components, scripts, sitemap config).

export const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// Locales that get a URL prefix. DEFAULT_LOCALE is intentionally absent.
export const PREFIXED_LOCALES: readonly Locale[] = LOCALES.filter(
	(l) => l !== DEFAULT_LOCALE,
);

// Display the language in its own script (used in language switcher).
export const NATIVE_NAMES: Record<Locale, string> = {
	en: 'English',
	'zh-Hans': '简体中文',
	'zh-Hant': '繁體中文',
	ja: '日本語',
	ko: '한국어',
};

// HTML lang attribute value. We already use BCP-47 codes so this is identity,
// but keep the indirection so we can switch (e.g. ja → ja-JP) without grepping.
export const HTML_LANG: Record<Locale, string> = {
	en: 'en',
	'zh-Hans': 'zh-Hans',
	'zh-Hant': 'zh-Hant',
	ja: 'ja',
	ko: 'ko',
};

// Open Graph locale codes follow the Facebook `ll_CC` spec — different from
// BCP-47. LinkedIn / Facebook silently drop unrecognized values; Google does
// not care. Map locale → canonical ll_CC.
export const OG_LOCALE: Record<Locale, string> = {
	en: 'en_US',
	'zh-Hans': 'zh_CN',
	'zh-Hant': 'zh_TW',
	ja: 'ja_JP',
	ko: 'ko_KR',
};

// Dictionary fallback chain when a key is missing. NOT a route fallback —
// route fallback is configured in astro.config.mjs's `i18n.fallback`.
// Rule: zh-Hant falls back to zh-Hans before en; ja/ko go straight to en
// to avoid cross-language CJK contamination.
export const DICT_FALLBACK: Record<Locale, readonly Locale[]> = {
	en: [],
	'zh-Hans': ['en'],
	'zh-Hant': ['zh-Hans', 'en'],
	ja: ['en'],
	ko: ['en'],
};

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}
