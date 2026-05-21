#!/usr/bin/env tsx
/**
 * Eval 10.2 #1, #4 — translation quality (glossary + length).
 *
 *  - Glossary: scans every translated MDX file for reserved-word leakage
 *    (品牌、平台 etc. must remain as-is in any language).
 *  - Length: checks frontmatter `title` ≤ 60 chars (CJK counted ×1, not ×2,
 *    because Google SERP's pixel-width limit is closer to 60 chars even for CJK).
 *  - Length: meta `description` ≤ 155 chars where present.
 *
 * Does NOT call an external LLM — pure regex / length checks. The LLM-judge
 * evaluator from §10.2 #3 lives in a separate script (TBD; Phase 2+).
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'];
const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== 'en');
const CONTENT_DIRS = [
	'blog',
	'reader-changelog',
	'note-changelog',
	'reader-alternatives',
	'note-alternatives',
	'legal',
];

// Reserved words: must appear EXACTLY in this casing.
const RESERVED = [
	'Slax',
	'Slax Reader',
	'Slax Note',
	'Slax Lab',
	'iOS',
	'macOS',
	'iPadOS',
	'tvOS',
	'watchOS',
	'Android',
	'Windows',
	'Linux',
	'GitHub',
	'Google',
	'Apple',
	'Microsoft',
	'Cloudflare',
	'Pocket',
	'Readwise Reader',
	'Instapaper',
	'Cubox',
	'Omnivore',
	'Matter',
	'GoodLinks',
	'AudioPen',
	'Voicenotes',
	'Mem AI',
	'Braintoss',
	'RSS',
	'API',
	'CLI',
	'SDK',
	'URL',
	'HTTP',
	'HTTPS',
	'JSON',
	'Markdown',
	'MDX',
];

// Common mistranslations (lowercase or alternate-case forms that look like leaks)
const FORBIDDEN_LOWERCASE = [
	'slax', // lowercase brand — should never appear
	'github',
	'ios',
	'macos',
];

let errors = 0;
let warnings = 0;
const fail = (msg: string) => {
	console.log(`❌ ${msg}`);
	errors += 1;
};
const warn = (msg: string) => {
	console.log(`⚠️  ${msg}`);
	warnings += 1;
};
const info = (msg: string) => console.log(`ℹ️  ${msg}`);

function* walkMdx(dir: string): Generator<string> {
	if (!existsSync(dir)) return;
	for (const item of readdirSync(dir)) {
		const full = join(dir, item);
		const st = statSync(full);
		if (st.isDirectory()) yield* walkMdx(full);
		else if (/\.(md|mdx)$/.test(item)) yield full;
	}
}

function checkGlossary(path: string, body: string, lang: string) {
	for (const wrong of FORBIDDEN_LOWERCASE) {
		// Match standalone token (avoid matching inside URLs, code, etc.)
		// Use a conservative regex: word boundary on both sides.
		const re = new RegExp(`\\b${wrong}\\b`, 'g');
		let m = re.exec(body);
		while (m !== null) {
			// Skip if inside a URL or email — coarse heuristic: look backward for "://" or "@"
			const before = body.slice(Math.max(0, m.index - 30), m.index);
			if (!/:\/\/\S*$/.test(before) && !/@\S*$/.test(before)) {
				fail(
					`${relative(ROOT, path)}: forbidden lowercase token "${wrong}" at offset ${m.index}`,
				);
				break;
			}
			m = re.exec(body);
		}
	}
}

function checkLength(path: string, frontmatter: string) {
	const titleMatch = frontmatter.match(
		/^title:\s*(?:["']([^"']+)["']|(.+?))$/m,
	);
	if (titleMatch) {
		const title = (titleMatch[1] ?? titleMatch[2]).trim();
		if (title.length > 60) {
			warn(
				`${relative(ROOT, path)}: title is ${title.length} chars (recommended ≤ 60): "${title}"`,
			);
		}
	}
	const descMatch = frontmatter.match(
		/^description:\s*(?:["']([^"']+)["']|(.+?))$/m,
	);
	if (descMatch) {
		const desc = (descMatch[1] ?? descMatch[2]).trim();
		if (desc.length > 155) {
			warn(
				`${relative(ROOT, path)}: description is ${desc.length} chars (recommended ≤ 155)`,
			);
		}
	}
}

let fileCount = 0;
for (const col of CONTENT_DIRS) {
	const base = join(ROOT, 'src/content', col);
	if (!existsSync(base)) continue;
	for (const lang of LOCALES) {
		const langDir = join(base, lang);
		if (!existsSync(langDir)) continue;
		for (const file of walkMdx(langDir)) {
			fileCount += 1;
			const src = readFileSync(file, 'utf8');
			const fm = src.match(/^---\n([\s\S]+?)\n---/)?.[1] ?? '';
			const body = src.replace(/^---\n[\s\S]+?\n---\n?/, '');
			if (NON_DEFAULT_LOCALES.includes(lang)) {
				checkGlossary(file, body + '\n' + fm, lang);
			}
			checkLength(file, fm);
		}
	}
}

info(`Scanned ${fileCount} mdx file(s) across ${LOCALES.length} locales.`);
console.log('');
console.log(`Translation eval: ${errors} error(s), ${warnings} warning(s).`);

if (errors > 0) process.exit(1);
