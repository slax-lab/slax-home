# Plan: Read-Later 25 年进化史 + 产品全景 hub（改造 /reader/alternatives/）

## Context

### 来源
Luca 的脑洞：做一个 read-later / bookmarklet 全产品落地页，列出所有出现过的产品 + 历史 + 创始人 + 现状，放到 slax.com 用于 SEO。

### 调整后的定位
直接做"全产品历史百科"会让单页过于臃肿，但 Slax Reader 已经有 7 个 head-to-head alternatives 页（[pocket](src/content/reader-alternatives/pocket.mdx)、[instapaper](src/content/reader-alternatives/instapaper.mdx)、[readwise-reader](src/content/reader-alternatives/readwise-reader.mdx)、[omnivore](src/content/reader-alternatives/omnivore.mdx)、[cubox](src/content/reader-alternatives/cubox.mdx)、[matter](src/content/reader-alternatives/matter.mdx)、[goodlinks](src/content/reader-alternatives/goodlinks.mdx)）+ 一篇 [read-later-comparison-matrix-2026.mdx](src/content/blog/read-later-comparison-matrix-2026.mdx) 博客覆盖主流对手。

把脑洞重定位为 **"Read-Later 25 年进化史 + 产品全景 hub + 加深现有 alternatives 网"**：

1. **Hub 页本身**切入未被竞争的 informational 关键词（"history of read later apps"、"what happened to Readability"、"bookmarklet origin"），和现有 alternatives 的 transactional 关键词形成互补
2. **新增 5 个 head-to-head 子页**（Raindrop / Wallabag / Karakeep / Diigo / Hypothesis）补齐主流对手清单，从 7 个扩到 12 个
3. **Hub 形成内链中枢**：把现有 7 个 + 新增 5 个 alternatives 子页都当作出口链接，聚合而非分散 SEO 信号
4. **bookmarklet 起源 + 创始人/收购故事**这个角度差异化（rarely written elsewhere），形成内容护城河
5. 已死的小产品（Readability / Springpad / Tabbles / Quote.fm）只在历史叙事 + 状态索引里 mention 一笔，不立独立子页

### 一次性完成所有工作
按 Luca 决策：不分阶段，一次性把 hub 页 + 5 个新子页全部写完。总工作量约 20-28 小时（hub 8-12 小时 + 5 × 2.5 小时新子页）。

---

## Decisions Locked

| 维度 | 选择 |
|---|---|
| 定位 | 历史叙事 + 产品 hub（informational 主，transactional 次） |
| URL | 改造 `/reader/alternatives/`（不新增独立 URL，保留现有 7 个 head-to-head 子页 + 新增 5 个） |
| 覆盖范围 | 产品全景 35-50 个。Featured（hub 内深写 + 有 alternatives 子页）12 个：现有 7 + 新增 5。Notable（hub 内 mention 40-70 字 或 仅在状态表出现）23-38 个 |
| 结构 | 上层时间线叙事（3 段：1996-2008 / 2008-2018 / 2019-2026）+ 下层 4 状态索引（Active / Acquired / Discontinued / Pivoted）+ 底部现有/新增 alternatives 卡片网格 |
| 新增 head-to-head 子页 | 5 个：Raindrop / Wallabag / Karakeep / Diigo / Hypothesis |
| 一并完成 | hub 页 + 5 个新子页一次性发布，不分阶段 |

---

## Files to Modify / Create

### 必改
1. **[src/pages/reader/alternatives/index.astro](src/pages/reader/alternatives/index.astro)** — 当前是简单列表（73 行 markup + 100 行 style），升级为长 hub 页。保留现有 `entries.map(...)` 卡片网格作为底部 section，新增 hero / 时间线 narrative / 状态索引 sections。

### 必新增（hub 页相关）
2. **`src/pages/og/reader-alternatives.png.ts`** — 按 [CLAUDE.md](CLAUDE.md) 强制规则，每个新页面必须有专属 OG 图。调用 `renderOg({ eyebrow, title, accentWord })`。

### 必新增（5 个新 alternatives 子页）
3. **`src/content/reader-alternatives/raindrop.mdx`** — Slax Reader vs Raindrop.io。角度：Raindrop 是 bookmarks-first，Slax 是 reading-first；UI 极简对比；定价（Raindrop $28/yr Pro vs Slax 免费 + Pro 可选）；2013 起，Mussabekov Rustem 独立运营。
4. **`src/content/reader-alternatives/wallabag.mdx`** — Slax Reader vs Wallabag。角度：Wallabag 是 self-hosted FOSS，需要技术能力；Slax hosted、零运维、免费层即可使用；适合"想自托管又懒得维护"的过渡用户。
5. **`src/content/reader-alternatives/karakeep.mdx`** — Slax Reader vs Karakeep（fka Hoarder）。角度：Karakeep 也是 self-hosted 但带 AI（embedding 搜索），新势力；Slax 同样有 AI 但不需要部署。
6. **`src/content/reader-alternatives/diigo.mdx`** — Slax Reader vs Diigo。角度：Diigo 偏研究/教育市场（高亮 + 协作），Slax 偏个人阅读 + 终身归档；定价（Diigo $40/yr）；2006 起。
7. **`src/content/reader-alternatives/hypothesis.mdx`** — Slax Reader vs Hypothesis。角度：Hypothesis 是 web annotation 公共层，非 read-later 严格意义；适合学术；和 Slax 互补，不直接竞争——但搜索流量上常被混搭。说明"如果你需要的是 X，选 Hypothesis；如果是 Y，选 Slax"。

### 必新增 OG 图（5 个新子页）
8. **`src/pages/og/reader-alternatives/raindrop.png.ts`** 等 5 个 — 按现有 alternatives OG 图模式（找现有任一例子复用）。

### 不改
- 现有 7 个 reader-alternatives 子页内容不动
- [src/components/Nav.astro](src/components/Nav.astro)（`/reader/alternatives/` 入口已在）
- content schema（`readerAlternatives` collection 现有 frontmatter 字段够用）
- 主站根路径任何文件

---

## Hub 页内容大纲

### Hero（约 100 字）
- **H1**: `Read-Later Apps: A Complete History & 2026 Landscape`
- **Eyebrow / Mono label**: `THE READ-LATER STORY · 1995—2026`
- **Lede**（serif italic, ~80 字）: From the first `javascript:` bookmarklets in the late 1990s to AI-powered readers in 2026 — three decades of saving the web. The founders, the acquisitions, the shutdowns, and what's still standing today.

### Section 1: The Origin Era (1995-2008) — 约 700 字
**Featured 介绍（深写）**：
- **Bookmarklets** — Brendan Eich 1995 年设计 JavaScript 时同步发明 `javascript:` URL（Eich 公开表示"intended that javascript: URLs could be used as any other kind of URL, including being bookmark-able"）。Steve Kangas 1998-04-09 注册 bookmarklets.com，"bookmarklet"这个词由此诞生，几个月内积累 100+ 实用脚本
- **del.icio.us / Delicious** (2003, Joshua Schachter → Yahoo 2005 → AVOS Systems 2011 → Science Inc 2014 → Pinboard 收购残值 2017 → 实质死亡)
- **Read It Later** (2007, Nate Weiner，下段成为 Pocket)
- **Instapaper** (2008, Marco Arment — Tumblr CTO 业余项目)

**Mention（叙事内一笔带过）**：Pinboard 早期（2009）、Furl (2003-2009)、Diigo 早期 (2006)、Magnolia、StumbleUpon

### Section 2: Mobile + Acquisition Era (2008-2018) — 约 900 字
**Featured 介绍（深写，含链接到 alternatives 子页）**：
- **Pocket**（Read It Later → 2012 改名 → 2017 Mozilla 收购 → 2025-07 shutdown，链接 [/reader/alternatives/pocket/](src/content/reader-alternatives/pocket.mdx)）
- **Instapaper**（Pinterest 2016 → Postlight 2018 buyback → Brian Donohue 2020 indie → 至今活跃，链接 [/reader/alternatives/instapaper/](src/content/reader-alternatives/instapaper.mdx)）
- **Readability**（2009 Arc90 fork from Apple Safari Reader → 2016 service shutdown → Mercury Web Parser 接手 → 2019 Mercury also dead by Postlight）
- **Springpad**（2008-2014 死亡，"Evernote killer" 故事）
- **Pinboard**（2009, Maciej Cegłowski — 收费抗住了 Delicious 倒下的迁移潮，至今活）
- **Raindrop.io**（2013, Mussabekov Rustem，链接 `/reader/alternatives/raindrop/`）

**Mention**：Diigo (2006)、Stache、Plumbr、Quote.fm、Read & Trust、ReadKit (Mac aggregator)

### Section 3: Consolidation & AI Era (2019-2026) — 约 800 字
**Featured 介绍（深写，含链接）**：
- **Matter**（2020, Ben Springwater & co，链接 [/reader/alternatives/matter/](src/content/reader-alternatives/matter.mdx)）
- **Reader by Readwise**（2022, Tristan Homsi & Daniel Doyon，链接 [/reader/alternatives/readwise-reader/](src/content/reader-alternatives/readwise-reader.mdx)）
- **Omnivore**（2022 → 2024-11 ElevenLabs 收购 + 关停 hosted → 开源 fork 散落，链接 [/reader/alternatives/omnivore/](src/content/reader-alternatives/omnivore.mdx)）
- **Cubox**（中国团队，AI summarization first-mover，链接 [/reader/alternatives/cubox/](src/content/reader-alternatives/cubox.mdx)）
- **GoodLinks**（Apple-only, one-time purchase, indie，链接 [/reader/alternatives/goodlinks/](src/content/reader-alternatives/goodlinks.mdx)）
- **Wallabag**（2013 起 self-hosted FOSS，链接 `/reader/alternatives/wallabag/`）
- **Karakeep**（fka Hoarder, 2024 self-hosted + AI 新势力，链接 `/reader/alternatives/karakeep/`）
- **Diigo**（2006，从 read-later 转型为研究/教育工具，链接 `/reader/alternatives/diigo/`）
- **Hypothesis**（2011，web annotation 公共层，链接 `/reader/alternatives/hypothesis/`）
- **Slax Reader**（2024+，自家产品 — 自然衔接 CTA）

**Mention**：Mymind, Glasp, Refind, Heyday (RIP 2024), Kortex, Pinboard (continued), Are.na (lateral relative)

### Section 4: The Full Landscape — 4 Status Index Tables（约 1500 字总）

每张表是一个 markdown table，列：Product · Founded · Founder/Company · Status Detail (≤ 25 词)。每张表内按字母排序。

#### 4.1 Active (currently maintained) — 22 行

| Product | Founded | Founder / Company | Status Detail |
|---|---|---|---|
| Anybox | 2020 | Anybox Inc | macOS/iOS bookmarks + read-later, indie paid app |
| Cubox | 2020 | Chinese indie team | Cross-platform AI summaries, freemium, CJK markets |
| Dropmark | 2012 | Oak Studios | Visual collections + bookmarks, indie paid app |
| GoodLinks | 2019 | Ngoc Luu | Apple-only, one-time purchase, no subscription |
| Glasp | 2020 | Kazuki Nakayashiki & Kei Watanabe | Social highlighter, Chrome extension, freemium |
| Hypothesis | 2011 | Dan Whaley | Web annotation public layer, FOSS, nonprofit |
| Instapaper | 2008 | Marco Arment | Independent again since 2020 under Brian Donohue / Instant Paper Inc |
| Karakeep | 2024 | MohamedBassem | fka Hoarder, self-hosted FOSS with AI search |
| LinkAce | 2019 | Kovah | Self-hosted FOSS bookmark manager (PHP/Laravel) |
| Linkding | 2019 | Sascha Ißbrücker | Self-hosted minimalist bookmark manager (Python) |
| Linkwarden | 2022 | Daniel31x13 | Self-hosted FOSS w/ archives + AI tags (Next.js) |
| Matter | 2020 | Ben Springwater & co | Premium reader w/ AI + curation, $7.99/mo |
| Mymind | 2019 | Tobias van Schneider & co | AI bookmarks for "second brain", paid only |
| Notion Web Clipper | 2018 | Notion Labs | Built-in Notion feature, web → Notion page |
| Pearltrees | 2009 | Patrice Lamothe (France) | Visual collections, freemium |
| Raindrop.io | 2013 | Rustem Mussabekov (Kazakhstan) | Bookmarks-first, indie, $28/yr Pro |
| Readwise Reader | 2022 | Tristan Homsi & Daniel Doyon (Readwise) | Premium reader bundled with Readwise highlights |
| Refind | 2014 | Alexander Sablowski & Frederik Pfeiffer | Daily curated 5 links + read-later, freemium |
| Shiori | 2017 | Radhi Fadlillah | Self-hosted FOSS bookmark/archive (Go) |
| Slax Reader | 2024 | Slax Lab | AI summaries + permanent archive, free + Pro tier |
| Toby | 2017 | Toby team | Browser tab/workspace manager, lateral but read-later-adjacent |
| Wallabag | 2013 | Nicolas Lœuillet | Self-hosted FOSS read-later (PHP/Symfony), fka Poche |

#### 4.2 Acquired-Operating — 0-1 行 (acquired and still running under new ownership)

This bucket is intentionally narrow: most acquired products in this category either return to indie status (Instapaper) or get shut down (Pocket / Omnivore). At time of writing, no read-later product fits cleanly here. Render as a one-paragraph note rather than an empty table, e.g. *"Most acquired read-later products eventually returned to independent ownership or were shut down. Examples of acquisition-then-independence below."* — then point to the Pivoted/Discontinued tables.

#### 4.3 Discontinued — 15 行

| Product | Founded | Founder / Company | Status Detail |
|---|---|---|---|
| Delicious / del.icio.us | 2003 | Joshua Schachter & Peter Gadjokov | Yahoo→AVOS→Science Inc→Pinboard 2017-06; effectively dead |
| Heyday | 2020 | Samiur Rahman & co | AI memory + read-later, shut down 2024 |
| Magnolia / Ma.gnolia / Gnolia | 2006 | Larry Halff | Catastrophic data loss 2009-01; shut down end of 2010 |
| Mercury Web Parser / Reader | 2016 | Postlight (Rich Ziade, Paul Ford) | Hosted API shut down 2019-04-15; OSS lives on |
| Omnivore (hosted) | 2022 | Jacks Tan & co | ElevenLabs acquired 2024-11; hosted shut down; FOSS forks survive |
| Pocket | 2007 | Nate Weiner (Read It Later → Pocket 2012-04-17) | Mozilla acquired 2017-02-27; shut down 2025-07-08; data deleted 2025-11-12 |
| Push Pop Press | 2009 | Mike Matas & Kimon Tsinteris | Acqui-hired by Facebook 2011-08; tech became Instant Articles |
| Quote.fm | 2011 | Hamburg founders [unverified] | German read-later w/ social; shut down 2013-04 |
| Read & Trust | 2011 | Shawn Blanc, Patrick Rhone et al | Curation network + weekly newsletter; wound down mid-2010s |
| Readability | 2009 | Arc90 (Rich Ziade et al) | Bookmarklet shut 2016-09-10; full shut 2016-12-10; OSS lives on as Reader View |
| Spool | 2011 | Avichal Garg & Curtis Spencer | Acqui-hired by Facebook 2012-07; never integrated |
| Springpad | 2008 | Spring Partners Inc | Failed monetization; shut down 2014-06-25 |
| Stache | 2014 | d3i Ltd | macOS Sierra broke iCloud sync; abandoned ~2016 (current stache.app is unrelated) |
| Trove | 2011 | Washington Post Labs [unverified] | News aggregator; defunct |
| Zite | 2010 | Vancouver team | CNN 2011 → Flipboard 2014 → shut down 2015-12-07 |

#### 4.4 Pivoted — 7 行 (still alive but moved to a different primary category)

| Product | Founded | Founder / Company | Status Detail |
|---|---|---|---|
| Are.na | 2014 | Charles Broskoski et al | Pivoted from generic bookmarker to creative-research network |
| Diigo | 2006 | Wade Ren [unverified] | Pivoted from social bookmarking to research/education tool, ~9M users |
| Furl | 2003 | Mike Giles | LookSmart 2004-09; transferred to Diigo 2009-03 |
| Pinboard | 2009 | Maciej Cegłowski | Pivoted from social to paid archival service; bought Delicious 2017 |
| Read It Later | 2007 | Nate Weiner | Renamed to Pocket 2012-04-17 (Pocket itself died 2025-07) |
| ReadKit | 2013 | Webin / Webin Cloud | Pivoted from multi-service read-later aggregator to pure RSS reader |
| StumbleUpon | 2001 | Garrett Camp, Geoff Smith, Justin LaFrance, Eric Boyd (U of Calgary) | eBay 2007 → buyback 2009 → Mix.com 2018-06; Mix still alive |

**Total visible**: 22 (Active) + 0 (Acquired-Op) + 15 (Discontinued) + 7 (Pivoted) = **44 行**。落在目标范围 35-50 内 ✓。Hub 页叙事段落里另外 mention 的 bookmarklets / Furl / Magnolia / Spool / Push Pop / Zite 等出现在两处（叙事 + 状态表），不重复计数。

### Section 5: Where Slax Reader Fits（约 200 字 + 卡片网格）
- 上半部分：1 段 Slax Reader 在这个全景里如何定位（永久归档 + AI + open-source + 不订阅）
- 下半部分：保留现有 `entries.map(...)` 卡片网格，含 12 个 head-to-head 链接（现有 7 + 新增 5）

### Footer: Sources & methodology（约 200 字）
- 列出 5-8 个最关键的引用（每个产品 Wikipedia / 官方博客 / TechCrunch 收购报道），剩余来源放折叠 `<details>` 展开
- "How we maintain this page" 一段：每年 Q1 全面更新 + 重大事件触发 + `Last updated: YYYY-MM-DD`

**Hub 页总字数预算**：4500-6500（含 4 个状态表的产品行）

---

## 5 个新 alternatives 子页大纲

每个子页结构参考现有 [pocket.mdx](src/content/reader-alternatives/pocket.mdx) / [instapaper.mdx](src/content/reader-alternatives/instapaper.mdx) 模板。

### 通用 frontmatter
```yaml
title: "<Competitor> Alternative: Slax Reader — <one-line angle>"
competitor: "<Competitor>"
description: "<160 chars summary>"
updatedDate: 2026-05-07
```

### 通用结构（每个子页 1500-2200 字）
1. **Hero**：H1 + 一句话定位
2. **TL;DR 表格**：3-4 列 feature 对比（Slax / Competitor / Notes）
3. **背景**：竞品的历史 + 当前状态（如还活、价格、平台）
4. **Where they win**：诚实列竞品的优势
5. **Where Slax fits better**：Slax 的差异化
6. **Migration / when to switch**：如适用
7. **Bottom line**：1 段总结 + CTA

### 5 个子页的角度
| 子页 | 核心差异化角度 | 目标读者画像 |
|---|---|---|
| `raindrop.mdx` | Bookmarks-first vs reading-first；Raindrop 强在收藏管理，弱在长文阅读体验 | 收藏夹用户、bookmarks power user |
| `wallabag.mdx` | Self-hosted FOSS vs hosted；运维成本 vs 数据主权 | "想自托管但懒得维护"的开发者 |
| `karakeep.mdx` | Self-hosted + AI 新势力 vs hosted + AI；类似立场不同执行 | 关注 AI features 的自托管爱好者 |
| `diigo.mdx` | 研究/教育市场 vs 个人阅读；高亮协作 vs 终身归档 | 学术、教师、研究人员 |
| `hypothesis.mdx` | Web annotation 公共层 vs 私人阅读库；互补而非竞争 | 学术注释 + 私人阅读双需求用户 |

---

## SEO Meta（hub 页）

| 字段 | 内容 |
|---|---|
| Title (≤60 chars) | `Read-Later Apps: A Complete History & 2026 Landscape` |
| Description (≤160) | `From 1995 javascript: bookmarklets to 2026 AI readers — the complete history of read-later apps, who built them, and what happened to Pocket and Readability.` |
| OG image | 新做 `/og/reader-alternatives.png`，eyebrow=`THE READ-LATER STORY`, accent word=`History` |
| Breadcrumbs | Home → Slax Reader → Alternatives |
| 内链出 | hub 页内 12 个 featured 产品 → 12 个 alternatives 子页（绝对路径 `/reader/alternatives/{slug}/`） |
| 外链出 | Wikipedia / TechCrunch / 创始人博客（`rel="noopener external"`） |

**目标关键词**（按优先级）：
1. `history of read later apps`（informational, low competition）
2. `what happened to Readability` / `what happened to Pocket`（informational, event-driven, 高搜索量）
3. `read-later apps comparison 2026`（commercial intent，与现有 [read-later-comparison-matrix-2026.mdx](src/content/blog/read-later-comparison-matrix-2026.mdx) 互补）
4. `bookmarklet history` / `bookmarklet origin`（long tail, 几乎无竞争）
5. `<Raindrop|Wallabag|Karakeep|Diigo|Hypothesis> alternative` / `Slax Reader vs <X>`（5 个新子页各自的 transactional 关键词）

---

## Visual / Component Strategy

- **复用**：[Base.astro](src/layouts/Base.astro) layout、现有 Reader serif typography（`var(--serif)` + `letter-spacing: -0.02em`）、`var(--rule)` / `var(--ink-soft)` token、现有 alternatives 卡片样式
- **新建（inline，不抽组件）**：
  - Hero block + mono eyebrow `THE READ-LATER STORY · 1996—2026`
  - 3 个时间线 narrative section（pure prose + section heading）
  - 4 个 status index table（HTML `<table>` + 简单 CSS）
- **不做**（YAGNI）：
  - SVG horizontal timeline 可视化
  - 横向 timeline JS 组件（违反 Astro 默认零 JS）
  - 卡片式产品网格 for status index（HTML table 更紧凑、SEO 更友好）

### 视觉风格
保持现有 alternatives index 的 minimalist serif 风格。新增 status table 用 mono 字体做 column header，serif 做产品名。

### 移动端适配
- 时间线 narrative：默认即可
- Status index table：< 640px 切换为 `display: block` 列表布局，避免横向滚动
- Hero H1：沿用 `clamp(1.9rem, 3vw, 2.5rem)`

---

## 维护策略

- **更新节奏**：每年 Q1 全面更新一次（新产品 / 死产品 / 收购变动）
- **事件触发**：重大事件（另一个 Pocket 级别的 shutdown / 主流产品大改版 / Slax 自家重大升级）触发增量更新
- 在 `index.astro` 顶部声明 `const LAST_UPDATED = 'YYYY-MM-DD'`，渲染到页脚 `Last updated: YYYY-MM-DD` + 注入 `<Base>` 的 JSON-LD `dateModified`，避免搜索引擎判断过时

---

## Verification（验收标准）

启动开发服务器后人工 + 自动检查：

1. **本地预览** `pnpm dev` → `http://localhost:4321/reader/alternatives/` 渲染：
   - 总字数 4500-6500
   - 时间线 3 段叙事完整
   - 4 个状态表完整、产品总数 40-55
   - 底部 12 个 head-to-head alternatives 卡片网格（现有 7 + 新增 5）

2. **5 个新子页可访问**：
   ```bash
   curl -I http://localhost:4321/reader/alternatives/raindrop/
   curl -I http://localhost:4321/reader/alternatives/wallabag/
   curl -I http://localhost:4321/reader/alternatives/karakeep/
   curl -I http://localhost:4321/reader/alternatives/diigo/
   curl -I http://localhost:4321/reader/alternatives/hypothesis/
   # 全部 200 OK，且每个子页字数 1500-2200
   ```

3. **现有 7 个子页不破坏**：
   ```bash
   curl -I http://localhost:4321/reader/alternatives/{pocket,instapaper,readwise-reader,omnivore,cubox,matter,goodlinks}/
   # 全部 200 OK
   ```

4. **内链**：
   - hub 页时间线段落里所有 featured 产品（12 个）有 link 到对应 `/reader/alternatives/{slug}/`
   - status index table 里的产品如有 alternatives 子页，应链接到子页

5. **OG 图**：
   - `pnpm build && pnpm preview` 后，`/og/reader-alternatives.png` + 5 个新子页 OG 各自返回 1200×630 PNG
   - 在 Slack / Discord / Twitter card validator 测试 hub 页 + 1-2 个新子页的预览图

6. **构建**：
   - `pnpm build` 不报错
   - `pnpm lint` 通过（biome check）
   - `dist/sitemap-index.xml` 包含 `/reader/alternatives/` 和 5 个新子页 URL，且 `lastmod` 是今天

7. **响应式 + 视觉**：
   - 375px (iPhone SE) 和 1440px (desktop) 都能正常显示
   - 4 个 status table 在 mobile 下不横向滚动
   - 没有违反 [CLAUDE.md](CLAUDE.md) 品牌大小写规则（Slax / iOS / GitHub 等保持混合大小写）

8. **SEO 健康度**：
   - View source 确认 `<title>` / `<meta name="description">` / `og:image` / JSON-LD breadcrumbs 都在
   - Lighthouse SEO score ≥ 95（accessibility ≥ 90）

9. **内容审核**（关键，AI 容易出错处）：
   - 所有创始人姓名 / 收购年份 / 公司名拼写正确（重点核对 Marco Arment, Joshua Schachter, Nate Weiner, Mussabekov Rustem, Maciej Cegłowski, Brian Donohue 等）
   - Pocket shutdown 日期（2025-07）、Omnivore 关停日期（2024-11）、Readability sunset 日期（2016 service / 2019 Mercury）准确
   - 所有外链可访问（不是死链）

---

## Out of Scope（明确不做）

- 给 mention 级别产品（Heyday / Mymind / Are.na 等）写独立 alternatives 子页
- 多语言版本（中文版 / 日文版）
- 交互式可视化时间线（SVG / D3 / 横向滚动）
- 用户提交产品建议的功能
- 把 hub 页搬到主站根路径 `/read-later-history/`
- 修改现有 7 个 alternatives 子页的内容
- 写一篇配套博客（hub 页本身已经是长内容，不需要再拆博客）
- 翻译现有博客 [read-later-comparison-matrix-2026.mdx](src/content/blog/read-later-comparison-matrix-2026.mdx) 或合并入 hub
- 更新 [src/components/Nav.astro](src/components/Nav.astro)（现有 `/reader/alternatives/` 入口已在，加导航 link 反而冗余）
- 任何主站 / Note 子站改动

---

## Appendix: Narrative Reference Material（实施时引用，写完即可删除）

实施 AI 写时间线 narrative section（Section 1/2/3）时，引用以下 verified facts。所有日期/创始人/收购金额都已通过 Wikipedia / TechCrunch / 官方博客交叉核对（截至 2026-05-07）。带 `[unverified]` 的字段表示无法从主流英文来源确认，写文时应规避或标注 "reportedly"。

### A. Bookmarklet origin (~1995-1998)
- `javascript:` URL scheme — Brendan Eich 1995 年发明 JavaScript 时同步设计的，"intended that javascript: URLs could be used as any other kind of URL, including being bookmark-able"。LiveScript 1995-09 在 Navigator 2.0 beta 首发，1995-12 改名 JavaScript。
- "Bookmarklet" 一词 — Steve Kangas 创造，他 1998-04-09 注册了 bookmarklets.com，从 Netscape JavaScript Guide 启发，几个月内积累 100+ bookmarklet。
- 替代术语 "favelets" — Tantek Çelik 2001-09-06 使用过，但未流行。

### B. 早期社交书签 + web clipping (2003-2014) — verified facts

| Product | Key verified facts |
|---|---|
| Delicious | 2003-09 Joshua Schachter & Peter Gadjokov 创立；首个流行 user-tags 书签服务。Yahoo 收购 2005-12-09（Schachter 后来说价格"definitely less than $30M"）。AVOS Systems（YouTube 出来的 Chad Hurley + Steve Chen）2011-04-27 收购。Science Inc. 2014-05-08 接手。Delicious Media 2016-01-11 接手。Pinboard 2017-06-01 收购，2017-06-15 转为 read-only。 |
| Furl | 2003-01 Mike Giles 创立。LookSmart 2004-09-23 收购（约 1.6 万用户）。2009-03 transferred to Diigo（约 100 万用户），LookSmart 退出社交书签。 |
| Ma.gnolia / Gnolia | 2006 Larry Halff 创立，强调 design + 开放标准 + 页面快照。**2009-01-30 数据库 catastrophic 损坏**，备份在同一系统上，2009-02-17 Halff 确认数据无法恢复。2009-09-22 以邀请制小服务 relaunch；renamed Gnolia；2010 年底关停。 |
| StumbleUpon | 2001-11 Garrett Camp、Geoff Smith、Justin LaFrance、Eric Boyd 在 Calgary 大学创立。eBay 2007-05 收购 >$75M。创始人 2009-04 buy back $29M（Ram Shriram 等参投）。2009 年其 US referral 流量超过 Facebook + YouTube + Twitter + Digg + Reddit + Pinterest 之和。**2018-06 关停，迁移到 Mix.com**（Camp 在 Expa 工作室的另一项目）。 |
| Diigo | 2006-07 launch。结合社交书签 + 高亮 + 便签 + 全页归档。2009 继承 Furl 用户。**2026 仍运营**，Reno NV 总部，自称 9M+ 用户。从社交书签转向研究 / 注释 / 教育（Educator Accounts 产品线）。Founder 名字 `[unverified]`（一些来源说是 Wade Ren 但未经 Wikipedia 确认）。 |
| Read It Later | 2007-08 Nate Weiner Firefox extension launch（"two buttons … no web service, no sync"）。**2008-10 重建为 cross-browser syncing service**。原本 paid + free tier。**2012-04-17 改名 Pocket，免费化、重设计**，几个月内用户从 ~4M 翻倍到 ~8M。Idaho 地理标记 `[unverified]`。 |
| Instapaper | **2008-01-28** Marco Arment 首发（当时是 Tumblr CTO，Tumblr 2007-02 launch；Arment 2010-09 离开 Tumblr 全职 Instapaper）。最初是火车通勤阅读用的 bookmarklet。Betaworks 2013 收购大头股权。Pinterest 2016-08 收购。Postlight 2018-07 buyback（独立交易完成 2018-08-06）。**2026 仍运营**；2025-07 Kobo 宣布 Instapaper 替代 Pocket 成为 Kobo e-reader 默认 read-later。 |
| Pinboard | 2009-07 Maciej Cegłowski 创立（离开 Yahoo / Delicious 之后）。刻意定位为付费、无广告、无 VC、anti-social 替代品；初始注册费 ~$3，结构化逐步上涨。**2015-01 切到 $11/yr 新账户**。2017 收购 Delicious 全部数据。Cegłowski 自述："social bookmarking for introverts"。 |
| Springpad | 2008 Spring Partners, Inc. 创立（"positrons inc" 是误记）。Evernote 风格 notebook + 智能分类（扫描书条形码自动取封面 / 描述 / Amazon 价格）。融资约 $4.1M，峰值 5M+ 用户。**2014-05-23 宣布关停，2014-06-25 实际停服**。原因：未能开发出可行变现模型。提供了 JSON / 只读 HTML 导出 + 一键迁移 Evernote。 |
| Readability | 2009 Arc90 Lab 实验项目（Arc90 是 NYC 设计/工程咨询公司）。最初是 bookmarklet，去除文章页 clutter。**2011 readability.com 商业化**（$5/月，承诺 70% 收入给作者/出版商）。Apple Safari Reader 2010 license / derive 自 Arc90 开源 readability.js。**2016-09-10 bookmarklet 服务关停，2016-12-10 API 全停**。原因：发布商分账模型未达规模 + reader-mode 已被浏览器/专门 app 吸收。 |
| Quote.fm | 德国汉堡 read-later/social-reading startup。**2013-04 关停**（融资失败，"the numbers weren't convincing enough"）。品牌后被汉堡的 Elbdudler agency 接手（无对价）。创始人具体姓名 `[unverified]`，年份 2011 也仅经德语来源支撑。 |
| Stache | **2014-05** d3i Ltd 推出（Mac + iOS）。视觉书签 app，强调全页截图归档而非链接列表。**2016-11 macOS Sierra 破坏 iCloud sync 后 effectively abandoned**，开发者在 support 邮件中确认停止开发并从 App Store 下架。当前 stache.app 是另一开发者 Jon Schneider 的无关同名产品。 |
| Read & Trust | 独立写作者的 curation network（productivity / Apple / writing-craft niche）。**2011-04 推出每周付费 newsletter**，Shawn Blanc 主导组织，Patrick Rhone 等成员（Mike Vardy 关联）。具体关停日期 `[unverified]`，似乎是 2010s 中期成员各奔东西后悄然散场。 |
| Plumbr | **不是 read-later 产品** — 是爱沙尼亚 Java APM startup（2011 起，源自博士研究）。Splunk 2020-10 收购。**Plan 中要明确删掉，实施时不要写。** |

### C. 早期 API / aggregator（2010-2014）
- **ReadKit** 2013-01-07 launch，开发者 Webin（后改 Webin Cloud）。最初统一支持 Instapaper / Pocket / Readability + Google Reader（2013-07 关停后切到 Feedbin / Feedly / NewsBlur）。2026 仍活，已 pivot 为纯 RSS reader（支持 Instapaper / Pocket / Wallabag / Pinboard 作为 saved-articles 后端）。
- **Reeder** 瑞士开发者 Silvio Rizzi，iPhone 首发 2009，**Mac public beta 2010-11-30**。首个广泛使用的 iOS RSS reader 加 native send-to-Instapaper / Read It Later 集成（v2.2 around 2010）。Reeder 3 Mac 把 Instapaper 作为完整 sync source。
- **Flipboard** 2010-07 iPad launch，Mike McCue & Evan Doll 创立。
- **Zite** 2010 launch（Vancouver team），机器学习 topic models 个性化 reading magazine。CNN 2011 收购 >$20M。**2014-03 Flipboard 从 CNN 收购 Zite**，整合推荐引擎。**2015-12-07 关停**。
- **Push Pop Press** Mike Matas & Kimon Tsinteris 创立（前 Apple designers）。打造 iPad 交互书引擎，赋能 Al Gore "Our Choice" app（2011，Apple Design Award）。**Facebook 2011-08-02 收购**，Push Pop tech + team 成为 **Facebook Instant Articles（2015 launch）** 的基础。
- **Spool** 2011-10 TechCrunch Disrupt 推出，Avichal Garg & Curtis Spencer 创立。"Instapaper on steroids"，处理 video + rich media offline。2012-01 融资 $1M+（SV Angel / Felicis / Steve Chen）。**Facebook 2012-07-14 acqui-hire**，team 进 Facebook，底层 tech 据报告未集成。

### D. Pocket origin saga (2007-2025)
- 2007-08 Nate Weiner Read It Later Firefox extension（无 sync）
- 2008-10 重建 cross-browser syncing service
- 2012-04-17 rename Pocket，free-only，redesign，用户 4M → 8M
- **2017-02-27 Mozilla Corporation 收购 Read It Later, Inc.**（Mozilla 首个 strategic acquisition，价格未披露，Pocket 此前累计融资 $14.5M）
- **2025-05-22 Mozilla 宣布关停**，**2025-07-08 服务结束**，2025-10-08 export-only 终止，**2025-11-12 API + 数据全部删除**。Mozilla 官方理由："the way people use the web has evolved"。Pocket Premium 退款 2025-07-08 完成。官方文档 https://support.mozilla.org/en-US/kb/future-of-pocket

### E. Readability saga (2009-2019)
- 2009 Arc90 Lab 实验项目
- 2011 readability.com 商业化（$5/mo，70% 给作者）
- Apple Safari Reader 2010 license/derive 自 Arc90 readability.js
- **2016-09-10 bookmarklet 关停**，**2016-12-10 API 全停**
- Postlight（Paul Ford + Rich Ziade 联合创立，Ziade 之前是 Arc90 联合创始人）2016 推出 **Mercury Web Parser** 作为继任 API。Mercury Reader Chrome extension 把 parser 打包为浏览器 reading view。
- **2019-02-06 Postlight 宣布 Mercury Parser open-source**，**2019-04-15 Mercury 托管 API 关停**。Postlight Reader Chrome extension 还活了一段时间。
- 开源遗产：Mozilla 维护 fork 在 https://github.com/mozilla/readability，是 **Firefox Reader View** 引擎。Apple Safari Reader View 也 derive 自 Arc90。算法被移植到 Go (cixtor/readability) / Kotlin (Readability4J) / CLI (rdrview, readability-cli) 等多语言。

### F. Sources（hub 页 footer 引用，挑 5-8 个最关键的）
1. https://en.wikipedia.org/wiki/Bookmarklet
2. https://en.wikipedia.org/wiki/Pocket_(service)
3. https://en.wikipedia.org/wiki/Instapaper
4. https://en.wikipedia.org/wiki/Readability_(service)
5. https://en.wikipedia.org/wiki/Del.icio.us
6. https://en.wikipedia.org/wiki/Pinboard_(website)
7. https://blog.mozilla.org/en/mozilla/news/mozilla-acquires-pocket/ (2017-02-27)
8. https://support.mozilla.org/en-US/kb/future-of-pocket (2025-05-22 announcement)
9. https://techcrunch.com/2025/05/22/mozilla-is-shutting-down-read-it-later-app-pocket/

剩余 ~20 个 sources 折叠到 `<details>` 展开。完整 source 列表见 Agent 研究记录（实施时检索）。
