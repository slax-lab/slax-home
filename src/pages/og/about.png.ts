import type { APIRoute } from 'astro';
import { t } from '~/i18n';
import { renderOg } from '~/lib/og';

export const GET: APIRoute = async () => {
	const png = await renderOg({
		eyebrow: 'Slax · About',
		title: t('en', 'about.heading'),
		accentWord: 'attention',
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
