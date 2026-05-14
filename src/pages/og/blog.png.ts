import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export const GET: APIRoute = async () => {
	const png = await renderOg({
		eyebrow: 'Slax · Blog',
		title: 'Notes from building Slax.',
		accentWord: 'building',
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
