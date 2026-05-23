import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { getLastmodFor } from './scripts/lastmod.mjs';

export default defineConfig({
	site: 'https://slax.com',
	server: {
		port: 4321,
	},
	build: {
		inlineStylesheets: 'always',
	},
	i18n: {
		defaultLocale: 'en',
		locales: [
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
		],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
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
				},
			},
			filter: (page) => !page.includes('/admin/'),
			serialize(item) {
				try {
					const url = new URL(item.url);
					const lm = getLastmodFor(url.pathname);
					if (lm) item.lastmod = lm;
				} catch {
					// keep default behaviour on any failure
				}
				return item;
			},
		}),
	],
});
