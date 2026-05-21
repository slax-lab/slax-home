import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

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
		locales: ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'],
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
				},
			},
			filter: (page) => !page.includes('/admin/'),
		}),
	],
});
