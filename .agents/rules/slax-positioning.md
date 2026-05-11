# Slax Positioning Briefing

> Slax 版本的品牌定位简报。对齐 Warp 的 `.agents/rules/oz-style-guidelines.md` 结构，写完后所有 `draft_*` skill 出来的文档口径就锁住了。
>
> **Source-of-truth split:**
> - **Operational rules** (brand casing, typography, OG images): owned by `slax-home/CLAUDE.md` —
>   when in doubt, that file wins. The machine-readable mirror lives in
>   `.agents/references/terminology.md`.
> - **Positioning & voice** (this file): the strategic layer that operational
>   rules don't cover — what is Slax, who it's for, how to talk about it.
>
> **使用方式**：标 ❓ TODO 的部分由 Luca 填业务判断。其他部分是基于公开信息的安全默认值，可直接采用或改写。
>
> **语言**：英文（要被 agent skill 消费 → 输出文档语言一致）。

---

## Product Architecture

### What is Slax?

Slax is an AI-native productivity software company. Slax builds two core consumer products for knowledge workers:

1. **Slax Reader** — A modern reader for the web, RSS, and saved articles. Helps readers capture, organize, and revisit what they read across the open web.
2. **Slax Note** — A note-taking app designed for capturing thoughts and structuring knowledge.

Together, Slax Reader and Slax Note form a complete **read → think → write** loop for individuals who treat reading as input to creative work.

> ❓ TODO: 上面的 product description 是基于公开信息的合理推测。Luca 请改写成 Slax 官方一句话定位。

### Slax vs Slax Reader vs Slax Note

- **"Slax"** can refer to either the company or the brand.
- When discussing both the company and a specific product in the same context, use **"Slax"** for the company and **"Slax Reader"** / **"Slax Note"** for products.
- It's not necessary to always say the full product name — context determines usage.

**Correct examples:**

- "Slax Reader is a modern reader for the open web."
- "Slax is an AI-native productivity company."
- "Slax has two products: Slax Reader and Slax Note."

---

## Positioning Pillars

> ❓ TODO: 从下面 5 根候选支柱里挑 3-5 根，或重写。每根支柱就是写文档时可以挂的一个"卖点钩子"。Warp 用了 5 根（House of agents / Integrated control plane / Easy to start, deeply configurable / Collaborative by design / Developer in control）。

When writing about Slax products or features, tie back to at least one of these positioning pillars:

1. **Reading as creative input** — Slax treats reading not as consumption, but as raw material for thinking and writing. Every Reader feature serves the eventual output.

2. **Beautiful by default, customizable when you want** — Slax products work elegantly out of the box but expose deep customization for power users.

3. **Personal knowledge stays personal** — Slax respects user data sovereignty. No surveillance, no ad targeting, no training on user content without explicit consent.

4. **Cross-language by design** — Built for readers and writers who work fluently in Chinese and English (and more), not as an afterthought.

5. **Calm software** — Slax avoids manipulative design patterns: no streaks, no notifications fishing for re-engagement, no infinite scroll traps.

---

## Slax Terminology and Capitalization

> Moved to `.agents/references/terminology.md` (machine-readable, consumed by
> `style_lint`). The operational source of truth for brand casing is
> `slax-home/CLAUDE.md` "品牌与大小写规则".

---

## Target Audience

> ❓ TODO: 写出 Slax 的目标用户画像。Warp 的目标是 "Professional Developers" —— 单一锐利。Slax 用户更可能分层（创作者 / 学者 / 开发者 / 普通深度阅读者）。建议先选一个 primary persona。

**Primary persona (TBD):** _[Description of who Slax is for. Example: "Bilingual knowledge workers who read 1+ hours per day across Chinese and English sources, and who treat reading as input to writing or research."]_

**Secondary personas (TBD):** _[Other groups Slax serves but doesn't optimize for first.]_

---

## Messaging by Audience

> ❓ TODO: 不同入口（独立站首页 / App Store / 中文社交媒体 / 海外 Twitter）的口径侧重。Warp 区分了开发者 / 工程经理 / Enterprise 三层。

- **Individual readers/writers**: _[Pitch focus — TBD]_
- **Power users / pro plan candidates**: _[Pitch focus — TBD]_
- **Chinese-market readers**: _[Pitch focus — TBD, may differ from EN]_

---

## Voice and Style

### Tone

- **Calm and confident**, not hyped or salesy.
- **Concise and concrete**, not abstract or buzzword-heavy.
- **Respectful of the reader's time** — every sentence should earn its place.

### Person

- Use **second person** ("you") in instructions and feature docs.
- Use **first person plural** ("we") sparingly, only when referring to Slax as a company in conceptual/narrative content. ("We designed Slax Reader to...")
- Avoid first person singular ("I") in product docs.

### What to avoid

- Generic AI buzzwords: "leverage AI", "AI-powered", "next-generation", "revolutionary"
- Hype without substance: "amazing", "mind-blowing", "game-changer"
- Manipulative urgency: "Don't miss out", "Limited time"
- Apologetic hedging: "We hope this helps", "Hopefully"

---

## Writing Guidelines

### Structure

- Lead with what the user can accomplish, not what the feature is.
  - ✅ "Save any web page to your Inbox with one click."
  - ❌ "Slax Reader provides a feature called Capture that allows users to..."

### Comparison framing

> ❓ TODO: Slax 是否要主动对比竞品（Readwise / Matter / Reeder / Notion / Obsidian）？Warp 在 positioning 文件里基本不点名竞品。建议同样克制 —— 但术语层面可能需要"我们和 X 不同"的内部对照表用于内部审稿。

### Examples and screenshots

- Include screenshots for first-time-experience flows (quickstart pages).
- Avoid screenshots in reference pages unless visual identification is required (the UI changes faster than text docs).

---

## Problem Framing

> ❓ TODO: Slax 解决的核心痛点是什么？这一节决定了所有 conceptual 页的开篇。Warp 的版本：开发者花太多时间在终端"做苦力"（运行命令、grep 日志），而不是创造价值。

**Slax's framing (draft):**

Knowledge workers read more than ever — but most reading tools optimize for **collecting** (save it for later) rather than **using** what was read. Articles pile up in read-it-later apps, never revisited. Highlights exported to Notion get buried. The gap between "I read that interesting thing" and "I can find it when I need it" keeps widening.

Slax Reader closes that gap by treating reading as **input to creative work**, not as a consumption pipeline.

---

## Slax's Point of View

> ❓ TODO: Slax 的 hot takes / 价值观立场。Warp 的版本：开发者应该被增强而非替代；agent 是工具不是替代品。Slax 候选立场：

- **Reading should serve writing, not replace it.**
- **Personal knowledge belongs to the person, not the platform.**
- **Calm beats engaging.** Slax does not optimize for daily active users at the cost of user wellbeing.
- **Cross-language is a first-class feature**, not a localization afterthought.

---

## Consumer Value Proposition

> ❓ TODO: 一句话浓缩。Warp 是 enterprise B2B，所以有 Enterprise Value Prop 一节。Slax 是消费者产品，对应的应该是 Consumer Value Prop。

**Draft:** "Slax is the calm reading and note-taking environment for people who treat reading as raw material for what they make next."

---

## How this file is consumed

- 喂给 `.agents/skills/draft_*` 系列 skill 作为 brand context
- `style_lint` 读取里面的术语表 → 自动 lint 文档
- 写新文档前应人工读一遍，确保叙事方向对齐
