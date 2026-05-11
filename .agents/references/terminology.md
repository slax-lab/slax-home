# Slax Terminology

> Canonical glossary for Slax product names, feature names, and concepts.
> Consumed by `style_lint` (auto-checks documents for term consistency) and
> `draft_*` skills (uses correct casing when generating drafts).
>
> **Source of truth:** Operational rules below come from `slax-home/CLAUDE.md`
> "品牌与大小写规则" and "排版偏好" sections. When in doubt, that file wins —
> this file mirrors them in machine-readable form.

## Product Names

| Term | Definition | Casing rule |
|---|---|---|
| **Slax** | The company and parent brand | Always "Slax" — never "SLAX" or "slax". Never apply `text-transform: uppercase` to brand names. |
| **Slax Reader** | Reader product (RSS / web articles / capture) | Always "Slax Reader" as a proper noun. Mixed case preserved on rendering. |
| **Slax Note** | Note-taking product | Always "Slax Note" as a proper noun. Mixed case preserved on rendering. |

## Slax Reader Concepts

> ❓ TODO: 填实际功能命名（建议从 Slax Reader 应用 UI / 设置面板里逐个抽取）

| Term | Definition |
|---|---|
| **Inbox** | _[TBD: the default landing view of newly captured items]_ |
| **Highlight** | _[TBD: a user-saved excerpt from an article]_ |
| **Collection** | _[TBD: a user-curated grouping of items]_ |
| **Capture** | _[TBD: action of saving a page/article to Reader]_ |

## Slax Note Concepts

> ❓ TODO: 填 Note 的核心概念

| Term | Definition |
|---|---|
| **Note** | _[TBD]_ |
| **Workspace** | _[TBD]_ |

## Capitalization Rules

**Slax brand names** (mixed case, never all-caps):
- ✅ Slax / Slax Reader / Slax Note
- ❌ SLAX / SLAX READER / slax reader

**Apple platforms** (vendor casing — lowercase prefix):
- ✅ iOS / iPadOS / macOS / tvOS
- ❌ IOS / iPados / MacOS / TVOS

**Other external brands** (vendor casing):
- ✅ GitHub / TikTok / LinkedIn
- ❌ Github / Tiktok / Linkedin

**Generic English uppercase** (allowed only when free of brand words):
- ✅ "RELEASE NOTES" / "FEATURED" — pure English, no brand inside
- ❌ "SLAX RELEASE NOTES" — never put a brand into uppercase context

**For "eyebrow" labels** (small spaced caps look) — use mono font + small
letter-spacing (e.g. `0.04em`), NOT `text-transform: uppercase`. See
`slax-home/CLAUDE.md` line 93.

## Typography Conventions

- **Blog body**: no drop cap on first paragraph. A slightly larger lede
  paragraph is fine. (Source: `slax-home/CLAUDE.md` line 97.)
- **OG images**: every page gets a dedicated 1200×630 PNG via
  `src/lib/og.ts` `renderOg()`. No fallback to `/og-default.png` on new
  pages. (Source: `slax-home/CLAUDE.md` lines 99-125.)

## Deprecated Terms

> ❓ TODO: 列出 Slax 内部不再使用的旧术语（重命名前的旧叫法 / 早期产品名 / 已废弃 feature）

| Old term | New term | Reason |
|---|---|---|
| _[example]_ | _[example]_ | _[example]_ |

## Anti-Patterns (Words to Avoid)

These are **anti-patterns** for Slax voice — not hard banned by `style_lint`
yet (the `OZ_TERMS_TO_AVOID` list in `style_lint.py` is currently empty),
but should be flagged in human review:

- "AI-powered" → just describe what the feature does
- "leverage" → use "use"
- "next-generation" / "revolutionary" / "game-changing" → describe the actual benefit
- "users" in instructional content → prefer "you" (second person)
- Manipulative urgency: "Don't miss out", "Limited time" → drop entirely

> Once these are agreed-upon hard rules, move them into `OZ_TERMS_TO_AVOID`
> in `.agents/skills/style_lint/style_lint.py` so they fail the lint.
