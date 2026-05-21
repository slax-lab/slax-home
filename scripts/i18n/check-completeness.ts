#!/usr/bin/env tsx
/**
 * Eval 10.1 #1 — translation completeness check.
 *
 * Scans:
 *   - UI dictionaries (src/i18n/ui/<lang>.ts) for missing keys vs en source.
 *   - Content collections (src/content/<col>/<lang>/) for orphan slugs.
 *
 * Exits non-zero on any failure so CI / husky can block bad commits.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const LOCALES = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko'] as const;
const DEFAULT_LOCALE = 'en' as const;
const COLLECTIONS = [
	'blog',
	'reader-changelog',
	'note-changelog',
	'reader-alternatives',
	'note-alternatives',
	'legal',
];

let errors = 0;
let warnings = 0;

function report(level: 'error' | 'warn' | 'info', msg: string) {
	const tag =
		level === 'error' ? '❌ ERROR' : level === 'warn' ? '⚠️  WARN' : 'ℹ️ ';
	console.log(`${tag} ${msg}`);
	if (level === 'error') errors += 1;
	if (level === 'warn') warnings += 1;
}

// --- 1. UI dictionary key parity ---------------------------------------

interface NestedDict {
	[key: string]: string | NestedDict;
}

function flattenKeys(obj: NestedDict, prefix = ''): string[] {
	const out: string[] = [];
	for (const [k, v] of Object.entries(obj)) {
		const path = prefix ? `${prefix}.${k}` : k;
		if (typeof v === 'string') out.push(path);
		else if (v && typeof v === 'object')
			out.push(...flattenKeys(v as NestedDict, path));
	}
	return out;
}

/**
 * Naive but adequate parser: read the ts file, extract everything between
 * `export const ui` (or the imported assignment) and the final closing brace,
 * then evaluate it as JSON-ish via the Function constructor. We can't import
 * the .ts files directly from Node without transpilation; this avoids that.
 *
 * For safety we strip the `as const` suffix, type annotations, and run inside
 * an isolated function scope.
 */
function parseDictFile(path: string): NestedDict {
	const src = readFileSync(path, 'utf8');
	const match = src.match(
		/(?:export const ui[^=]*=|const ui[^=]*=)\s*({[\s\S]+?})\s*(?:as const)?\s*;/,
	);
	if (!match) throw new Error(`Cannot find ui object literal in ${path}`);
	const objLiteral = match[1];
	// eval as object expression in isolated scope
	// biome-ignore lint/security/noGlobalEval: trusted internal source
	const fn = new Function(`return (${objLiteral});`);
	return fn() as NestedDict;
}

const enDictPath = join(ROOT, 'src/i18n/ui/en.ts');
const enKeys = new Set(flattenKeys(parseDictFile(enDictPath)));

for (const lang of LOCALES) {
	if (lang === DEFAULT_LOCALE) continue;
	const path = join(ROOT, `src/i18n/ui/${lang}.ts`);
	if (!existsSync(path)) {
		report('error', `Missing UI dictionary: ${relative(ROOT, path)}`);
		continue;
	}
	const langKeys = new Set(flattenKeys(parseDictFile(path)));
	const missing = [...enKeys].filter((k) => !langKeys.has(k));
	const extra = [...langKeys].filter((k) => !enKeys.has(k));
	if (missing.length) {
		report(
			'error',
			`UI ${lang}: missing ${missing.length} key(s): ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`,
		);
	}
	if (extra.length) {
		report(
			'warn',
			`UI ${lang}: ${extra.length} extra key(s) not in en: ${extra.slice(0, 5).join(', ')}${extra.length > 5 ? '…' : ''}`,
		);
	}
	if (!missing.length && !extra.length) {
		report('info', `UI ${lang}: complete (${langKeys.size} keys)`);
	}
}

// --- 2. Content collection slug coverage matrix ------------------------

interface SlugMatrix {
	[collection: string]: { [slug: string]: Set<string> };
}

const matrix: SlugMatrix = {};

function walkContentCollection(col: string) {
	const base = join(ROOT, 'src/content', col);
	if (!existsSync(base)) return;
	matrix[col] = {};
	for (const lang of LOCALES) {
		const langDir = join(base, lang);
		if (!existsSync(langDir)) continue;
		walkMdx(langDir, (rel) => {
			const slug = rel.replace(/\.(md|mdx)$/, '');
			matrix[col][slug] ??= new Set();
			matrix[col][slug].add(lang);
		});
	}

	// Detect entries dropped at the collection root (pre-i18n layout) — these
	// must be moved into <lang>/ to participate in language inference.
	for (const item of readdirSync(base)) {
		const full = join(base, item);
		if (statSync(full).isFile() && /\.(md|mdx)$/.test(item)) {
			report('error', `Content ${col}: ${item} is not under a {lang}/ subdir`);
		}
	}
}

function walkMdx(dir: string, cb: (rel: string) => void, prefix = '') {
	for (const item of readdirSync(dir)) {
		const full = join(dir, item);
		const rel = prefix ? `${prefix}/${item}` : item;
		const st = statSync(full);
		if (st.isDirectory()) walkMdx(full, cb, rel);
		else if (/\.(md|mdx)$/.test(item)) cb(rel);
	}
}

for (const col of COLLECTIONS) walkContentCollection(col);

for (const [col, slugs] of Object.entries(matrix)) {
	const total = Object.keys(slugs).length;
	if (total === 0) continue;
	const byLang: Record<string, number> = {};
	for (const lang of LOCALES) byLang[lang] = 0;
	let missingEn = 0;
	for (const [slug, langs] of Object.entries(slugs)) {
		for (const lang of langs) byLang[lang] = (byLang[lang] ?? 0) + 1;
		if (!langs.has(DEFAULT_LOCALE)) {
			report('warn', `Content ${col}/${slug}: missing English source`);
			missingEn += 1;
		}
	}
	const summary = LOCALES.map((l) => `${l}:${byLang[l] ?? 0}`).join(' ');
	report(
		'info',
		`Content ${col}: ${total} slug(s)  ${summary}${missingEn ? `  ⚠ ${missingEn} without EN source` : ''}`,
	);
}

// --- Summary -----------------------------------------------------------

console.log('');
console.log(`Summary: ${errors} error(s), ${warnings} warning(s).`);

if (errors > 0) {
	console.log('');
	console.log('Fix: run with --help to see remediation steps for each error.');
	process.exit(1);
}
