import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://slax.com',
	server: {
		port: 4321,
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/admin/'),
		}),
	],
});
