import type { APIRoute } from 'astro';
import { renderOg } from '~/lib/og';

export const GET: APIRoute = async () => {
	const png = await renderOg({
		eyebrow: 'Slax Reader · Read-it-later',
		title: "A read-it-later app that doesn't try to be everything.",
		accentWord: 'everything',
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
