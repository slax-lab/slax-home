import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export const GET: APIRoute = async () => {
	const png = await renderOg({
		eyebrow: 'Slax Reader · Release Notes',
		title: 'Every release, in one place.',
		accentWord: 'release',
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
