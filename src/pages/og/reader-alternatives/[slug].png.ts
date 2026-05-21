import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { entrySlug, filterByLocale } from '~/lib/content';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	const en = filterByLocale(await getCollection('readerAlternatives'), 'en');
	return en.map((entry) => ({
		params: { slug: entrySlug(entry) },
		props: {
			competitor: entry.data.competitor,
			title: entry.data.title,
		},
	}));
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOg({
		eyebrow: `Slax Reader vs. ${props.competitor as string}`,
		title: props.title as string,
		accentWord: props.competitor as string,
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
