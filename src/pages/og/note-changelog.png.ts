import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export const GET: APIRoute = async () => {
	const png = await renderOg({
		eyebrow: 'Slax Note · Release Notes',
		title: 'Every version since launch.',
		accentWord: 'version',
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
