# SEO audit disposition — 2026-09-25

This report compares the SEO audit in `/Users/yjc/Documents/Obsidian Vault/slax.md` with the current Astro source and generated site. The repair work is on branch `codex/seo-canonical-schema-fixes`.

## Fixed in this branch

### Primary host consistency — fixed

The confirmed primary host is `https://www.slax.com`. The existing apex-to-www 301 remains unchanged. Generated canonical URLs, hreflang URLs, Open Graph URLs, Schema URLs, sitemap URLs, and the robots sitemap directive now use the www host.

Changed sources:

- `astro.config.mjs`
- `src/lib/hreflang.ts`
- `public/robots.txt`
- `scripts/i18n/eval-hreflang.ts`
- `scripts/i18n/eval-sitemap.ts`

Localized content also contained absolute apex links to `/note/` and `/blog/`. Those 128 links across 77 content files are now root-relative, so the build can apply the correct locale prefix and primary host.

### Organization logo 404 — fixed

The shared `WebSite.publisher.logo` no longer points to `/favicon.svg`. It now points to `https://www.slax.com/images/slax-logo.png`, the existing 256 × 256 PNG asset.

### Stable entity IDs and homepage relationships — fixed

The shared JSON-LD now includes:

- `Organization` ID: `https://www.slax.com/#organization`
- `WebSite` ID: `https://www.slax.com/#website`
- page-specific `WebPage` IDs
- Reader product ID: `https://www.slax.com/reader/#software`
- Note product ID: `https://www.slax.com/note/#software`

Homepage `WebPage` data now connects to the shared website and references both product IDs through `hasPart`.

### Organization `sameAs` — fixed conservatively

The shared organization entity now links only to the organization-level accounts already published on the About page:

- `https://x.com/SlaxHQ`
- `https://github.com/slax-lab`

Product and community accounts were not added to the organization entity.

### Regression checks — added

- `pnpm check:schema` validates generated JSON-LD identities, logo URLs, primary-host usage, and homepage product references.
- `pnpm check:hreflang` now expects the www host and validates the generated sitemap origins.
- `pnpm check:all` includes the schema check.

## Deferred pending business confirmation

### Slax Lab versus Starry Tech publisher — not changed

Reader uses `Slax Lab`; Note uses `Starry Tech Pte. Ltd.`. The legal pages currently describe products as operated by Slax Lab. I did not invent a `legalName`, `brand`, `parentOrganization`, or other relationship. The business/legal owner should confirm whether Starry Tech is the legal entity before this is modeled in Schema.

The branch does give the Starry Tech Organization a stable internal ID when it appears, but it does not claim that the two names are the same organization.

### Reader mobile article reset — not changed

This is a product/runtime issue, not an SEO issue. The current repository contains the marketing/blog site, not the Reader application reading surface. It needs a reproducible device/browser case and should be handled separately.

### Impression and index stability — not changed

This needs Google Search Console time-series data, query data, and coverage details. Source changes alone cannot establish why impressions or indexed pages changed.

## Not necessary to fix

### `sitemap.xml` reported as missing

The report's tool expected a single `sitemap.xml`. Astro generates `sitemap-index.xml` plus `sitemap-0.xml`, and `robots.txt` points to the index. This is a valid sitemap setup; no alias was added.

### `meta keywords` reported as N/A

No `meta keywords` tag was added. Google Search does not use that tag for ranking. Keyword work should focus on search intent, titles, headings, descriptions, body content, internal anchors, and dedicated landing pages.

### Google Analytics / AdSense reported as missing

These are product, measurement, and monetization choices. They are not SEO requirements and were not added.

## Verification evidence

After the final build:

- `pnpm build` — passed; 453 pages built.
- `pnpm check:hreflang` — passed; 453 pages, 0 errors, 0 warnings; 442 sitemap URLs and 4,840 alternates.
- `pnpm check:schema` — passed; 453 pages, 11 homepages, 2 products, 0 errors.
- `pnpm check:locale-links` — passed; 270 localized content pages and 966 prefixed links.
- `pnpm check:urls` — passed; 452 current URLs, 0 missing baseline URLs.
- `git diff --check` — passed.

`pnpm lint` — passed after formatting the changed files; 0 errors, 256 existing warnings and 6 informational diagnostics remain. Many warnings concern imports referenced by Astro templates; no unsafe import-removal fixes were applied. The build also reports 3 existing CSS minifier warnings in the French Reader page.
