#!/usr/bin/env tsx
/**
 * Locale-prefix integrity check for in-content internal links, run on dist/.
 *
 * Localized content pages (/​<locale>/blog/<slug>/, /<locale>/<product>/alternatives/<slug>/)
 * must not link readers back to the default-locale (en) version of a page that
 * exists in their own locale — scripts/remark-locale-links.mjs rewrites those
 * at build time. This eval verifies the rendered output:
 *
 *   A) no unprefixed internal content link inside the article prose when the
 *      localized target page exists in dist/
 *   B) no double locale prefix (/es/es/…, /ja/es/…)
 *   C) every locale-prefixed prose link resolves to a real page in dist/
 *   D) sanity: the sweep found at least one prefixed prose link overall
 *      (guards against the prose extraction silently matching nothing)
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const LOCALES = [
	'en',
	'zh-Hans',
	'zh-Hant',
	'ja',
	'ko',
	'de',
	'fr',
	'es',
	'pt-BR',
	'id',
	'vi',
] as const;
const DEFAULT_LOCALE = 'en';
const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

// URL stems of content detail pages the remark plugin localizes.
const CONTENT_STEM = /^\/(blog|reader\/alternatives|note\/alternatives)\/.+/;

if (!existsSync(DIST)) {
	console.error('❌ dist/ missing. Run `pnpm build` first.');
	process.exit(1);
}

let errors = 0;
const report = (lvl: 'error' | 'info', msg: string) => {
	console.log(`${lvl === 'error' ? '❌' : 'ℹ️ '} ${msg}`);
	if (lvl === 'error') errors += 1;
};

function pageExists(url: string): boolean {
	const clean = url.split(/[?#]/)[0];
	return existsSync(join(DIST, clean, 'index.html'));
}

function* contentPages(
	locale: string,
): Generator<{ url: string; file: string }> {
	const stems = ['blog', 'reader/alternatives', 'note/alternatives'];
	for (const stem of stems) {
		const dir = join(DIST, locale, stem);
		if (!existsSync(dir)) continue;
		for (const slug of readdirSync(dir)) {
			const file = join(dir, slug, 'index.html');
			if (statSync(join(dir, slug)).isDirectory() && existsSync(file)) {
				yield { url: `/${locale}/${stem}/${slug}/`, file };
			}
		}
	}
}

function proseHrefs(html: string): string[] {
	// Astro appends a scoped-style attribute: <div class="prose" data-astro-cid-…>
	const start = html.indexOf('<div class="prose"');
	if (start === -1) return [];
	const end = html.indexOf('</article>', start);
	const region = html.slice(start, end === -1 ? undefined : end);
	return [...region.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
}

let prefixedSeen = 0;
let pagesChecked = 0;

for (const locale of PREFIXED) {
	for (const { url, file } of contentPages(locale)) {
		pagesChecked += 1;
		const html = readFileSync(file, 'utf8');
		for (const href of proseHrefs(html)) {
			if (!href.startsWith('/') || href.startsWith('//')) continue;
			const segs = href.split('/');
			// B) double prefix
			if (
				(LOCALES as readonly string[]).includes(segs[1]) &&
				(LOCALES as readonly string[]).includes(segs[2])
			) {
				report('error', `${url} has double-prefixed link ${href}`);
				continue;
			}
			if (segs[1] === locale) {
				prefixedSeen += 1;
				// C) prefixed link must resolve
				if (!pageExists(href)) {
					report('error', `${url} links to missing page ${href}`);
				}
				continue;
			}
			// A) unprefixed content link while the localized target exists
			if (CONTENT_STEM.test(href) && pageExists(`/${locale}${href}`)) {
				report('error', `${url} leaks to default locale: ${href}`);
			}
		}
	}
}

// D) vacuous-pass guard
if (prefixedSeen === 0) {
	report(
		'error',
		'no locale-prefixed prose links found at all — extraction or plugin broken?',
	);
}

if (errors > 0) {
	console.error(
		`\n❌ eval-locale-links: ${errors} error(s) across ${pagesChecked} pages.`,
	);
	process.exit(1);
}
console.log(
	`✅ eval-locale-links: ${pagesChecked} localized content pages OK (${prefixedSeen} prefixed links verified).`,
);
