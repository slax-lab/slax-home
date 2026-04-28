import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((p) => ({
		params: { slug: p.id },
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
