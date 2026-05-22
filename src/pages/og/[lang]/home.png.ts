import type { APIRoute } from 'astro';
import { t } from '~/i18n';
import { type Locale, PREFIXED_LOCALES } from '~/i18n/locales';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	return PREFIXED_LOCALES.map((lang) => ({ params: { lang } }));
}

export const GET: APIRoute = async ({ params }) => {
	const lang = params.lang as Locale;
	const png = await renderOg({
		eyebrow: 'Slax · Reading & writing',
		title: t(lang, 'home.hero.heading'),
		lang,
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
