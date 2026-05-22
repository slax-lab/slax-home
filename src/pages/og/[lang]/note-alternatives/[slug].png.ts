import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { type Locale, PREFIXED_LOCALES } from '~/i18n/locales';
import { entrySlug, filterByLocale } from '~/lib/content';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	const all = await getCollection('noteAlternatives');
	const paths: Array<{
		params: { lang: Locale; slug: string };
		props: { title: string; competitor: string; lang: Locale };
	}> = [];
	for (const lang of PREFIXED_LOCALES) {
		const inLang = filterByLocale(all, lang);
		for (const entry of inLang) {
			paths.push({
				params: { lang, slug: entrySlug(entry) },
				props: {
					title: entry.data.title,
					competitor: entry.data.competitor,
					lang,
				},
			});
		}
	}
	return paths;
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOg({
		eyebrow: `Slax Note vs. ${props.competitor as string}`,
		title: props.title as string,
		accentWord: props.competitor as string,
		lang: props.lang as Locale,
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
