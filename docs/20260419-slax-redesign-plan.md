# Slax 官网重做方案

**日期**：2026-04-19
**作者**：Luca + Nix
**状态**：方向已定，架构决策已定，Claude Design 视觉源已落地，进入阶段 1 实施

---

## 背景

当前 slax.com 官网（Astro + Starlight monorepo）需要重做。技术栈保留，重做的是设计、信息架构、内容策略。

约束：
- 没有专职设计资源，不能依赖插画 / 3D / 复杂动效
- Luca 是资深写作者，文字能力是优势
- Slax 现有两款产品（Reader、Note），未来可能更多

---

## 现状问题清单（必须在新版中全部解决）

1. **首页极丑，没有价值**
   - 当前首页没有清晰的产品定位表达，无法承担"整个 Slax 的门面"的职责
   - 新版目标：首页 6 屏骨架（见下文），文字驱动，2 张截图，一句话定义 Slax

2. **Reader 页面碎片化**
   - 现在 Reader 有多个独立页面（features / pricing / download...），每个内容都很单薄
   - 新版：合并为一个长滚动单页，用锚点导航组织内容
   - alternatives 对比页是唯一例外（SEO 资产必须多页）

3. **全站品牌不统一**
   - 最刺眼的：左上角 logo 一会是 "Reader"、一会是 "Slax Home"，站点边界和品牌认知撕裂
   - 新版：**全站统一为 Slax 主品牌**，左上角永远是 Slax logo
   - Reader / Note 是产品模块，logo 下方 / 面包屑用产品名标识，不取代主 logo
   - 共享一套 design tokens、字体、间距、组件

4. **Note 没有整合进来**
   - 新版：Note 和 Reader 完全同构
   - 同样的 `/note/` 单页 + `/note/alternatives/` 对比多页结构
   - 首页给 Reader 和 Note 对等的展示位（屏 3 / 屏 4）

5. **Blog 样式丑且不统一**
   - Blog 目前是独立样式，和主站脱节
   - 新版：Blog 套用和主站相同的 design tokens，只是布局偏阅读（单栏、大字、行距宽）
   - 作为"Luca 是写作者"的差异化武器，Blog 的排版必须是全站最讲究的那一块

6. **🚨 Note 产品定位错误（最严重）**
   - 现状：`apps/note-home/src/content/docs/index.mdx` 把 Slax Note 写成"Intelligent Note-Taking / build personal knowledge base"，完全是 Notion / Bear 那一派的文字笔记定位
   - 事实：Slax Note 是**语音笔记产品**
   - 全站找不到 voice / audio / record / transcribe / 语音 / 录音 / 转写 任何一个词
   - 后果：老用户困惑、SEO 关键词全错、潜在用户根本不会把 Note 当候选
   - 新版必须从 Hero 第一行就说清楚：语音进、笔记出、AI 整理

7. **note-home 里还有中文版残留**
   - `apps/note-home/src/content/docs/zh/` 下有完整中文版
   - 按第 8 条工程原则（全站仅英文），重做时整个 `zh/` 目录删除

8. **🚨🚨 架构根源问题（决定上面 4 条能不能真正解决）**

   现状的 monorepo 结构是 **multi-site 模式**（三个独立 Astro + Starlight 项目 + 一个 shell 脚本把 dist 拼起来）：

   ```
   slax-home/
   ├── apps/
   │   ├── slax-home/        独立 Astro + Starlight 项目
   │   ├── reader-home/      又一个独立 Astro + Starlight 项目
   │   └── note-home/        又一个独立 Astro + Starlight 项目
   └── script/build.sh       手动 shell 把三个 dist/ 拼起来
   ```

   这个结构适用于"多团队、多设计、多节奏独立演进"的场景（主站 + 文档站 + 状态页那种）。Slax 官网是**一个品牌、一套设计、一个网站**，用 multi-site 结构等于把"官网切分"和"产品本体切分"搞混了。

   **这个架构直接产生问题 1、2、3、5**：
   - 三份 Header / Footer 组件 → logo 不可能统一
   - 三份 styles / design tokens → 视觉不可能统一
   - Starlight 把每个 mdx 强制渲染成独立文档页 → Reader 必然碎片化
   - 改一次颜色、一次 logo、一次字体，要改三份 → 没有人会坚持

   **不是 Luca 偷懒，是架构在逼你做不好**。

   **解法**：合并成**单一 Astro 项目**（详见下文"架构决策"章节）。

### 合并后的统一标准

合并成单一 Astro 项目后，"所有子站必须遵守"这种事情自动消失——因为只有一份代码：

- 一份 `src/components/Nav.astro`、`Footer.astro` → logo 不可能错乱
- 一份 `src/styles/tokens.css` → 配色字体间距全站一致
- 一份 `astro.config.mjs` → 部署、sitemap、robots 一次配置
- 删掉 `script/build.sh` → `astro build` 直接产出 `dist/`，无需手动粘合

---

## 架构决策（2026-04-19 确认）

### 从 multi-site monorepo → 单一 Astro 项目

**目标结构**：

```
slax-home/
├── src/
│   ├── components/         # Nav / Footer / Hero / MastheadCard / ProductCard / Scene / 按钮
│   ├── layouts/            # Base.astro
│   ├── styles/             # tokens.css + global.css
│   ├── content/
│   │   ├── blog/           # 博客 content collection
│   │   ├── reader-alternatives/  # Reader 对比页 collection
│   │   └── note-alternatives/    # Note 对比页 collection
│   └── pages/
│       ├── index.astro     # 主站首页
│       ├── about.astro
│       ├── 404.astro
│       ├── reader/
│       │   ├── index.astro         # Reader 单页（含 #features / #pricing / #download 锚点）
│       │   └── alternatives/
│       │       ├── index.astro     # 对比总览
│       │       └── [slug].astro    # 单篇对比（从 content collection 动态生成）
│       ├── note/                   # 同构
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
├── public/
│   └── fonts/              # 自托管 woff2
├── astro.config.mjs
└── package.json
```

### 同时移除 Starlight

Starlight 的核心价值是文档站特性（侧边栏、搜索、版本切换）。Slax 官网是营销站 + 博客 + 对比页 + 产品落地页，一个 Starlight 特性都不需要。

用**纯 Astro + content collection** 替代：内容维护更轻、样式更可控、build 更快、依赖更少。

**产品文档例外**：如果未来 Reader / Note 需要真正的开发者文档或使用手册，再用 Starlight 做独立的 `docs.slax.com` 子域名，不合并进官网。

### 为什么这个时机改架构特别划算

1. **设计正在重做**——顺手换地基，比"设计做完再改架构"省 3 倍时间
2. **内容量还小**——三个 app 的 mdx 文件加起来很少，迁移就一两天
3. **Claude Design bundle 是现成的参考实现**——CSS / HTML / 组件结构都已经搭好，照搬进 Astro 项目即可
4. **删掉 `script/build.sh`**——所有手工拼接脚本都是 architecture smell

### 为什么切分官网、保持产品本体独立是对的

判断"要不要拆 monorepo"的核心是**"这些模块之间要不要独立演进"**：

- **产品本体**（Reader 的 Vue + Rust、Note 的 TanStack Start + Cloudflare Workers）**需要独立演进**→ 独立仓库正确
- **官网的三个子区块**（首页 / Reader 页 / Note 页）**不需要独立演进**，应该共享设计语言 → 合并是对的

现在的结构是把"官网切分"和"产品切分"搞混了。合并后只是把"官网层"合回一个 Astro 项目，产品本体仓库不受影响。

---

## 设计方向决策

### 风格定位

**Granola 的形式 + Anthropic 的内核 + 写作者的文字底色**

- 形式上：极简、不卖弄、说人话、给截图就给截图
- 内核上：每段文案背后有"我们为什么这么做"的产品观
- 文字驱动型官网，全站只需 2 张产品截图（Reader 一张 + Note 一张）

参考网站（Luca 选择）：
- anthropic.com — 中性配色、克制
- mymind.com — 文案即设计
- granola.ai — 极简白底、诚恳
- medpath.com — 文字驱动、少图片

延伸参考：
- posthog.com — 朴素到像开源项目主页，但价值观刻在每一屏
- linear.app/method — 讲方法论那一页

### 文案口吻

**诚恳朴素的人 + 有态度的产品**

写法准则：
- 用朴素的语言讲立场
- 不要"我们重新定义阅读"，而要"我们不让 AI 替你读"
- 立场藏在动词和"不做什么"里，不在形容词里

### 配色（Claude Design 产出 + Luca 2026-04-19 确认）

| 用途 | 色值 | 说明 |
|---|---|---|
| 背景主色 | `#FAF7F2` | 暖米白（偏纸感，比 Anthropic 更温） |
| 背景深 | `#F2ECE2` | 卡片 / masthead 背景 |
| 背景更深 | `#EBE3D3` | hover 态 |
| 文字主（ink） | `#1B1A17` | 暖黑 |
| 文字次（ink-soft） | `#4A443B` | 正文辅文（比冷灰更有温度） |
| 文字弱（ink-mute） | `#8A8375` | 元信息 / 编号 / 标签 |
| 分隔线（rule） | `#DDD4C4` | 主分隔 |
| 分隔线软（rule-soft） | `#E8E1D2` | section 分隔 |
| **Accent** | **`#3A5F4D`** | **森林绿**（Claude Design 选定，比原 Slax 青绿更克制、更 editorial） |

**Accent 决策**：原计划用沉青 `#0F8B73`，Claude Design 最终选了森林绿 `#3A5F4D`。Luca 2026-04-19 确认保留森林绿——理由是与"editorial / slow software / 诚恳朴素"定位贴得更紧，比青绿更克制。

### 字体系统（Claude Design 产出 + Luca 2026-04-19 确认：方案 A 自托管）

| 用途 | 字体 | 说明 |
|---|---|---|
| 衬线（serif） | **Source Serif 4** | 大标题 / Hero / Blog 文章正文；Anthropic Tiempos 气质 |
| 无衬线（sans） | **Inter** | UI / 正文 / 按钮 |
| 等宽（mono） | **JetBrains Mono** | 元信息 / eyebrow 标签 / 编号 / masthead / footer meta |

**字体策略**：方案 A——**自托管 woff2**。
- 优点：视觉质感达标 + 无 Google Fonts CDN 国内慢问题 + 全站首屏字体立即就位
- 实现：把三个字体的必要字重下载为 woff2，放 `public/fonts/`，用 `@font-face` + `font-display: swap` 声明
- 开发阶段可以先用 Google Fonts CDN 拿到视觉验证，上线前替换为自托管

---

## 首页骨架（已确认）

```
[屏 1] HERO
  一句产品定义（ONE-LINER，待 Luca 写）
  一句价值观补充（待 Luca 写）
  [试用 Reader] [试用 Note]

[屏 2] 立场 / 我们相信什么（和普通 SaaS 的分水岭）
  3 条信念，每条一行字（待 Luca 写）
  示例:"我们不做信息流。""你的内容,永远属于你。"

[屏 3] Slax Reader
  一句话定义 + 1 张产品截图 + 3 行功能 + 链接

[屏 4] Slax Note
  一句话定义 + 1 张产品截图 + 3 行功能 + 链接

[屏 5] 为什么是我们（可选）
  和 Readwise / Cubox / 其它笔记的区别，3 句话

[屏 6] 博客 / 写作入口
  Luca 是写作者，这是差异化武器，要给位置

[Footer] 简洁链接 + 联系方式
```

---

## 全站信息架构

```
slax.com/
├── /                            首页
├── /blog/                       共享博客（两产品共用，未来更多产品也共用）
├── /about/
├── /reader/                     Reader 产品单页（Hero / Features / Pricing / Download 锚点导航）
│   └── /reader/alternatives/    对比区（保留多页，SEO 资产）
│       ├── /reader/alternatives/        总览页
│       ├── /reader/alternatives/readwise/
│       ├── /reader/alternatives/cubox/
│       └── ...
└── /note/                       Note 产品单页（结构同 reader）
    └── /note/alternatives/      对比区（结构同 reader）
```

### 产品单页 vs 对比多页的分水岭

产品主页（features / pricing / download）合并成一个长滚动单页：
- 读者来意统一：了解产品。信息量不足以撑多页面，强拆稀释
- 锚点导航替代独立页面（Granola / Linear / Arc 都这么做）
- 对"文字驱动 + 少图"的定位天然契合，滚动即阅读

对比页必须保留多页结构：
- 读者来意分散，每个人在找不同的替代品
- 每篇独立 URL 抓不同长尾关键词，合成一页 = 放弃 SEO 红利
- 100 篇对比 = 100 个入口，是核心差异化武器

### 全站风格统一原则

- **共享一套 design tokens**：颜色、字号、间距全站调一份 CSS 变量
- **共享一套核心组件**：Hero / FeatureBlock / Footer / CTA
- 每个子站只写自己的内容，不重写样式

---

## 全站工程大原则

### 1. 移动优先，不是"适配好"

手机屏是默认视口，桌面是渐进增强。所有组件先按 375px 宽度设计通过，再往上放大。
- 测试机型：iPhone SE / iPhone 15 / 安卓中端（Pixel 级别）
- 触摸热区最小 44×44px，按钮之间留 8px 间距
- 横向滚动只用在功能矩阵表，其他一律纵向堆叠
- 首页 6 屏在手机上能快速滑完，每屏只承担一件事

### 2. 性能是设计的一部分

Core Web Vitals 必须全绿（LCP < 2.5s / CLS < 0.1 / INP < 200ms）。
- 全站只有 2 张产品截图，用 WebP + `loading="lazy"`（首屏除外）
- 字体：系统字体优先，或单一可变字体，避免 FOUT
- Astro 的零 JS 优势要守住，能用 CSS 就不用 JS
- 博客文章 Lighthouse 分 ≥ 95

### 3. SEO 基础设施（一次建好终身受益）

- 每页独立 title / description / OG image（OG 可自动生成，不手画）
- `sitemap.xml` / `robots.txt` / `rss.xml` 全部自动化
- 结构化数据：`Article` 给博客、`SoftwareApplication` 给产品页、`FAQPage` 给对比页
- URL 一次定下终身不变，换路径必须 301

### 4. 无障碍（不是政治正确，是工程基本功）

- 文字对比度满足 WCAG AA（正文 4.5:1，大字 3:1）
- 所有交互元素键盘可达，焦点可见
- 图片有 alt，装饰图用 `alt=""`
- 不靠颜色单独传达信息（对比页的 ✓/✗ 必须配文字）

### 5. 深色模式（推荐做）

Anthropic 的暖米白已经是浅色偏黄调，深色模式是对长时间阅读博客的读者的礼物。
- 跟随系统，不做切换按钮（克制）
- 深色背景用 `#1A1A1A`，不用纯黑
- 用 CSS 变量切，不写两套样式

### 6. 内容可维护性（非技术人员可改）

- 所有文案走 markdown / mdx，不写死在组件里
- 对比页 7 个 section 是 frontmatter + 正文结构，Luca 改文字零代码
- 博客图片放对应 app 的 `public/`，路径约定死

### 7. 克制的 JS 与第三方

- 禁用任何弹窗、退出挽留、追踪像素
- 分析用 Plausible / Umami（隐私友好 + 无 cookie 弹窗）
- **字体自托管**（Source Serif 4 / Inter / JetBrains Mono），不接 Google Fonts CDN（国内慢）
- Chat widget / 评论系统 / newsletter 弹窗一律不要

### 8. 语言策略（已定：仅英文）

- 网站全站英文，不做中文版
- 产品本体保留多语言（产品内 i18n 和官网解耦）
- 博客全部英文写作
- 不预留 `/zh/` 路径，未来要做再说，现在不预设架构负担

### 9. 404 / 错误页有品牌感

404 页延续"诚恳朴素"口吻：
- 不要 "Oops! Page not found"
- 而是类似 "This page has moved, or never existed." + 一个回首页链接

### 10. 可追溯

- 所有内容变更走 git commit，commit message 英文
- 博客草稿在分支上，合并前预览确认
- `dist/` 不入库（现已是）

---

## 对比页方案（核心 SEO 资产）

### 结构：双层 — 矩阵总览页 + 单篇深度页

```
/reader/alternatives/                    总览页
  └─ 一张矩阵表：Reader vs Readwise vs Cubox vs Matter ...
     每一行点进去 → 单篇深度对比

/reader/alternatives/readwise/           单篇深度
/reader/alternatives/cubox/
/reader/alternatives/matter/
...
```

### 关键决策：URL 用 `/alternatives/` 而非 `/vs/` 或 `/compare/`

搜索量决定的：

| 词 | 月搜索量级 |
|---|---|
| "readwise alternatives" | 高（用户主动找替代品） |
| "slax vs readwise" | 低（要先认识 Slax 才会搜） |
| "compare readwise slax" | 几乎为零 |

`/alternatives/readwise` 同时抓"找替代品"和"对比"两类需求。这是华人产品最容易忽略的 SEO 红利。

### 关键决策：对比页放 product 路径下，不放 blog

- 对比页是产品营销页，不是文章。读者来意是"决定买不买"。
- Blog 的 CTA 弱，alternatives 页的 CTA 必须强（顶部 + 底部都要"试用 Slax"）
- Google 也会把 blog 文章和 product 页区别对待，对比页放 product 路径下排名更好

### 单篇对比页固定模板

```
1. TL;DR（3 行）—— 谁适合 Slax，谁适合对方
2. 核心差异（3-5 点）—— 不堆功能，讲设计哲学不同
3. 功能矩阵 ✓/✗ —— 一张表，扫一眼
4. 定价对比
5. 迁移指南 —— 怎么把数据从对方搬过来
6. 「他们做得比我们好的地方」 ★ 关键差异化
7. CTA：试用 Slax
```

### 第 6 节是关键差异化武器

普通对比页是"我赢你输"格式。Slax 承认对方优点的写法：

- 和"诚恳朴素 + 有态度"的定位完全一致
- 读者已经见过 100 篇"我赢你输"对比页，看到一篇承认对手优点的，信任度直接拉满
- SEO 上的意外好处：会被对方品牌词反向引流
- 教科书参考：posthog.com/blog/posthog-vs-mixpanel

### 实现方式

每篇对比页 = 一个 Markdown 文件 + 共用模板组件。
Luca 只写 7 个 section 的内容，渲染、SEO、面包屑、CTA 全部由组件自动生成。
**写 100 篇对比文章 ≈ 写 100 个 markdown 文件，零代码。**

---

## 决策记录

### 1. 总览页形态：A（极简列表）✅

- 和"诚恳朴素"定位一致，矩阵表是展示型，列表是阅读型
- 移动端友好，矩阵在手机上必然横滚或缩小
- 搜 "xxx alternatives" 的人带着具体竞品名来，不需要矩阵总览

### 2. 第一批对比对象 ✅（部分）

**Reader(3 篇，顺序即优先级)**：

1. **Readwise Reader** — 流量最大，必做第一篇
2. **Omnivore** — 🚨 红利窗口：2024-11 被 ElevenLabs 收购后关停，用户迁移潮还在，"omnivore alternatives" 搜索量高且竞争少
3. **Cubox** — 华人出海用户找替代品时会搜

**Note(3 篇)**：

Slax Note 真实定位(Luca 确认)：**个人灵感记录 + 日记，语音输入 + AI 转写整理**
- 细分赛道："voice journaling / AI journaling"
- 用户场景：通勤 / 散步 / 睡前把想法说出来,AI 整理成文字笔记或日记

1. **AudioPen** — 最直接的对标产品,定位几乎重合,必做第一篇
2. **Rosebud** — AI 日记赛道最热(2024-2025 爆火),抓 "AI journal / voice journal" 细分热词
3. **Voicenotes.com** — 名字+功能直接对标,抓 "voice notes" 泛搜索

候补:Day One / Reflectly / Stoic Journal

### 3. Note 产品定位必须在新版中纠正 ✅

现状问题清单第 6 条已记录,新版 Hero 文案必须突出:
- 语音输入(不是打字)
- AI 转写与整理(不是原始录音)
- 个人灵感 + 日记场景(不是会议,也不是泛笔记)

**差异化站位**:语音笔记的会议赛道被 Otter / Granola 占满,Slax Note 打"voice journaling"细分,避开正面竞争。文案建议的方向:"把每天的想法说给 AI 听,它帮你整理。"

### 4. Note 落地页内容来源 ✅

产品本体在独立仓库 `~/Dropbox/research/slax-note-web/`(TanStack Start + Cloudflare Workers),落地页内容从产品本体的 `src/i18n/locales/en.json` 提取。

**产品真实功能清单**(从 i18n 反推,避免再次错定位):

| 功能 | 说明 |
|---|---|
| Recording | 语音录音输入(Free 5 分钟/次,Pro 30 分钟/次) |
| Polish | AI 润色,四种模式:Intelligent / Summarize / Tweets(X.com) / Custom Prompt |
| Notes / Archive | 笔记管理 + 归档 |
| 定价 | Free / $4.99 月 / $49.99 年 |

**定位精修**(基于 Luca 2026-04-19 确认):

核心不是某个具体输出形态(不是"语音→推文"、也不是单一"语音日记"),而是 **"一段语音输入 → AI 按不同 Prompt 做多重整理"** 的灵活性。

- **场景**:偏私人(个人灵感 + 日记为主),不是会议,不是公开表达
- **特色**:同一段话可以润色成多种形态(日记、摘要、推文等),由 Prompt 决定
- **Tweets(X.com)模式**:是顺带功能,不是主打卖点,落地页可提一笔但不做重点

**Hero 方向(候选,供 Luca 亲笔时参考)**:

- "Say what's on your mind. Let AI reshape it — your way."
- "Speak it. AI turns it into whatever you need."
- "Your voice in. Your thoughts, cleaner."

灵魂句最终由 Luca 亲笔定。方向关键词:**私人 / 灵活 / 朴素**,避免"transform your notes""revolutionize"这种 SaaS 套话。

### 5. 落地页定价处理 ✅(Luca 2026-04-19 确认)

- Note 落地页**不再重写定价板块**,完全复用产品本体(`slax-note-web`)已有的订阅界面
- 落地页 CTA 直接跳转到产品内的 Subscribe 弹窗
- 理由:落地页只负责"让你想试",最后一步付费转化在产品里完成;避免落地页和产品内价格文案两头维护


---

## 执行计划（分三阶段）

核心原则：**先换地基（合并项目 + 搭视觉系统），再迁内容，最后才写新内容**。不边做新内容边改架构。

Claude Design bundle 已经是设计源（CSS + HTML 完整实现），后续实施是"把 bundle 迁进 Astro 项目"，不是"从头设计"。

---

### 阶段 1：换地基（合并项目 + 搭视觉系统）

**目标**：消灭 multi-site monorepo 这个根源问题。完成后全站只有一份代码、一份样式、一份组件。

#### 1.1 备份现有产物

- 保留 `apps/` 旧结构在 `archive/apps-backup/`（或 git 分支），以便回查旧文案
- `slax-note-web` 的 `i18n/locales/en.json` 单独拷一份到 `docs/reference/note-i18n.json`，作为 Note 内容来源

#### 1.2 新建单一 Astro 项目骨架

- 新建 `src/` 目录结构（见架构决策章节）
- 初始化 `astro.config.mjs`（无 Starlight，只保留必要 integration：sitemap、mdx、content collections）
- 更新根 `package.json`：移除 workspace 配置，依赖简化为单一 Astro 项目
- 删除 `script/build.sh`——`pnpm build` 直接跑 `astro build`

#### 1.3 落地视觉系统（基于 Claude Design bundle）

- 把 bundle 里的 `slax.css` 拆成两份：
  - `src/styles/tokens.css`（CSS 变量：颜色 / 字号 / 间距 / 字体族）
  - `src/styles/global.css`（nav / footer / 按钮 / prose 等通用组件样式）
- 自托管字体到 `public/fonts/`：Source Serif 4（300/400/500/600 + italic 400）、Inter（400/500/600）、JetBrains Mono（400/500），只要 latin subset，woff2 格式
- 在 `layouts/Base.astro` 里用 `@font-face` 声明 + 关键字重 preload

#### 1.4 搭共享组件（对应 Claude Design bundle）

按 bundle 里的结构抽：
- `components/Nav.astro`（sticky nav + brand mark + backdrop blur）
- `components/Footer.astro`（footer-grid + footer-meta 带版本号 / 日期）
- `components/Eyebrow.astro`（mono 标签 + 短横线前缀）
- `components/SectionLabel.astro`（"01 / 02 / 03" 编号章节）
- `components/MastheadCard.astro`（Hero 右侧 At a glance 元信息卡）
- `components/ProductCard.astro`（产品卡片，含 badge / hover 态）
- `components/Scene.astro`（scene-num + scene-title + scene-story 三列）
- `components/Button.astro`（`variant` prop：`primary` / `secondary` / `nav-cta`）

#### 1.5 建路由骨架（空壳，不填内容）

- `pages/index.astro`（首页，暂时直接把 bundle 的 index.html 内容粘进去作为 starting point）
- `pages/about.astro`
- `pages/404.astro`
- `pages/reader/index.astro`
- `pages/reader/alternatives/index.astro`
- `pages/reader/alternatives/[slug].astro`（从 content collection 生成）
- `pages/note/index.astro`
- `pages/note/alternatives/index.astro`
- `pages/note/alternatives/[slug].astro`
- `pages/blog/index.astro`
- `pages/blog/[slug].astro`

#### 1.6 验收

- `pnpm dev` 启动单一 dev server（告别三端口并发）
- `pnpm build` 产出单一 `dist/`，无需任何手动拼接脚本
- 全站 logo、导航、footer、字体、颜色完全一致
- 旧 `apps/` 目录删除（或保留在 archive 分支）
- Lighthouse 跑一轮，Core Web Vitals 全绿

**交付物**：干净的单一 Astro 项目 + Claude Design 视觉系统 + 路由骨架 + 空页面。

---

### 阶段 2：迁内容（填入真实文案，不写新内容）

**目标**：把现有三个 app 的真实内容搬进新结构，并在搬迁 Note 时顺带纠正定位。

#### 2.1 首页

- 内容直接来自 Claude Design bundle 的 `index.html`
- Hero ONE-LINER + 3 条信念标记 `{{TODO: Luca 亲笔}}` 占位
- 其他段落（manifesto / scenes / oss / closing）先保留 bundle 草稿文案

#### 2.2 Reader 单页

- 内容来自 Claude Design bundle 的 `reader/index.html`
- features / pricing / download 用锚点整合在一个页面
- 真实文案从 `archive/apps-backup/apps/slax-home/src/content/docs/reader/`、`apps/reader-home/src/content/docs/` 迁移

#### 2.3 Note 单页（定位纠正）

- Hero 改成：语音输入 + AI 整理（多 Prompt 处理） + 个人灵感 / 日记
- 功能列表从 `docs/reference/note-i18n.json` 反推：Recording / Polish / Notes / Archive
- **定价段不重写**——CTA 直接跳转到产品内（`https://note.slax.com/#subscribe` 之类）

#### 2.4 Blog

- 从 `archive/apps-backup/apps/slax-home/src/content/blog/` 迁 mdx 到 `src/content/blog/`
- 套用新 article 模板（Claude Design bundle 里 `blog/posts/*.html` 是参考）
- Blog 索引页用 bundle 的 `blog/index.html` 作为起点

#### 2.5 对比页空壳

- `src/content/reader-alternatives/` 和 `src/content/note-alternatives/` 建好 collection schema
- `alternatives/index.astro` 做极简列表（A 方案）
- 暂时不填单篇，等阶段 3 一篇一篇写

#### 2.6 404 页

- 套 bundle 风格
- 文案方向："This page has moved, or never existed." + 回首页链接

#### 2.7 SEO 基础设施

- `astro-sitemap` 自动生成 sitemap.xml
- `robots.txt` 手写
- `rss.xml` 给 Blog
- OG image 默认模板（Luca 头像或 Slax logo + 页面标题）
- 结构化数据：`Article` 给 Blog，`SoftwareApplication` 给产品页

**交付物**：完整可浏览站点，所有旧内容归位，Note 定位已纠正，对比页骨架已就绪。首页灵魂句和对比文章是 placeholder。

---

### 阶段 3：写新内容（长期工程）

**目标**：填充差异化内容资产。一次一篇，按节奏来。

按优先级：

1. **首页 ONE-LINER + 3 条信念**（Luca 亲笔，决定整站命脉）
2. **Reader vs Readwise** — 第一篇对比，同时把 `compare-template.md` 打磨定型
3. **Reader vs Omnivore** — 吃关停迁移红利
4. **Reader vs Cubox**
5. **Note vs AudioPen** — Note 第一篇对比
6. **Note vs Rosebud**
7. **Note vs Voicenotes.com**
8. 后续每周 1-2 篇对比，积累 SEO 资产

灵魂句（必须 Luca 亲自写，AI 不能代笔）：
- 屏 1 的 ONE-LINER —— 整个 Slax 的定位句
- 屏 2 的 3 条信念 —— Slax 的产品观

---

## 当前行动

进入**阶段 1**。按 1.1 → 1.6 顺序执行。

第一步：备份 `apps/` 现状（`archive/apps-backup/` 或独立 git 分支），然后初始化新的 `src/` Astro 骨架。确认备份策略后开工。
