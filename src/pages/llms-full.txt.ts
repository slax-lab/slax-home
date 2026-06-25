// /llms-full.txt — bundled markdown of the most valuable English pages, so an
// LLM can ingest "what Slax is" + recent thinking in a single fetch.
// Target size 30-60KB; we bound by post count (latest 10 + all alternatives).

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { entrySlug, filterByLocale } from '~/lib/content';

import { SITE } from '~/lib/hreflang';

function section(title: string, body: string): string {
	return `\n\n---\n\n# ${title}\n\n${body.trim()}\n`;
}

export const GET: APIRoute = async () => {
	const [blog, readerAlts, noteAlts] = await Promise.all([
		getCollection('blog'),
		getCollection('readerAlternatives'),
		getCollection('noteAlternatives'),
	]);

	const blogEn = filterByLocale(blog, 'en')
		.filter((p) => !p.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, 10);

	const readerAltsEn = filterByLocale(readerAlts, 'en').sort((a, b) =>
		a.data.competitor.localeCompare(b.data.competitor),
	);
	const noteAltsEn = filterByLocale(noteAlts, 'en').sort((a, b) =>
		a.data.competitor.localeCompare(b.data.competitor),
	);

	const parts: string[] = [];

	parts.push('# Slax — bundled content for LLMs');
	parts.push('');
	parts.push(
		'Slax Lab makes Slax Reader (read-it-later) and Slax Note (AI voice notes). This file concatenates the top English pages so an LLM can answer questions about Slax in one fetch. Source of truth remains the individual URLs linked in /llms.txt.',
	);
	parts.push('');
	parts.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);

	for (const p of blogEn) {
		const url = `${SITE}/blog/${entrySlug(p)}/`;
		parts.push(
			section(
				p.data.title,
				`Source: ${url}\nPublished: ${p.data.pubDate.toISOString().slice(0, 10)}\nDescription: ${p.data.description}\n\n${p.body ?? ''}`,
			),
		);
	}

	for (const e of readerAltsEn) {
		const url = `${SITE}/reader/alternatives/${entrySlug(e)}/`;
		parts.push(
			section(
				`${e.data.title} (Slax Reader vs ${e.data.competitor})`,
				`Source: ${url}\nDescription: ${e.data.description}\n\n${e.body ?? ''}`,
			),
		);
	}

	for (const e of noteAltsEn) {
		const url = `${SITE}/note/alternatives/${entrySlug(e)}/`;
		parts.push(
			section(
				`${e.data.title} (Slax Note vs ${e.data.competitor})`,
				`Source: ${url}\nDescription: ${e.data.description}\n\n${e.body ?? ''}`,
			),
		);
	}

	return new Response(parts.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
