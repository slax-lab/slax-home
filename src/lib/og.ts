import sharp from 'sharp';

interface OgInput {
	eyebrow: string;
	title: string;
	accentWord?: string;
}

const W = 1200;
const H = 630;
const PAD_X = 120;
const TITLE_SIZE = 88;
const TITLE_LINE_H = 1.06;
const TITLE_MAX_LINES = 3;
const TITLE_MAX_W = W - PAD_X * 2;

function escapeXml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function approxCharWidth(ch: string, fontSize: number) {
	const code = ch.charCodeAt(0);
	if (code > 0x2e80) return fontSize * 0.95;
	if (ch === ' ') return fontSize * 0.28;
	if (/[ilI.,:;'!|()]/.test(ch)) return fontSize * 0.28;
	if (/[mwMW]/.test(ch)) return fontSize * 0.78;
	return fontSize * 0.5;
}

function measure(text: string, fontSize: number) {
	let w = 0;
	for (const ch of text) w += approxCharWidth(ch, fontSize);
	return w;
}

function wrap(text: string, fontSize: number, maxW: number, maxLines: number) {
	const tokens = text.split(/\s+/).filter(Boolean);
	const lines: string[] = [];
	let line = '';
	for (const tok of tokens) {
		const candidate = line ? `${line} ${tok}` : tok;
		if (measure(candidate, fontSize) <= maxW) {
			line = candidate;
		} else {
			if (line) lines.push(line);
			line = tok;
		}
	}
	if (line) lines.push(line);
	if (lines.length <= maxLines) return lines;
	const kept = lines.slice(0, maxLines);
	let last = kept[maxLines - 1];
	while (measure(`${last}…`, fontSize) > maxW && last.length > 0) {
		last = last.slice(0, -1).trimEnd();
	}
	kept[maxLines - 1] = `${last}…`;
	return kept;
}

export async function renderOg({
	eyebrow,
	title,
	accentWord,
}: OgInput): Promise<Buffer> {
	const lines = wrap(title, TITLE_SIZE, TITLE_MAX_W, TITLE_MAX_LINES);
	const titleBlockH = lines.length * TITLE_SIZE * TITLE_LINE_H;
	const titleTop = (H - titleBlockH) / 2 + TITLE_SIZE * 0.82;

	const titleTspans = lines
		.map((ln, i) => {
			let inner = escapeXml(ln);
			if (accentWord) {
				const re = new RegExp(
					`(${escapeXml(accentWord).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
					'i',
				);
				inner = inner.replace(
					re,
					`<tspan font-style="italic" fill="#3A5F4D">$1</tspan>`,
				);
			}
			const dy = i === 0 ? 0 : TITLE_SIZE * TITLE_LINE_H;
			return `<tspan x="${PAD_X}" dy="${dy}">${inner}</tspan>`;
		})
		.join('');

	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
	<rect width="${W}" height="${H}" fill="#FAF7F2"/>
	<circle cx="${PAD_X}" cy="148" r="22" fill="#3A5F4D"/>
	<text x="${PAD_X + 42}" y="167" font-family="Source Serif 4, Source Serif Pro, Georgia, serif" font-size="48" font-weight="500" fill="#1B1A17">Slax</text>
	<text font-family="Source Serif 4, Source Serif Pro, Georgia, serif" font-size="${TITLE_SIZE}" font-weight="400" fill="#1B1A17" y="${titleTop}">${titleTspans}</text>
	<text x="${PAD_X}" y="${H - 70}" font-family="JetBrains Mono, Menlo, monospace" font-size="22" letter-spacing="4" fill="#8A8375">${escapeXml(eyebrow.toUpperCase())}</text>
</svg>`;

	return sharp(Buffer.from(svg), { density: 384 })
		.resize(W, H, { fit: 'cover' })
		.png({ compressionLevel: 9, quality: 90 })
		.toBuffer();
}
