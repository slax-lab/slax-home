import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { entrySlug, filterByLocale } from '~/lib/content';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	const en = filterByLocale(await getCollection('blog'), 'en');
	return en.map((p) => ({
		params: { slug: entrySlug(p) },
		props: { title: p.data.title },
	}));
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOg({
		eyebrow: 'Slax · Blog',
		title: props.title as string,
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
