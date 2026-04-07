// @ts-check

import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://slax.com',
	base: '/reader',
	server: {
		port: 4322,
	},
	integrations: [
		starlight({
			title: {
				en: 'Slax Reader',
				'zh-CN': 'Slax Reader',
			},

			// --- Custom CSS ---
			customCss: ['./src/styles/custom.css', './src/styles/landing.css'],

			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
				zh: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},

			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/slax-lab',
				},
				{ icon: 'twitter', label: 'Twitter', href: 'https://x.com/SlaxReader' },
			],

			sidebar: [
				{
					label: 'Guides',
					translations: { 'zh-CN': '指南' },
					items: [
						{
							label: 'Example Guide',
							translations: { 'zh-CN': '示例指南' },
							slug: 'guides/example',
						},
					],
				},
				{
					label: 'Reference',
					translations: { 'zh-CN': '参考' },
					autogenerate: { directory: 'reference' },
				},
			],

			head: [
				{ tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
				{
					tag: 'meta',
					attrs: { property: 'og:site_name', content: 'Slax Reader' },
				},
				{ tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } },
				{
					tag: 'meta',
					attrs: { property: 'og:locale:alternate', content: 'zh_CN' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
			],

			components: {
				Head: './src/components/Head.astro',
				SkipLink: './src/components/SkipLink.astro',
				Header: './src/components/NavHeader.astro',
			},
		}),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					zh: 'zh-CN',
				},
			},
		}),
	],
});
