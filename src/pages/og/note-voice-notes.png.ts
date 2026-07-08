import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export const GET: APIRoute = async () => {
	const png = await renderOg({
		eyebrow: 'Slax Note · Speech to text',
		title: 'Slax voice notes. You talk, I write.',
		accentWord: 'voice',
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
