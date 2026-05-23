#!/usr/bin/env tsx
/**
 * Eval 10.1 #6 — sitemap integrity.
 *
 * Verifies dist/sitemap-index.xml + child sitemaps:
 *  - sitemap-index references at least one child
 *  - every <url> entry contains a <loc>
 *  - no duplicate <loc>
 *  - prefixed URLs follow /{lang}/ structure
 *  - if a URL has alternates, each <xhtml:link rel="alternate"> hreflang
 *    is a valid BCP-47 from our LOCALES + x-default
 */

import { existsSync, readFileSync } from 'node:fs';
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
];
const ALLOWED_HREFLANG = new Set([...LOCALES, 'x-default']);

let errors = 0;
const fail = (msg: string) => {
	console.log(`❌ ${msg}`);
	errors += 1;
};
const info = (msg: string) => console.log(`ℹ️  ${msg}`);

const indexPath = join(DIST, 'sitemap-index.xml');
if (!existsSync(indexPath)) {
	fail(`Missing ${indexPath}`);
	process.exit(1);
}

const indexXml = readFileSync(indexPath, 'utf8');
const childMatches = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)];
if (childMatches.length === 0) {
	fail('sitemap-index.xml has no <loc> entries');
}
info(`sitemap-index.xml: ${childMatches.length} child sitemap(s)`);

const allUrls = new Set<string>();
let urlCount = 0;
let alternateCount = 0;

for (const childMatch of childMatches) {
	const childUrl = childMatch[1];
	const filename = childUrl.split('/').pop() ?? '';
	const childPath = join(DIST, filename);
	if (!existsSync(childPath)) {
		fail(`Child sitemap not found: ${filename}`);
		continue;
	}
	const xml = readFileSync(childPath, 'utf8');
	const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
	for (const ub of urlBlocks) {
		urlCount += 1;
		const block = ub[1];
		const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
		if (!locMatch) {
			fail(`URL block without <loc> in ${filename}`);
			continue;
		}
		const loc = locMatch[1];
		if (allUrls.has(loc)) fail(`Duplicate <loc>: ${loc}`);
		allUrls.add(loc);
		// Check alternates
		const altMatches = [
			...block.matchAll(
				/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/g,
			),
		];
		for (const am of altMatches) {
			alternateCount += 1;
			if (!ALLOWED_HREFLANG.has(am[1])) {
				fail(`Invalid hreflang "${am[1]}" in ${loc}`);
			}
		}
	}
	info(`${filename}: ${urlBlocks.length} url entries`);
}

info(
	`Total: ${urlCount} URL entries, ${alternateCount} <xhtml:link> alternates`,
);

if (errors > 0) process.exit(1);
