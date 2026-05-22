#!/usr/bin/env tsx
/**
 * Fetch the TTF/OTF font files Satori needs to render OG images.
 *
 * The fonts (~50 MB total) are gitignored — run `pnpm fonts:download`
 * after `pnpm install` so the build can find them.
 *
 * CI/CD: invoke this in the same step as `pnpm build` (the build script
 * itself fails fast if a font is missing, so this is a hard prerequisite).
 */

import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// Use static (non-variable) OTFs — Satori's bundled opentype.js parser can't
// read the fvar table in Noto's variable TTFs (parseFvarAxis crash).
const TARGETS = [
	{
		file: 'NotoSansSC-Regular.otf',
		url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/SC/NotoSansSC-Regular.otf',
	},
	{
		file: 'NotoSansTC-Regular.otf',
		url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/TC/NotoSansTC-Regular.otf',
	},
	{
		file: 'NotoSansJP-Regular.otf',
		url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/JP/NotoSansJP-Regular.otf',
	},
	{
		file: 'NotoSansKR-Regular.otf',
		url: 'https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/KR/NotoSansKR-Regular.otf',
	},
	{
		file: 'SourceSerif4-Regular.ttf',
		url: 'https://github.com/adobe-fonts/source-serif/raw/release/TTF/SourceSerif4-Regular.ttf',
	},
	{
		file: 'SourceSerif4-Italic.ttf',
		url: 'https://github.com/adobe-fonts/source-serif/raw/release/TTF/SourceSerif4-It.ttf',
	},
	{
		file: 'JetBrainsMono-Regular.ttf',
		url: 'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Regular.ttf',
	},
];

const DEST = new URL('../../src/lib/fonts/', import.meta.url).pathname;

if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

for (const { file, url } of TARGETS) {
	const path = DEST + file;
	if (existsSync(path)) {
		console.log(`✓ ${file} (cached)`);
		continue;
	}
	process.stdout.write(`↓ ${file} … `);
	const res = await fetch(url);
	if (!res.ok || !res.body) throw new Error(`${file}: ${res.status}`);
	await pipeline(Readable.fromWeb(res.body as never), createWriteStream(path));
	console.log('done');
}

console.log(`\nFonts ready at ${DEST}`);
