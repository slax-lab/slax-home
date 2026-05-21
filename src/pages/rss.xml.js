import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { entryLocale, entrySlug } from '~/lib/content';

export async function GET(context) {
	const posts = (
		await getCollection('blog', ({ data, id }) => {
			if (data.draft) return false;
			const lang = data.lang ?? entryLocale(id);
			return lang === 'en';
		})
	).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: 'Slax — Blog',
		description:
			'Essays on reading, writing, attention, and the quiet tools we make for them.',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${entrySlug(post)}/`,
		})),
		customData: '<language>en-us</language>',
	});
}
