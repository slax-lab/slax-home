// OG image renderer.
//
// Pipeline: Satori produces an SVG from a JSX-like vDOM (with embedded font
// glyphs), then sharp converts the SVG to a PNG. Satori is used because the
// previous sharp-only pipeline relied on librsvg/fontconfig discovering the
// right font families on the build server, which works only for Latin and
// breaks for CJK on Cloudflare Pages workers.
//
// Fonts are gitignored 50 MB binaries; run `pnpm fonts:download` before build.

import fs from 'node:fs';
import path from 'node:path';
import satori, { type Font, type SatoriOptions } from 'satori';
import sharp from 'sharp';
import type { Locale } from '~/i18n/locales';

interface OgInput {
	eyebrow: string;
	title: string;
	accentWord?: string;
	/** Page locale — controls CJK font priority. Defaults to 'en'. */
	lang?: Locale;
}

const W = 1200;
const H = 630;

const FONT_DIR = path.join(process.cwd(), 'src/lib/fonts');

function loadFont(name: string): Buffer {
	const full = path.join(FONT_DIR, name);
	if (!fs.existsSync(full)) {
		throw new Error(
			`Missing OG font: ${name}\nRun \`pnpm fonts:download\` to fetch.`,
		);
	}
	return fs.readFileSync(full);
}

// Lazily load fonts once per process. Build invokes renderOg many times.
let fontCache: Record<string, Buffer> | null = null;
function loadAllFonts() {
	if (fontCache) return fontCache;
	fontCache = {
		serif: loadFont('SourceSerif4-Regular.ttf'),
		serifItalic: loadFont('SourceSerif4-Italic.ttf'),
		mono: loadFont('JetBrainsMono-Regular.ttf'),
		'zh-Hans': loadFont('NotoSansSC-Regular.otf'),
		'zh-Hant': loadFont('NotoSansTC-Regular.otf'),
		ja: loadFont('NotoSansJP-Regular.otf'),
		ko: loadFont('NotoSansKR-Regular.otf'),
	};
	return fontCache;
}

// Map locale → CJK font family name (matches Satori font registration).
// Latin-script locales (de/es/pt-BR/vi/id/fr) render with Source Serif alone;
// vi's diacritics are covered by Source Serif 4's Latin Extended-A glyphs.
const CJK_FAMILY: Record<Locale, string | null> = {
	en: null,
	'zh-Hans': 'Noto Sans SC',
	'zh-Hant': 'Noto Sans TC',
	ja: 'Noto Sans JP',
	ko: 'Noto Sans KR',
	de: null,
	es: null,
	'pt-BR': null,
	vi: null,
	id: null,
	fr: null,
};

function buildFonts(lang: Locale): Font[] {
	const f = loadAllFonts();
	const out: Font[] = [
		{ name: 'Source Serif', data: f.serif, weight: 400, style: 'normal' },
		{ name: 'Source Serif', data: f.serifItalic, weight: 400, style: 'italic' },
		{ name: 'JetBrains Mono', data: f.mono, weight: 400, style: 'normal' },
	];
	// Always include all CJK fonts — Satori subsets per glyph used, so adding
	// unused fonts costs nothing in the output SVG, and it makes mixed-language
	// titles (e.g. a Japanese post that references 中文) render correctly.
	out.push(
		{ name: 'Noto Sans SC', data: f['zh-Hans'], weight: 400, style: 'normal' },
		{ name: 'Noto Sans TC', data: f['zh-Hant'], weight: 400, style: 'normal' },
		{ name: 'Noto Sans JP', data: f.ja, weight: 400, style: 'normal' },
		{ name: 'Noto Sans KR', data: f.ko, weight: 400, style: 'normal' },
	);
	void lang;
	return out;
}

function familyChain(lang: Locale): string {
	const cjk = CJK_FAMILY[lang];
	const chain = ['Source Serif'];
	if (cjk) chain.push(cjk);
	// Always include all CJK fallbacks so Latin titles can still embed stray
	// CJK chars (and vice versa) without breaking.
	for (const family of [
		'Noto Sans SC',
		'Noto Sans TC',
		'Noto Sans JP',
		'Noto Sans KR',
	]) {
		if (!chain.includes(family)) chain.push(family);
	}
	return chain.join(', ');
}

/**
 * Build the JSX-like vDOM Satori expects. Title supports a single accent word
 * rendered italic + green; everything else is the regular weight in the
 * locale-appropriate font.
 */
// biome-ignore lint/suspicious/noExplicitAny: Satori vDOM is loosely typed
function buildVdom(input: OgInput): any {
	const { eyebrow, title, accentWord, lang = 'en' } = input;
	const family = familyChain(lang);

	const titleChildren = accentWord ? splitWithAccent(title, accentWord) : title;

	return {
		type: 'div',
		props: {
			style: {
				width: W,
				height: H,
				background: '#FAF7F2',
				display: 'flex',
				flexDirection: 'column',
				padding: '120px',
				fontFamily: family,
				color: '#1B1A17',
			},
			children: [
				// Brand mark + name
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							alignItems: 'center',
							gap: '24px',
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										width: '44px',
										height: '44px',
										borderRadius: '22px',
										background: '#3A5F4D',
									},
								},
							},
							{
								type: 'div',
								props: {
									style: {
										fontSize: '48px',
										fontWeight: 500,
									},
									children: 'Slax',
								},
							},
						],
					},
				},
				// Title block (vertically centered via auto margins)
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							flex: 1,
							fontSize: '88px',
							lineHeight: 1.08,
							fontWeight: 400,
							letterSpacing: '-0.01em',
						},
						children: {
							type: 'div',
							props: {
								style: { display: 'flex', flexWrap: 'wrap' },
								children: titleChildren,
							},
						},
					},
				},
				// Eyebrow
				{
					type: 'div',
					props: {
						style: {
							fontFamily: 'JetBrains Mono',
							fontSize: '22px',
							letterSpacing: '4px',
							color: '#8A8375',
						},
						children: eyebrow.toUpperCase(),
					},
				},
			],
		},
	};
}

// biome-ignore lint/suspicious/noExplicitAny: Satori vDOM
function splitWithAccent(title: string, accent: string): any[] {
	const idx = title.toLowerCase().indexOf(accent.toLowerCase());
	if (idx < 0) return [title];
	return [
		title.slice(0, idx),
		{
			type: 'span',
			props: {
				style: { color: '#3A5F4D', fontStyle: 'italic' },
				children: title.slice(idx, idx + accent.length),
			},
		},
		title.slice(idx + accent.length),
	];
}

export async function renderOg(input: OgInput): Promise<Buffer> {
	const fonts = buildFonts(input.lang ?? 'en');
	const opts: SatoriOptions = { width: W, height: H, fonts };
	const svg = await satori(buildVdom(input), opts);
	return sharp(Buffer.from(svg))
		.png({ compressionLevel: 9, quality: 90 })
		.toBuffer();
}
