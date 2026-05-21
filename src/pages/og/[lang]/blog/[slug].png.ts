import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { type Locale, PREFIXED_LOCALES } from '~/i18n/locales';
import { entrySlug, filterByLocale } from '~/lib/content';
import { renderOg } from '~/lib/og';

export async function getStaticPaths() {
	const all = await getCollection('blog');
	const paths: Array<{
		params: { lang: Locale; slug: string };
		props: { title: string; lang: Locale };
	}> = [];
	for (const lang of PREFIXED_LOCALES) {
		const inLang = filterByLocale(all, lang);
		for (const post of inLang) {
			paths.push({
				params: { lang, slug: entrySlug(post) },
				props: { title: post.data.title, lang },
			});
		}
	}
	return paths;
}

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOg({
		eyebrow: 'Slax · Blog',
		title: props.title as string,
		lang: props.lang as Locale,
	});
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
};
