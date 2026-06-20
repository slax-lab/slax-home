// Remark plugin: rewrite root-relative internal links inside localized content
// to their locale-prefixed URL. e.g. in src/content/blog/ja/foo.mdx,
// `/reader/alternatives/pocket/` → `/ja/reader/alternatives/pocket/`.
//
// Why this works without page context: every localized route renders its own
// locale's content file (src/content/<collection>/<locale>/<slug>.mdx), so the
// source file path alone determines the target locale.
//
// A link is rewritten only when the localized target is known to exist:
//   - static [lang]-routed pages (about, blog index, …) exist for all locales
//   - content-backed pages are checked against src/content/<collection>/<locale>/
// Everything else passes through untouched: images and other static assets,
// already-prefixed links (the es/ files), external URLs, unknown paths.

import fs from 'node:fs';
import path from 'node:path';

// Routes generated for every locale via src/pages/[lang]/… or per-locale dirs.
const STATIC_LOCALIZED_ROUTES = new Set([
	'/',
	'/about/',
	'/privacy/',
	'/terms/',
	'/blog/',
	'/reader/',
	'/reader/alternatives/',
	'/reader/changelog/',
	'/reader/blog/',
	'/note/',
	'/note/alternatives/',
	'/note/changelog/',
	'/note/blog/',
]);

// URL pattern → content collection directory, for per-locale existence checks.
const COLLECTION_ROUTES = [
	{ pattern: /^\/blog\/(.+?)\/?$/, dir: 'blog' },
	{ pattern: /^\/reader\/alternatives\/(.+?)\/?$/, dir: 'reader-alternatives' },
	{ pattern: /^\/note\/alternatives\/(.+?)\/?$/, dir: 'note-alternatives' },
];

function withTrailingSlash(p) {
	return p.endsWith('/') ? p : `${p}/`;
}

/**
 * Parse `<...>/src/content/<collection>/<locale>/<...>.mdx` out of a vfile path.
 * @returns {{ locale: string, contentRoot: string } | null}
 */
function parseContentPath(filePath, locales) {
	if (!filePath) return null;
	const segs = filePath.split(path.sep);
	const i = segs.findIndex(
		(s, idx) => s === 'src' && segs[idx + 1] === 'content',
	);
	if (i === -1) return null;
	const locale = segs[i + 3];
	if (!locale || !locales.includes(locale)) return null;
	return { locale, contentRoot: segs.slice(0, i + 2).join(path.sep) };
}

/**
 * Return the locale-prefixed URL, or null when the link must not be touched.
 */
function localizeUrl(url, locale, contentRoot, locales) {
	if (!url?.startsWith('/') || url.startsWith('//')) return null;
	const [pathname] = url.split(/[?#]/);
	const first = pathname.split('/')[1];
	if (locales.includes(first)) return null; // already locale-prefixed
	if (STATIC_LOCALIZED_ROUTES.has(withTrailingSlash(pathname))) {
		return `/${locale}${url}`;
	}
	for (const { pattern, dir } of COLLECTION_ROUTES) {
		const m = pathname.match(pattern);
		if (!m) continue;
		const base = path.join(contentRoot, dir, locale, m[1]);
		if (fs.existsSync(`${base}.mdx`) || fs.existsSync(`${base}.md`)) {
			return `/${locale}${url}`;
		}
		return null; // no translation — keep pointing at the default-locale page
	}
	return null; // assets, downloads, unknown paths
}

function visitLinks(node, fn) {
	if (node.type === 'link' || node.type === 'definition') fn(node);
	if (Array.isArray(node.children)) {
		for (const child of node.children) visitLinks(child, fn);
	}
}

/**
 * @param {{ locales: readonly string[], defaultLocale: string }} options
 */
export function remarkLocaleLinks({ locales, defaultLocale }) {
	return (tree, file) => {
		const ctx = parseContentPath(file.path, locales);
		if (!ctx || ctx.locale === defaultLocale) return;
		visitLinks(tree, (node) => {
			const rewritten = localizeUrl(
				node.url,
				ctx.locale,
				ctx.contentRoot,
				locales,
			);
			if (rewritten) node.url = rewritten;
		});
	};
}
