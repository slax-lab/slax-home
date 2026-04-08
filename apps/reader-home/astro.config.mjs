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
					label: 'Get Started',
					translations: { 'zh-CN': '快速上手' },
					collapsed: true,
					items: [
						{
							label: 'How to Save',
							translations: { 'zh-CN': '如何保存' },
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'get-started/how-to-save' },
								{ label: '1. Browser Extension', slug: 'get-started/how-to-save/1-browser-extension' },
								{ label: '2. Mobile App', slug: 'get-started/how-to-save/2-mobile-app' },
							],
						},
					],
				},
				{
					label: 'Blog',
					translations: { 'zh-CN': '博客' },
					collapsed: true,
					items: [
						{ label: 'All Posts', slug: 'blog' },
						{
							label: 'The Ultimate Read-It-Later Guide',
							translations: { 'zh-CN': '终极稍后阅读指南' },
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'blog/ultimate-read-it-later-guide' },
								{ label: 'Save Web Pages Permanently', slug: 'blog/ultimate-read-it-later-guide/save-web-pages-permanently' },
							],
						},
						{
							label: 'AI-Powered Reading',
							translations: { 'zh-CN': 'AI 智能阅读' },
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'blog/ai-powered-reading' },
								{ label: 'AI Summary for Articles', slug: 'blog/ai-powered-reading/ai-summary-for-articles' },
								{ label: 'Interactive Outline for Reading', slug: 'blog/ai-powered-reading/interactive-outline-for-reading' },
							],
						},
					],
				},
				{
					label: 'Compare',
					translations: { 'zh-CN': '对比' },
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'compare' },
						{ label: 'vs Instapaper', slug: 'compare/vs-instapaper' },
						{ label: 'vs Readwise Reader', slug: 'compare/vs-readwise' },
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
