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
					label: 'Blog',
					translations: { 'zh-CN': '博客' },
					collapsed: false,
					items: [
						{ label: 'All Posts', slug: 'blog' },
						{ label: 'A Smarter Way to Save & Read Forever', slug: 'blog/a-smarter-more-efficient-ai-powered-way-to-save-and-read-forever' },
						{ label: 'Open-Source Pocket Alternative', slug: 'blog/built-an-open-source-pocket-alternative' },
						{ label: 'Save Content Permanently & Simplify Learning', slug: 'blog/built-an-open-source-tool-to-save-content-permanently-and-simplify-learning' },
					],
				},
				{
					label: 'Compare',
					translations: { 'zh-CN': '对比' },
					collapsed: false,
					items: [
						{ label: 'Overview', slug: 'compare' },
						{ label: 'vs Instapaper', slug: 'compare/slax-reader-vs-instapaper' },
					],
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
				Footer: './src/components/Footer.astro',
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
