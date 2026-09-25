# SEO Canonical and Schema Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align generated SEO URLs with the confirmed primary host `https://www.slax.com` and replace the broken shared Organization logo URL.

**Architecture:** Keep one source of truth for the site origin in Astro config and the hreflang helper. The shared Base layout will emit the same primary origin for canonical, hreflang, OG and WebSite publisher data, while product schemas continue to use the shared origin and their existing valid PNG logo. Generated sitemap and robots output will inherit the Astro site origin.

**Tech Stack:** Astro 6, TypeScript, Astro sitemap integration, pnpm validation scripts.

**Spec:** The SEO audit in `/Users/yjc/Documents/Obsidian Vault/slax.md`, narrowed by the user’s confirmation that `www.slax.com` is the intended canonical host.

## Global Constraints

- Preserve the existing redirect from `https://slax.com` to `https://www.slax.com`.
- Do not change the confirmed primary-host policy or add `meta keywords`.
- Do not alter the Slax Lab / Starry Tech legal relationship without business confirmation.
- Do not add speculative `sameAs` or entity relationships.

## Review Focus

- Every generated absolute SEO URL uses `https://www.slax.com`.
- The shared WebSite publisher logo is a reachable PNG rather than the missing favicon URL.
- Sitemap index, child sitemap and robots sitemap directive agree on the same primary host.
- Product schema logo and URLs remain valid after the origin change.
- Existing locale and URL validation checks continue to pass.

### Task 1: Update the primary site origin and shared logo

**Files:**
- Modify: `astro.config.mjs:23-25`
- Modify: `src/lib/hreflang.ts:6-10`
- Modify: `src/layouts/Base.astro:76-87`
- Modify: `public/robots.txt:33`

- [ ] **Step 1: Run the existing checks against a www expectation and verify the current build fails that expectation.**

Run: `pnpm build && pnpm check:hreflang`
Expected before implementation: the generated canonical and sitemap URLs still use `https://slax.com`, showing the pre-fix mismatch.

- [ ] **Step 2: Change the Astro site origin and shared helper origin to `https://www.slax.com`.**

Use the same string in `astro.config.mjs` and `src/lib/hreflang.ts`, preserving all route and locale behavior.

- [ ] **Step 3: Change the shared WebSite publisher logo to `/images/slax-logo.png`.**

Keep the existing Organization name and URL semantics; only replace the known 404 logo URL.

- [ ] **Step 4: Update the robots sitemap directive to `https://www.slax.com/sitemap-index.xml`.**

- [ ] **Step 5: Rebuild and run the existing URL, hreflang and sitemap checks.**

Run: `pnpm build && pnpm check:hreflang && pnpm check:locale-links && pnpm check:urls`
Expected: all commands exit 0; generated canonical, hreflang, sitemap and robots references use `www`.

- [ ] **Step 6: Inspect generated HTML and XML for the broken logo and apex host.**

Run targeted `rg` checks over `dist/` and verify the shared JSON-LD logo is the PNG URL and no generated SEO URL uses the apex host.

- [ ] **Step 7: Commit the implementation.**

```bash
git add astro.config.mjs src/lib/hreflang.ts src/layouts/Base.astro public/robots.txt docs/superpowers/plans/2026-09-25-seo-canonical-schema-fixes.md
git commit -m "fix(seo): align canonical host and organization logo"
```

### Task 2: Produce the audit disposition report

**Files:**
- Create: `docs/seo/2026-09-25-audit-disposition.md`

- [ ] **Step 1: Record the implemented fixes and evidence.**

Include the primary-host policy, shared logo correction, validation commands, and the generated sitemap structure.

- [ ] **Step 2: Record deferred or unnecessary findings.**

Explicitly mark legal-entity modeling, stable `@id`, homepage product relationships, `sameAs`, Reader mobile reset, impression/index changes, meta keywords, GA and AdSense according to the analysis.

- [ ] **Step 3: Run the final validation suite and commit the report.**

Run: `pnpm lint && pnpm check:all`
Then commit the report with the implementation.
