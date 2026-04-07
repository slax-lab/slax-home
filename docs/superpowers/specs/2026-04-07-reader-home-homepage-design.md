# reader-home 首页重做设计文档

**日期：** 2026-04-07  
**项目：** apps/reader-home  
**页面：** `/reader/`（首页）  
**内容来源：** 旧官网 Vue 文件（保留原文案，转换为 Astro 组件）

---

## 一、目标

将旧官网 `r.slax.com/en` 的首页内容完整迁移到新官网 `reader-home`，保留所有原文案，转换为 Astro + Starlight 技术栈，遵循新官网设计规范（STYLE.md）。

---

## 二、页面结构

首页由 5 个独立区块组成，每个区块是一个独立的 `.astro` 组件：

```
apps/reader-home/src/components/home/
├── HomeHero.astro           ← 首屏 Hero 区
├── HomeFeatures.astro       ← 4 个功能特性卡片
├── HomeHowItWorks.astro     ← 4 步使用流程
├── HomeComparison.astro     ← 竞品对比表格
└── HomeCTA.astro            ← 底部行动呼吁区
```

首页入口文件：
```
apps/reader-home/src/content/docs/index.mdx   ← 已存在，重写内容
```

---

## 三、各区块内容规格

### 区块 1：Hero（`HomeHero.astro`）

**布局：** 左文右图，两列

**左侧文字：**
- 主标题：`Read Smarter / Connect Deeper`（两行，大字）
- 副标题：`Your permanent library that saves, understands, and networks your content with others.`
- 按钮：`Start Reading Smarter - Free →`（主色渐变背景，跳转 `/reader/download`）
- 信任标签（3 个横排）：
  - `🔒 Your content, forever safe`
  - `🚀 5x faster understanding`
  - `⭐ Interactive reading community`

**右侧视觉：**  
AI 对话演示卡片（白色卡片 + 透视倾斜效果），包含两个子卡：
- `🤖 AI Analysis` — 展示文章摘要示例文字
- `💬 Ask AI` — 展示用户提问 + AI 回答示例

**背景：** 从左上到右下的浅绿渐变（`#f8fffc` → `#e6fff3`），保留旧官网风格

---

### 区块 2：Features（`HomeFeatures.astro`）

**标题：** `Not Just Another Read-Later Tool`  
**副标题：** `We're building the future of intelligent reading`

**4 个特性卡片（横排）：**

| # | 标题 | 描述 |
|---|------|------|
| 1 | AI-Powered Understanding | Get instant summaries, key insights, and answers to your questions about any article. It's like having a personal tutor for everything you read. |
| 2 | Content Never Dies | Articles saved once are backed up forever. No more "404 Page Not Found" disappointments. Your digital library is truly permanent. |
| 3 | Smart Organization | AI automatically tags and categorizes your content. Find exactly what you need when you need it with powerful semantic search. |
| 4 | Connected Reading | Highlight and comment on any article you save. Share your content and invite others to add insights and discuss. Every article becomes a place for conversation. |

**卡片样式：** 浅灰背景（`#F8F9FA`），hover 上浮 + 顶部品牌绿色线条，编号圆形绿色图标

---

### 区块 3：How It Works（`HomeHowItWorks.astro`）

**标题：** `From Bookmark to Breakthrough`  
**副标题：** `Four simple steps to transform how you read and learn`

**4 个步骤（横排）：**

| 步骤 | 标题 | 描述 |
|------|------|------|
| 1 | Save Anything | One click to save articles, papers, or blog posts from anywhere on the web |
| 2 | AI Analyzes | Instant AI overviews help you decide what deserves deep reading and what to skim. Save time for the best content. |
| 3 | Ask Questions | Chat with AI about your saved content to deepen understanding |
| 4 | Engage with Your Content | Highlight, comment & discuss with others. What you write is more valuable than what you read. |

**图标：** 使用 emoji 或简单 SVG 替代旧官网的图片文件（旧版用 PNG，新版统一用内联 SVG）

---

### 区块 4：Comparison（`HomeComparison.astro`）

**标题：** `Why Readers Are Switching to Slax`  
**副标题：** `See how we compare to traditional read-later tools`

**对比表格（Slax Reader vs Instapaper vs Readwise）：**

| Feature | Slax Reader | Instapaper | Readwise |
|---------|-------------|------------|----------|
| Unlimited Free Bookmarks (for early users) | ✅ | ✅ | Paid service |
| Permanent Content Backup | ✅ | Paid service | Paid service |
| AI Outline | Paid service | ✅ | Paid service |
| Chat with AI While Reading | Paid service | ❌ | Paid service |
| Highlight & Comment on Original Pages & Snapshots, Two-Way Synced | ✅ | ❌ | Paid service |
| Join Reader Discussions | ✅ | ❌ | ⚠️ Shared highlights only, no discussions |
| AI Auto Tagging | Paid service | ⚠️ Manual tags only | ⚠️ Manual tags only |

**样式：** 白色背景卡片，圆角 16px，阴影，Slax Reader 列标题高亮品牌色

---

### 区块 5：CTA（`HomeCTA.astro`）

**标题：** `Start Your Intelligent Reading Journey Today`  
**副标题：** `Read smarter, learn faster, remember more`  
**按钮：** `Get Started - It's Free →`（白色背景，深色文字，跳转 `/reader/download`）  
**背景：** 品牌绿渐变（`#2eb396` → `#5edda8`）

---

## 四、技术规格

### 文件修改

| 操作 | 文件 |
|------|------|
| 重写 | `apps/reader-home/src/content/docs/index.mdx` |
| 新增 | `apps/reader-home/src/components/home/HomeHero.astro` |
| 新增 | `apps/reader-home/src/components/home/HomeFeatures.astro` |
| 新增 | `apps/reader-home/src/components/home/HomeHowItWorks.astro` |
| 新增 | `apps/reader-home/src/components/home/HomeComparison.astro` |
| 新增 | `apps/reader-home/src/components/home/HomeCTA.astro` |

### index.mdx 格式

```mdx
---
title: Slax Reader — Read Smarter, Connect Deeper
description: Your permanent library that saves, understands, and networks your content with others.
template: splash
head:
  - tag: style
    content: '.page-wrapper { max-width: 100% !important; padding: 0 !important; }'
---

import HomeHero from '~/components/home/HomeHero.astro';
import HomeFeatures from '~/components/home/HomeFeatures.astro';
import HomeHowItWorks from '~/components/home/HomeHowItWorks.astro';
import HomeComparison from '~/components/home/HomeComparison.astro';
import HomeCTA from '~/components/home/HomeCTA.astro';

<HomeHero />
<HomeFeatures />
<HomeHowItWorks />
<HomeComparison />
<HomeCTA />
```

### 样式规范

- 主色：`#16b998`（CSS 变量 `var(--sl-color-accent)`）
- 渐变绿：`linear-gradient(135deg, #25d4b0, #1cb0b5, #16b998)`
- 最大宽度：`1200px`，左右 padding：`20px`（移动端）/ `48px`（PC）
- 区块间距：`padding: 68px 0 100px`
- 字体：系统字体栈（已在 STYLE.md 定义）
- 不使用 Starlight 的 `<Card>` 组件，所有卡片自定义实现

---

## 五、成功标准

- [ ] 访问 `http://localhost:4322/reader/` 显示完整的 5 个区块
- [ ] Hero 区标题、副标题、按钮文案与旧官网一致
- [ ] Features 4 个卡片文案与旧官网一致
- [ ] How It Works 4 步文案与旧官网一致
- [ ] Comparison 表格数据与旧官网一致
- [ ] CTA 区文案与旧官网一致，背景为品牌绿渐变
- [ ] 所有按钮跳转到 `/reader/download`
- [ ] 移动端（< 768px）每列区块变为单列
- [ ] dev server 无报错，无 TypeScript 错误

---

## 六、不在本次范围内

- Footer 组件（阶段二）
- 顶栏新入口（Pricing/Download 已有，Resources 下拉阶段三）
- 中文版内容
- 图片替换（Hero 右侧演示卡片使用内联文字 + 样式，不依赖外部图片）
