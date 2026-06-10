// Resolve a sitemap URL → its true last-modified ISO timestamp by stat'ing the
// corresponding source file. Astro's default sitemap timestamps everything
// with the build time (same lastmod across the entire site), which Google
// stops trusting. SEO checklist §1.2 explicitly warns against that.
//
// Strategy: map URL pathname → src/content/<collection>/<locale>/<slug>.mdx
// (content pages) or src/pages/<route>.astro (static routes). List pages
// (e.g. /blog/, /reader/changelog/) take the newest mtime within their
// collection — so the index updates whenever any post in it does.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Keep in sync with src/i18n/locales.ts PREFIXED_LOCALES.
const PREFIXED_LOCALES = [
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

const mtimeCache = new Map();

function statMtime(filePath) {
	if (mtimeCache.has(filePath)) return mtimeCache.get(filePath);
	let mtime = null;
	try {
		mtime = fs.statSync(filePath).mtime.toISOString();
	} catch {
		// missing file — fall back to null; caller will skip lastmod.
	}
	mtimeCache.set(filePath, mtime);
	return mtime;
}

function tryExt(baseRel, exts) {
	for (const e of exts) {
		const full = path.join(ROOT, baseRel + e);
		if (fs.existsSync(full)) return statMtime(full);
	}
	return null;
}

const dirNewestCache = new Map();

function newestInDir(dirRel) {
	if (dirNewestCache.has(dirRel)) return dirNewestCache.get(dirRel);
	const full = path.join(ROOT, dirRel);
	let newest = null;
	if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
		const entries = fs.readdirSync(full, {
			recursive: true,
			withFileTypes: true,
		});
		for (const ent of entries) {
			if (!ent.isFile()) continue;
			if (!/\.(md|mdx)$/.test(ent.name)) continue;
			const parent = typeof ent.parentPath === 'string' ? ent.parentPath : full;
			const fp = path.join(parent, ent.name);
			const m = statMtime(fp);
			if (m && (!newest || m > newest)) newest = m;
		}
	}
	dirNewestCache.set(dirRel, newest);
	return newest;
}

/**
 * @param {string} pathname URL path with leading slash, e.g. "/blog/foo/".
 * @returns {string | null} ISO timestamp or null if unresolved.
 */
export function getLastmodFor(pathname) {
	const clean = pathname.replace(/^\/|\/$/g, '');
	const parts = clean === '' ? [] : clean.split('/');

	let lang = 'en';
	let rest = parts;
	if (parts.length > 0 && PREFIXED_LOCALES.includes(parts[0])) {
		lang = parts[0];
		rest = parts.slice(1);
	}

	// Root / locale root → static landing page
	if (rest.length === 0) {
		const base = lang === 'en' ? 'src/pages/index' : `src/pages/${lang}/index`;
		return tryExt(base, ['.astro']);
	}

	const head = rest[0];

	// /authors/<slug>/
	if (head === 'authors' && rest.length >= 2) {
		return tryExt(`src/pages/authors/${rest[1]}`, ['.astro']);
	}

	// /about/, /privacy/, /terms/ (per-locale)
	if (['about', 'privacy', 'terms'].includes(head) && rest.length === 1) {
		if (lang === 'en') return tryExt(`src/pages/${head}`, ['.astro']);
		return tryExt(`src/pages/[lang]/${head}`, ['.astro']);
	}

	// /blog/<slug>/
	if (head === 'blog' && rest.length >= 2) {
		const slug = rest.slice(1).join('/');
		const mdx = tryExt(`src/content/blog/${lang}/${slug}`, ['.mdx', '.md']);
		if (mdx) return mdx;
		// translation may not exist; fall back to canonical
		return tryExt(`src/content/blog/en/${slug}`, ['.mdx', '.md']);
	}
	if (head === 'blog' && rest.length === 1) {
		return newestInDir(`src/content/blog/${lang}`);
	}

	// /reader/* and /note/*
	if (head === 'reader' || head === 'note') {
		const sub = rest[1];
		// /reader/  /note/
		if (rest.length === 1) {
			const base =
				lang === 'en'
					? `src/pages/${head}/index`
					: `src/pages/${lang}/${head}/index`;
			return tryExt(base, ['.astro']);
		}
		// /reader/alternatives/<slug>/
		if (sub === 'alternatives' && rest.length >= 3) {
			const altDir =
				head === 'reader' ? 'reader-alternatives' : 'note-alternatives';
			const slug = rest.slice(2).join('/');
			return (
				tryExt(`src/content/${altDir}/${lang}/${slug}`, ['.mdx', '.md']) ??
				tryExt(`src/content/${altDir}/en/${slug}`, ['.mdx', '.md'])
			);
		}
		// /reader/alternatives/  list
		if (sub === 'alternatives') {
			const altDir =
				head === 'reader' ? 'reader-alternatives' : 'note-alternatives';
			return newestInDir(`src/content/${altDir}/${lang}`);
		}
		// /reader/changelog/
		if (sub === 'changelog') {
			const clDir = head === 'reader' ? 'reader-changelog' : 'note-changelog';
			return newestInDir(`src/content/${clDir}`);
		}
		// /reader/blog/  /note/blog/
		if (sub === 'blog') {
			return newestInDir(`src/content/blog/${lang}`);
		}
	}

	return null;
}
