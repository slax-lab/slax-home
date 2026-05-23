#!/usr/bin/env tsx
/**
 * Eval 10.1 #2-4 — hreflang + canonical + <html lang> integrity check on dist/.
 *
 *  - Parses every dist/**\/index.html and dist/**\/*.html
 *  - For each page extracts:
 *      <html lang="...">
 *      <link rel="canonical" href="...">
 *      <link rel="alternate" hreflang="..." href="...">
 *  - Verifies:
 *      A) canonical is absolute, HTTPS, hostname matches SITE
 *      B) canonical points to the page's own URL
 *      C) <html lang> matches the URL locale prefix (en for root, zh-Hans for /zh-Hans/, …)
 *      D) hreflang language codes are all valid BCP-47 from our locale set
 *      E) x-default is present and points to the en version
 *      F) hreflang graph is symmetric: A->B implies B->A
 *      G) every hreflang href is reachable inside dist/ (no 404 link)
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const SITE = 'https://slax.com';
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
const DEFAULT_LOCALE = 'en' as const;
type Locale = (typeof LOCALES)[number];

if (!existsSync(DIST)) {
	console.error('❌ dist/ missing. Run `pnpm build` first.');
	process.exit(1);
}

let errors = 0;
let warnings = 0;
const report = (lvl: 'error' | 'warn' | 'info', msg: string) => {
	const tag = lvl === 'error' ? '❌' : lvl === 'warn' ? '⚠️ ' : 'ℹ️ ';
	console.log(`${tag} ${msg}`);
	if (lvl === 'error') errors += 1;
	if (lvl === 'warn') warnings += 1;
};

// --- Locate every page in dist --------------------------------------------

const pages: { url: string; file: string }[] = [];
function walk(dir: string) {
	for (const item of readdirSync(dir)) {
		const full = join(dir, item);
		const st = statSync(full);
		if (st.isDirectory()) walk(full);
		else if (item.endsWith('.html')) {
			const rel = relative(DIST, full).replace(/\\/g, '/');
			let url = '/' + rel.replace(/index\.html$/, '');
			if (!url.endsWith('/')) url = url.replace(/\.html$/, '');
			if (url.includes('/og/')) continue; // skip OG image directories
			pages.push({ url, file: full });
		}
	}
}
walk(DIST);

// --- Parse hreflang/canonical/lang per page -------------------------------

interface PageInfo {
	url: string;
	htmlLang: string | null;
	canonical: string | null;
	alternates: { hreflang: string; href: string }[];
}

const infos: PageInfo[] = [];

for (const { url, file } of pages) {
	const html = readFileSync(file, 'utf8');
	const htmlLangMatch = html.match(/<html[^>]*\blang="([^"]+)"/);
	const canonicalMatch = html.match(
		/<link[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/,
	);
	const alternates: { hreflang: string; href: string }[] = [];
	const altRe =
		/<link[^>]*\brel="alternate"[^>]*\bhreflang="([^"]+)"[^>]*\bhref="([^"]+)"/g;
	let m = altRe.exec(html);
	while (m !== null) {
		alternates.push({ hreflang: m[1], href: m[2] });
		m = altRe.exec(html);
	}
	infos.push({
		url,
		htmlLang: htmlLangMatch?.[1] ?? null,
		canonical: canonicalMatch?.[1] ?? null,
		alternates,
	});
}

// Map URL → PageInfo for symmetry / existence checks.
const byUrl = new Map<string, PageInfo>();
for (const p of infos) byUrl.set(p.url, p);

// Utility: detect locale of a URL by first path segment.
function detectLocale(url: string): Locale {
	const segs = url.split('/').filter(Boolean);
	if (segs.length > 0 && (LOCALES as readonly string[]).includes(segs[0])) {
		return segs[0] as Locale;
	}
	return DEFAULT_LOCALE;
}

// Utility: strip leading locale prefix from URL to get locale-agnostic stem.
function unprefixed(url: string): string {
	const segs = url.split('/').filter(Boolean);
	if (
		segs[0] &&
		(LOCALES as readonly string[]).includes(segs[0]) &&
		segs[0] !== DEFAULT_LOCALE
	) {
		const rest = segs.slice(1);
		if (rest.length === 0) return '/';
		return '/' + rest.join('/') + (url.endsWith('/') ? '/' : '');
	}
	return url;
}

// --- A/B canonical, C html lang ------------------------------------------

for (const info of infos) {
	const expectedLocale = detectLocale(info.url);
	if (info.htmlLang !== expectedLocale) {
		report(
			'error',
			`${info.url}: <html lang="${info.htmlLang}"> mismatches URL locale "${expectedLocale}"`,
		);
	}
	if (!info.canonical) {
		report('error', `${info.url}: missing <link rel="canonical">`);
		continue;
	}
	if (!info.canonical.startsWith('https://')) {
		report('error', `${info.url}: canonical "${info.canonical}" is not HTTPS`);
	}
	const expectedCanonical = SITE + info.url;
	if (info.canonical !== expectedCanonical) {
		// Allow trailing-slash diff for the root.
		if (
			!(info.canonical === SITE + '/' && info.url === '/') &&
			info.canonical.replace(/\/$/, '') !== expectedCanonical.replace(/\/$/, '')
		) {
			report(
				'error',
				`${info.url}: canonical "${info.canonical}" ≠ expected "${expectedCanonical}"`,
			);
		}
	}
}

// --- D BCP-47 validity ----------------------------------------------------

const ALLOWED = new Set<string>([...LOCALES, 'x-default']);
for (const info of infos) {
	for (const a of info.alternates) {
		if (!ALLOWED.has(a.hreflang)) {
			report(
				'error',
				`${info.url}: invalid hreflang "${a.hreflang}" (must be one of ${[...ALLOWED].join(', ')})`,
			);
		}
	}
}

// --- E x-default present + points to en ----------------------------------

for (const info of infos) {
	if (info.alternates.length === 0) continue;
	const xd = info.alternates.find((a) => a.hreflang === 'x-default');
	if (!xd) {
		report('error', `${info.url}: hreflang block missing x-default`);
		continue;
	}
	const stem = unprefixed(info.url);
	const expectedXd = SITE + stem;
	if (xd.href.replace(/\/$/, '') !== expectedXd.replace(/\/$/, '')) {
		report(
			'error',
			`${info.url}: x-default "${xd.href}" should point to en "${expectedXd}"`,
		);
	}
}

// --- F hreflang symmetry --------------------------------------------------

// Build directed edges: from URL → set of (hreflang, href).
type Edge = { lang: string; href: string };
const edges = new Map<string, Edge[]>();
for (const info of infos) {
	edges.set(
		info.url,
		info.alternates.filter((a) => a.hreflang !== 'x-default'),
	);
}

for (const info of infos) {
	const mySelf = SITE + info.url;
	for (const a of info.alternates) {
		if (a.hreflang === 'x-default') continue;
		// Locate the page being referenced
		const targetPath = a.href.startsWith(SITE)
			? a.href.slice(SITE.length)
			: a.href;
		const targetInfo =
			byUrl.get(targetPath) ?? byUrl.get(targetPath.replace(/\/$/, '') + '/');
		if (!targetInfo) {
			report(
				'error',
				`${info.url}: hreflang "${a.hreflang}" href "${a.href}" not built (would 404)`,
			);
			continue;
		}
		// Symmetry: target must list us back
		const back = targetInfo.alternates.find(
			(b) =>
				b.hreflang === detectLocale(info.url) &&
				(b.href === mySelf ||
					b.href.replace(/\/$/, '') === mySelf.replace(/\/$/, '')),
		);
		if (!back) {
			report(
				'error',
				`Asymmetric hreflang: ${info.url} → ${a.hreflang} ${a.href}, but ${targetPath} does not link back to ${detectLocale(info.url)} ${mySelf}`,
			);
		}
	}
}

// --- Summary -------------------------------------------------------------

console.log('');
console.log(
	`Hreflang summary: ${infos.length} page(s) checked. ${errors} error(s), ${warnings} warning(s).`,
);
if (errors > 0) process.exit(1);
