import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	const entries = await getCollection('noteAlternatives');
	return entries.map((entry) => ({
		params: { slug: entry.id },
		props: {
			competitor: entry.data.competitor,
			title: entry.data.title,
		},
	}));
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOg({
		eyebrow: `Slax Note vs. ${props.competitor as string}`,
		title: props.title as string,
		accentWord: props.competitor as string,
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
