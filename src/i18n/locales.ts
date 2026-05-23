// Locale metadata: BCP-47 codes, native names, fallback chain.
// Keep this file zero-dep so it can be imported from anywhere (Astro components, scripts, sitemap config).

// Ordering rationale: default first → CJK home cluster → EU mature paying
// markets (de/fr/es) → Iberian extension (pt-BR follows es) → SEA emerging
// (id by larger market, then vi). This order drives the language-switcher UI.
export const LOCALES = [
	'en',
	'zh-Hans',
	'zh-Hant',
	'ja',
	'ko',
	'de',
	'fr',
	'es',
	'pt-BR',
	'id',
	'vi',
] as const;
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
	de: 'Deutsch',
	fr: 'Français',
	es: 'Español',
	'pt-BR': 'Português (Brasil)',
	id: 'Bahasa Indonesia',
	vi: 'Tiếng Việt',
};

// HTML lang attribute value. We already use BCP-47 codes so this is identity,
// but keep the indirection so we can switch (e.g. ja → ja-JP) without grepping.
export const HTML_LANG: Record<Locale, string> = {
	en: 'en',
	'zh-Hans': 'zh-Hans',
	'zh-Hant': 'zh-Hant',
	ja: 'ja',
	ko: 'ko',
	de: 'de',
	fr: 'fr',
	es: 'es',
	'pt-BR': 'pt-BR',
	id: 'id',
	vi: 'vi',
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
	de: 'de_DE',
	fr: 'fr_FR',
	es: 'es_ES',
	'pt-BR': 'pt_BR',
	id: 'id_ID',
	vi: 'vi_VN',
};

// Dictionary fallback chain when a key is missing. NOT a route fallback —
// route fallback is configured in astro.config.mjs's `i18n.fallback`.
// Rule: zh-Hant falls back to zh-Hans before en; everything else goes straight
// to en to avoid cross-language contamination.
export const DICT_FALLBACK: Record<Locale, readonly Locale[]> = {
	en: [],
	'zh-Hans': ['en'],
	'zh-Hant': ['zh-Hans', 'en'],
	ja: ['en'],
	ko: ['en'],
	de: ['en'],
	fr: ['en'],
	es: ['en'],
	'pt-BR': ['en'],
	id: ['en'],
	vi: ['en'],
};

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}
