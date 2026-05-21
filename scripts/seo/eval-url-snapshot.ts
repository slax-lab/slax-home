#!/usr/bin/env tsx
/**
 * Eval 10.1 #7 — URL regression check.
 *
 * Compares every English URL in the current dist/ build against the
 * pre-i18n baseline at evals/baselines/url-snapshot.json. Any English
 * URL that disappeared is a red-flag SEO regression and fails CI.
 *
 * Newly added URLs (both English and prefixed) are reported as warnings
 * — they're expected during ongoing i18n rollout, but the operator
 * should glance at them to make sure no garbage paths sneaked in.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const BASELINE = join(ROOT, 'evals/baselines/url-snapshot.json');
const PREFIXED = ['zh-Hans', 'zh-Hant', 'ja', 'ko'];

if (!existsSync(DIST)) {
	console.error('❌ dist/ missing. Run `pnpm build` first.');
	process.exit(1);
}
if (!existsSync(BASELINE)) {
	console.error(
		`❌ Baseline missing at ${relative(ROOT, BASELINE)}. Capture one before refactor.`,
	);
	process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE, 'utf8')) as {
	urls: string[];
};
const baselineSet = new Set(baseline.urls);

// Collect current URLs from dist/. Matches the same normalisation as
// the captured baseline (find dist -name index.html ... | sed pipeline).
const current: string[] = [];
function walk(dir: string) {
	for (const item of readdirSync(dir)) {
		const full = join(dir, item);
		const st = statSync(full);
		if (st.isDirectory()) walk(full);
		else if (item === 'index.html') {
			const rel = relative(DIST, full).replace(/\\/g, '/');
			// dist/index.html → "/", dist/about/index.html → "/about"
			let url = `/${rel.replace(/index\.html$/, '').replace(/\/$/, '')}`;
			if (url === '') url = '/';
			if (url.includes('/og/')) continue;
			current.push(url);
		}
	}
}
walk(DIST);
current.sort();

const currentSet = new Set(current);

// Partition: English URLs (no lang prefix) vs prefixed.
const isPrefixed = (u: string) =>
	PREFIXED.some((p) => u === `/${p}` || u.startsWith(`/${p}/`));
const englishCurrent = current.filter((u) => !isPrefixed(u));

// Missing English URLs = critical
const missing = baseline.urls.filter((u) => !currentSet.has(u));
const added = current.filter((u) => !baselineSet.has(u));

if (missing.length > 0) {
	console.log(
		`❌ ${missing.length} English URL(s) disappeared since baseline:`,
	);
	for (const u of missing) console.log(`   - ${u}`);
}

if (added.length > 0) {
	console.log(`ℹ️  ${added.length} new URL(s) since baseline:`);
	for (const u of added.slice(0, 30)) console.log(`   + ${u}`);
	if (added.length > 30) console.log(`   … (${added.length - 30} more)`);
}

console.log('');
console.log(
	`URL snapshot: baseline=${baseline.urls.length} current=${current.length} (en=${englishCurrent.length}) missing=${missing.length} added=${added.length}`,
);

if (missing.length > 0) process.exit(1);
