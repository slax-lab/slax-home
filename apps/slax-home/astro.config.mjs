import { existsSync } from 'node:fs';
import { request as httpRequest } from 'node:http';
import { resolve } from 'node:path';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightBlog from 'starlight-blog';

/**
 * Vite plugin: proxy .astro virtual module requests that don't exist locally
 * to the sub-app that owns them (reader-home / note-home).
 * Fixes "No cached compile metadata" errors caused by cross-app module ID collisions
 * when multiple Astro apps share a monorepo and dev proxy.
 */
function crossAppModuleProxy() {
	const subApps = [
		{ dir: '../reader-home', target: 'http://localhost:4322', base: '/reader' },
		{ dir: '../note-home', target: 'http://localhost:4323', base: '/note' },
	];

	return {
		name: 'cross-app-module-proxy',
		configureServer(server) {
			const resolved = subApps.map((app) => ({
				...app,
				root: resolve(server.config.root, app.dir),
			}));

			server.middlewares.use((req, res, next) => {
				const url = req.url || '';

				if (!url.includes('.astro?') || !url.includes('type=')) {
					return next();
				}

				const filePath = url.split('?')[0];

				if (existsSync(resolve(server.config.root, '.' + filePath))) {
					return next();
				}

				const owner = resolved.find((app) =>
					existsSync(resolve(app.root, '.' + filePath)),
				);

				if (!owner) {
					res.writeHead(404);
					res.end('');
					return;
				}

				const proxyReq = httpRequest(
					`${owner.target}${owner.base}${url}`,
					{
						method: req.method || 'GET',
						headers: { ...req.headers, host: new URL(owner.target).host },
					},
					(proxyRes) => {
						res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
						proxyRes.pipe(res);
					},
				);

				proxyReq.on('error', () => {
					res.writeHead(502);
					res.end('');
				});
				proxyReq.end();
			});
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://slax.com',
	server: {
		port: 4321,
	},
	integrations: [
		starlight({
			title: {
				en: 'Slax Home',
				'zh-CN': 'Slax 首页',
			},

			// --- Custom CSS ---
			customCss: [
				'./src/styles/custom.css',
				'./src/styles/landing.css',
				'./src/styles/blog.css',
			],

			// --- i18n ---
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
				{ tag: 'meta', attrs: { property: 'og:site_name', content: 'Slax' } },
				{ tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } },
				{
					tag: 'meta',
					attrs: { property: 'og:locale:alternate', content: 'zh_CN' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						name: 'Slax',
						url: 'https://slax.com',
						potentialAction: {
							'@type': 'SearchAction',
							target: 'https://slax.com/search?q={search_term_string}',
							'query-input': 'required name=search_term_string',
						},
					}),
				},
			],
			components: {
				Head: './src/components/Head.astro',
				SkipLink: './src/components/SkipLink.astro',
			},
			plugins: [
				starlightBlog({
					title: {
						'zh-CN': '我的博客',
						en: 'My Blog',
					},
					authors: {
						daguang: {
							name: 'Daguang',
							title: '开发者',
						},
					},
					postCount: 10,
					recentPostCount: 5,
				}),
			],
		}),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					zh: 'zh-CN',
				},
			},
			filter: (page) => !page.includes('/admin/'),
		}),
	],
	vite: {
		plugins: [crossAppModuleProxy()],
		server: {
			proxy: {
				'/note': {
					target: 'http://localhost:4323',
					changeOrigin: true,
					ws: true,
				},
				'/reader': {
					target: 'http://localhost:4322',
					changeOrigin: true,
					ws: true,
				},
			},
		},
	},
});
