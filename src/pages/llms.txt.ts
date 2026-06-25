// /llms.txt — site map for LLMs, per llmstxt.org spec.
// Generated at build time from content collections; lists Top N URLs grouped by
// section with one-line descriptions. Companion: /llms-full.txt (bundled body).

import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { entrySlug, filterByLocale } from '~/lib/content';

const SITE = 'https://www.slax.com';

export const GET: APIRoute = async () => {
	const [blog, readerAlts, noteAlts] = await Promise.all([
		getCollection('blog'),
		getCollection('readerAlternatives'),
		getCollection('noteAlternatives'),
	]);

	const blogEn = filterByLocale(blog, 'en')
		.filter((p) => !p.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	const readerAltsEn = filterByLocale(readerAlts, 'en').sort((a, b) =>
		a.data.competitor.localeCompare(b.data.competitor),
	);
	const noteAltsEn = filterByLocale(noteAlts, 'en').sort((a, b) =>
		a.data.competitor.localeCompare(b.data.competitor),
	);

	const lines: string[] = [];
	lines.push('# Slax');
	lines.push('');
	lines.push(
		'> Slax Lab makes quiet software for the work of attention. Slax Reader is a read-it-later app that does not try to be everything (no algorithm, no feed, unlimited snapshots, open-source). Slax Note is an AI voice notes app — you talk, it writes, shaped by the prompts you choose. Built by a small team in Singapore.',
	);
	lines.push('');

	lines.push('## Products');
	lines.push('');
	lines.push(
		`- [Slax Reader](${SITE}/reader/): A read-it-later app that does not try to be everything. No algorithm, no feed. Unlimited snapshots, free. Open-source.`,
	);
	lines.push(
		`- [Slax Note](${SITE}/note/): AI voice notes. You talk, I write. One recording, many shapes — shaped by the prompts you choose.`,
	);
	lines.push('');

	lines.push('## Comparisons (Slax Reader vs)');
	lines.push('');
	for (const e of readerAltsEn) {
		lines.push(
			`- [${e.data.title}](${SITE}/reader/alternatives/${entrySlug(e)}/): ${e.data.description}`,
		);
	}
	lines.push('');

	if (noteAltsEn.length > 0) {
		lines.push('## Comparisons (Slax Note vs)');
		lines.push('');
		for (const e of noteAltsEn) {
			lines.push(
				`- [${e.data.title}](${SITE}/note/alternatives/${entrySlug(e)}/): ${e.data.description}`,
			);
		}
		lines.push('');
	}

	lines.push('## Blog (latest English posts)');
	lines.push('');
	for (const p of blogEn.slice(0, 20)) {
		lines.push(
			`- [${p.data.title}](${SITE}/blog/${entrySlug(p)}/): ${p.data.description}`,
		);
	}
	lines.push('');

	lines.push('## Release notes');
	lines.push('');
	lines.push(`- [Slax Reader changelog](${SITE}/reader/changelog/)`);
	lines.push(`- [Slax Note changelog](${SITE}/note/changelog/)`);
	lines.push('');

	lines.push('## About');
	lines.push('');
	lines.push(`- [About Slax Lab](${SITE}/about/)`);
	lines.push(`- [Privacy](${SITE}/privacy/)`);
	lines.push(`- [Terms](${SITE}/terms/)`);
	lines.push('');

	lines.push('## Authors');
	lines.push('');
	lines.push('- Luca Wu — founder of Slax Lab.');
	lines.push(
		'- Jane — product manager. Co-drove the Slax Note rewrite with Lin Chen.',
	);
	lines.push(
		'- Lin Chen — designer. Rewrote Slax Note from a designer’s desk with AI.',
	);
	lines.push(
		'- KK — contributor. Wrote the earliest Slax Reader vs alternative comparisons.',
	);
	lines.push('');

	lines.push('## Sister sites');
	lines.push('');
	lines.push(
		`- [sgai.md](https://sgai.md) — Singapore AI Strategy Observatory, edited by the Slax team.`,
	);
	lines.push('');

	lines.push('## Languages');
	lines.push('');
	lines.push(
		`This site is available in English (default, no prefix), 简体中文 (/zh-Hans/), 繁體中文 (/zh-Hant/), 日本語 (/ja/), 한국어 (/ko/). Each page declares hreflang in <head>; the same URL stem maps across locales via the locale prefix.`,
	);
	lines.push('');

	lines.push('## Full bundle');
	lines.push('');
	lines.push(
		`- [llms-full.txt](${SITE}/llms-full.txt) — concatenated body of the top pages, ready to ingest in a single fetch.`,
	);
	lines.push('');

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
