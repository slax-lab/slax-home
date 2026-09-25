#!/usr/bin/env tsx
/** Check built JSON-LD identity links, local logos, and the primary host. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const ORIGIN = 'https://www.slax.com';
const ORGANIZATION = `${ORIGIN}/#organization`;
const WEBSITE = `${ORIGIN}/#website`;
const LOGO = `${ORIGIN}/images/slax-logo.png`;
const PRODUCTS = new Map([
	['Slax Reader', `${ORIGIN}/reader/#software`],
	['Slax Note', `${ORIGIN}/note/#software`],
]);
const HOME =
	/^(?:(?:zh-Hans|zh-Hant|ja|ko|de|fr|es|pt-BR|id|vi)\/)?index\.html$/;
let errors = 0;
let pages = 0;
let homes = 0;
const definitions = new Set<string>();
const refs = new Set<string>();

type Node = Record<string, unknown>;
function node(value: unknown): Node {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
		? (value as Node)
		: {};
}
function check(ok: unknown, message: string) {
	if (ok) return;
	if (errors < 12) console.error(`❌ ${message}`);
	errors += 1;
}
function* walk(dir: string): Generator<string> {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const file = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(file);
		else if (entry.name.endsWith('.html')) yield file;
	}
}
function* nodes(value: unknown): Generator<Node> {
	if (Array.isArray(value)) {
		for (const item of value) yield* nodes(item);
	} else if (typeof value === 'object' && value !== null) {
		const object = node(value);
		yield object;
		for (const child of Object.values(object)) yield* nodes(child);
	}
}

if (!existsSync(DIST)) {
	console.error('dist/ missing. Run pnpm build first.');
	process.exit(1);
}
// This verifies the deployed asset exists; it does not claim a live HTTP check.
check(
	existsSync(join(DIST, 'images/slax-logo.png')),
	'Organization logo asset missing',
);
for (const file of walk(DIST)) {
	pages += 1;
	const label = relative(DIST, file);
	const html = readFileSync(file, 'utf8');
	const canonical = html.match(
		/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/,
	)?.[1];
	check(
		!/\b(?:href|src|content)="https?:\/\/slax\.com(?:[/?#]|"|&)/.test(html),
		`${label}: apex URL in HTML attributes`,
	);
	const schemas: Node[] = [];
	for (const match of html.matchAll(
		/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
	)) {
		try {
			schemas.push(...nodes(JSON.parse(match[1])));
		} catch {
			check(false, `${label}: invalid JSON-LD`);
		}
	}
	const site = schemas.find((s) => s['@type'] === 'WebSite');
	check(site?.['@id'] === WEBSITE, `${label}: missing stable WebSite @id`);
	const publisher = node(site?.publisher);
	check(
		publisher['@id'] === ORGANIZATION,
		`${label}: WebSite publisher identity`,
	);
	check(publisher.logo === LOGO, `${label}: WebSite publisher logo`);
	check(
		Array.isArray(publisher.sameAs) &&
			publisher.sameAs.length === 2 &&
			publisher.sameAs.includes('https://github.com/slax-lab') &&
			publisher.sameAs.includes('https://x.com/SlaxHQ'),
		`${label}: organization sameAs must match published organization accounts`,
	);
	for (const s of schemas) {
		for (const value of Object.values(s)) {
			check(
				typeof value !== 'string' ||
					!/^https?:\/\/slax\.com(?:[/?#]|$)/.test(value),
				`${label}: apex URL in JSON-LD`,
			);
		}
		if (s['@type'] === 'Organization') {
			const expectedId =
				s.name === 'Slax Lab'
					? ORGANIZATION
					: s.name === 'Starry Tech Pte. Ltd.'
						? `${ORIGIN}/#starry-tech`
						: undefined;
			if (expectedId)
				check(s['@id'] === expectedId, `${label}: ${String(s.name)} identity`);
			if ('logo' in s)
				check(
					(typeof s.logo === 'string' ? s.logo : node(s.logo).url) === LOGO,
					`${label}: Organization logo`,
				);
		}
		if (
			s['@type'] === 'SoftwareApplication' &&
			typeof s.name === 'string' &&
			PRODUCTS.has(s.name)
		) {
			check(
				s['@id'] === PRODUCTS.get(s.name),
				`${label}: ${s.name} identity disagrees with homepage`,
			);
			if ('offers' in s) {
				definitions.add(String(s['@id']));
				const expectedPublisher =
					s.name === 'Slax Reader' ? 'Slax Lab' : 'Starry Tech Pte. Ltd.';
				check(
					node(s.publisher).name === expectedPublisher,
					`${label}: product publisher changed without business confirmation`,
				);
			}
		}
	}
	if (HOME.test(label)) {
		homes += 1;
		const page = schemas.find(
			(s) => s['@type'] === 'WebPage' && s['@id'] === `${canonical}#webpage`,
		);
		check(
			node(page?.isPartOf)['@id'] === WEBSITE,
			`${label}: homepage must connect to WebSite`,
		);
		const parts = Array.isArray(page?.hasPart) ? page.hasPart : [];
		const ids = parts.map((value) => node(value)['@id']);
		check(
			ids.length === 2 &&
				[...PRODUCTS.values()].every((id) => ids.includes(id)),
			`${label}: homepage must reference both products`,
		);
		for (const id of ids) if (typeof id === 'string') refs.add(id);
	}
}
check(pages > 0 && homes > 0, 'No pages/homepages checked');
for (const id of refs)
	check(
		definitions.has(id),
		`Homepage product reference has no full product definition: ${id}`,
	);
check(
	[...PRODUCTS.values()].every((id) => definitions.has(id)),
	'Missing Reader/Note full definitions',
);
console.log(
	`Schema summary: ${pages} pages, ${homes} homepages, ${definitions.size} products; ${errors} errors.`,
);
if (errors > 0) process.exit(1);
