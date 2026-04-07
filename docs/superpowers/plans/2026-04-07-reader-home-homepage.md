# reader-home Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 reader-home 首页重做为 5 个独立营销区块，结构参考旧官网，文案以当前 spec 为准。

**Architecture:** 采用“页面入口 + 5 个独立 Astro 组件”的结构。`index.mdx` 只负责组装页面，各区块样式和内容分别封装在 `src/components/home/` 下，方便后续单独调整 Hero、功能卡片、对比表和 CTA。

**Tech Stack:** Astro 6, Starlight 0.38, MDX, CSS, TypeScript strict

---

## 文件清单

| 操作 | 路径 |
|------|------|
| Create | `apps/reader-home/src/components/home/HomeHero.astro` |
| Create | `apps/reader-home/src/components/home/HomeFeatures.astro` |
| Create | `apps/reader-home/src/components/home/HomeHowItWorks.astro` |
| Create | `apps/reader-home/src/components/home/HomeComparison.astro` |
| Create | `apps/reader-home/src/components/home/HomeCTA.astro` |
| Modify | `apps/reader-home/src/content/docs/index.mdx` |

---

### Task 1: 创建 HomeHero.astro

**Files:**
- Create: `apps/reader-home/src/components/home/HomeHero.astro`

- [ ] **Step 1: 创建 Hero 组件文件**

```astro
---
const trustIndicators = [
  '🔒 Your content, forever safe',
  '🚀 5x faster understanding',
  '⭐ Interactive reading community',
];
---

<section class="home-hero">
  <div class="home-hero__container">
    <div class="home-hero__content">
      <div class="home-hero__text">
        <h1>Read Smarter<br />Not Just Later</h1>
        <p>
          Save Forever, Learn faster. Your intelligent library for high efficiency and deep
          undersatanding.
        </p>
        <a class="home-hero__cta" href="/reader/download">
          <span>Start Reading Smarter - Free</span>
          <span aria-hidden="true">→</span>
        </a>
        <div class="home-hero__trust">
          {trustIndicators.map((item) => <span>{item}</span>)}
        </div>
      </div>

      <div class="home-hero__visual">
        <div class="home-hero__preview">
          <div class="home-hero__card">
            <h4>🤖 AI Analysis</h4>
            <p>
              This article explains how knowledge workers can build a permanent reading
              library. Key points: <br />1. Save content before it disappears. <br />2. Use AI
              to summarize and surface key ideas. <br />3. Turn reading into reusable
              knowledge.
            </p>
          </div>
          <div class="home-hero__card">
            <h4>💬 Ask AI</h4>
            <p>
              <strong>You:</strong> “What should I remember from this article?”<br />
              <strong>AI:</strong> “Focus on the permanent archive, AI-assisted understanding,
              and collaboration layer. Those are the main reasons users switch.”
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .home-hero {
    padding: 80px 0 100px;
    background: linear-gradient(135deg, #f8fffc 0%, #e6fff3 100%);
    overflow: hidden;
  }

  .home-hero__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .home-hero__content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 48px;
    align-items: center;
  }

  .home-hero__text h1 {
    margin: 0 0 24px;
    font-size: clamp(2.8rem, 5vw, 4rem);
    line-height: 1.1;
    font-weight: 800;
    color: #1f1f1f;
  }

  .home-hero__text p {
    margin: 0 0 32px;
    font-size: 1.125rem;
    line-height: 1.7;
    color: #333333;
    max-width: 34rem;
  }

  .home-hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 0 28px;
    border-radius: 6px;
    background: linear-gradient(135deg, #25d4b0 0%, #1cb0b5 50%, #16b998 100%);
    color: #ffffff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 700;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .home-hero__cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 30px 60px 0 rgba(22, 185, 152, 0.18);
  }

  .home-hero__trust {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 24px;
    margin-top: 24px;
    color: #666666;
    font-size: 0.95rem;
  }

  .home-hero__visual {
    display: flex;
    justify-content: center;
  }

  .home-hero__preview {
    width: 100%;
    max-width: 520px;
    padding: 32px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
    transform: perspective(1000px) rotateY(-8deg);
  }

  .home-hero__card {
    padding: 24px;
    border-radius: 12px;
    background: #f8f9fa;
  }

  .home-hero__card + .home-hero__card {
    margin-top: 16px;
  }

  .home-hero__card h4 {
    margin: 0 0 12px;
    color: #16b998;
    font-size: 1rem;
  }

  .home-hero__card p {
    margin: 0;
    color: #333333;
    line-height: 1.7;
    font-size: 0.95rem;
  }

  @media (max-width: 900px) {
    .home-hero__content {
      grid-template-columns: 1fr;
    }

    .home-hero__preview {
      transform: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add apps/reader-home/src/components/home/HomeHero.astro
git commit -m "feat(reader-home): add homepage hero section"
```

---

### Task 2: 创建 HomeFeatures.astro

**Files:**
- Create: `apps/reader-home/src/components/home/HomeFeatures.astro`

- [ ] **Step 1: 创建 Features 组件文件**

```astro
---
const features = [
  {
    title: 'AI-Powered Understanding',
    description:
      "Get instant summaries, key insights, and answers to your questions about any article. It's like having a personal tutor for everything you read.",
  },
  {
    title: 'Content Never Dies',
    description:
      'Articles saved once are backed up forever. No more “404 Page Not Found” disappointments. Your digital library is truly permanent.',
  },
  {
    title: 'Smart Organization',
    description:
      'AI automatically tags and categorizes your content. Find exactly what you need when you need it with powerful semantic search.',
  },
  {
    title: 'Connected Reading',
    description:
      'Highlight and comment on any article you save. Share your content and invite others to add insights and discuss. Every article becomes a place for conversation.',
  },
];
---

<section class="home-features">
  <div class="home-features__container">
    <div class="home-features__header">
      <h2>Not Just Another Read-Later Tool</h2>
      <p>We&apos;re building the future of intelligent reading</p>
    </div>

    <div class="home-features__grid">
      {features.map((feature, index) => (
        <article class="home-features__card">
          <div class="home-features__icon">{index + 1}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .home-features {
    padding: 68px 0 100px;
    background: #ffffff;
  }

  .home-features__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .home-features__header {
    text-align: center;
    margin-bottom: 68px;
  }

  .home-features__header h2 {
    margin: 0 0 24px;
    font-size: clamp(2rem, 4vw, 2.5rem);
    color: #1f1f1f;
  }

  .home-features__header p {
    margin: 0;
    color: #333333;
    font-size: 1.125rem;
  }

  .home-features__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .home-features__card {
    position: relative;
    padding: 32px;
    border-radius: 12px;
    background: #f8f9fa;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .home-features__card::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #16b998 0%, #5edda8 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  .home-features__card:hover {
    transform: translateY(-4px);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
  }

  .home-features__card:hover::before {
    transform: scaleX(1);
  }

  .home-features__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 0 auto 24px;
    border-radius: 999px;
    background: linear-gradient(90deg, #16b998 0%, #5edda8 100%);
    color: #ffffff;
    font-weight: 700;
  }

  .home-features__card h3 {
    margin: 0 0 16px;
    font-size: 1.25rem;
    color: #1f1f1f;
  }

  .home-features__card p {
    margin: 0;
    color: #666666;
    line-height: 1.7;
  }

  @media (max-width: 900px) {
    .home-features__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add apps/reader-home/src/components/home/HomeFeatures.astro
git commit -m "feat(reader-home): add homepage features section"
```

---

### Task 3: 创建 HomeHowItWorks.astro

**Files:**
- Create: `apps/reader-home/src/components/home/HomeHowItWorks.astro`

- [ ] **Step 1: 创建 How It Works 组件文件**

```astro
---
const steps = [
  {
    icon: '📥',
    title: 'Save Anything',
    description: 'One click to save articles, papers, or blog posts from anywhere on the web',
  },
  {
    icon: '🧠',
    title: 'AI Analyzes',
    description:
      'Instant AI overviews help you decide what deserves deep reading and what to skim. Save time for the best content.',
  },
  {
    icon: '💬',
    title: 'Ask Questions',
    description: 'Chat with AI about your saved content to deepen understanding',
  },
  {
    icon: '✨',
    title: 'Engage with Your Content',
    description:
      'Highlight, comment & discuss with others. What you write is more valuable than what you read.',
  },
];
---

<section class="home-steps">
  <div class="home-steps__container">
    <div class="home-steps__header">
      <h2>From Bookmark to Breakthrough</h2>
      <p>Four simple steps to transform how you read and learn</p>
    </div>

    <div class="home-steps__grid">
      {steps.map((step) => (
        <article class="home-steps__item">
          <div class="home-steps__icon" aria-hidden="true">{step.icon}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .home-steps {
    padding: 68px 0 100px;
    background: #f8f9fa;
  }

  .home-steps__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .home-steps__header {
    text-align: center;
    margin-bottom: 68px;
  }

  .home-steps__header h2 {
    margin: 0 0 24px;
    font-size: clamp(2rem, 4vw, 2.5rem);
    color: #1f1f1f;
  }

  .home-steps__header p {
    margin: 0;
    font-size: 1.125rem;
    color: #333333;
  }

  .home-steps__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 32px;
  }

  .home-steps__item {
    text-align: center;
  }

  .home-steps__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    margin: 0 auto 20px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
    font-size: 2rem;
  }

  .home-steps__item h3 {
    margin: 0 0 16px;
    font-size: 1.25rem;
    color: #1f1f1f;
  }

  .home-steps__item p {
    margin: 0;
    line-height: 1.7;
    color: #333333;
  }

  @media (max-width: 900px) {
    .home-steps__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add apps/reader-home/src/components/home/HomeHowItWorks.astro
git commit -m "feat(reader-home): add homepage how-it-works section"
```

---

### Task 4: 创建 HomeComparison.astro

**Files:**
- Create: `apps/reader-home/src/components/home/HomeComparison.astro`

- [ ] **Step 1: 创建 Comparison 组件文件**

```astro
---
const rows = [
  ['Unlimited Free Bookmarks (for early users)', '✅', '✅', 'Paid service'],
  ['Permanent Content Backup', '✅', 'Paid service', 'Paid service'],
  ['AI Outline', 'Paid service', '✅', 'Paid service'],
  ['Chat with AI While Reading', 'Paid service', '❌', 'Paid service'],
  ['Highlight & Comment on Original Pages & Snapshots, Two-Way Synced', '✅', '❌', 'Paid service'],
  ['Join Reader Discussions', '✅', '❌', '⚠️ Shared highlights only, no discussions'],
  ['AI Auto Tagging', 'Paid service', '⚠️ Manual tags only', '⚠️ Manual tags only'],
];
---

<section class="home-comparison">
  <div class="home-comparison__container">
    <div class="home-comparison__header">
      <h2>Why Readers Are Switching to Slax</h2>
      <p>See how we compare to traditional read-later tools</p>
    </div>

    <div class="home-comparison__table-wrap">
      <table class="home-comparison__table">
        <thead>
          <tr>
            <th>Feature</th>
            <th class="home-comparison__table--accent">Slax Reader</th>
            <th>Instapaper</th>
            <th>Readwise</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  .home-comparison {
    padding: 68px 0 100px;
    background: #ffffff;
  }

  .home-comparison__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .home-comparison__header {
    text-align: center;
    margin-bottom: 68px;
  }

  .home-comparison__header h2 {
    margin: 0 0 24px;
    font-size: clamp(2rem, 4vw, 2.5rem);
    color: #1f1f1f;
  }

  .home-comparison__header p {
    margin: 0;
    font-size: 1.125rem;
    color: #333333;
  }

  .home-comparison__table-wrap {
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
  }

  .home-comparison__table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
  }

  .home-comparison__table th,
  .home-comparison__table td {
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #ecf0f5;
    vertical-align: top;
  }

  .home-comparison__table th {
    background: #f8f9fa;
    color: #1f1f1f;
    font-weight: 700;
  }

  .home-comparison__table--accent {
    color: #16b998;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add apps/reader-home/src/components/home/HomeComparison.astro
git commit -m "feat(reader-home): add homepage comparison section"
```

---

### Task 5: 创建 HomeCTA.astro

**Files:**
- Create: `apps/reader-home/src/components/home/HomeCTA.astro`

- [ ] **Step 1: 创建 CTA 组件文件**

```astro
<section class="home-cta">
  <div class="home-cta__container">
    <div class="home-cta__header">
      <h2>Start Your Intelligent Reading Journey Today</h2>
      <p>Read smarter, learn faster, remember more</p>
    </div>
    <a class="home-cta__button" href="/reader/download">
      <span>Get Started - It&apos;s Free</span>
      <span aria-hidden="true">→</span>
    </a>
  </div>
</section>

<style>
  .home-cta {
    padding: 68px 0 80px;
    background: linear-gradient(180deg, #2eb396 0%, #5edda8 100%);
  }

  .home-cta__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
  }

  .home-cta__header {
    margin-bottom: 40px;
  }

  .home-cta__header h2 {
    margin: 0 0 24px;
    font-size: clamp(2rem, 4vw, 2.5rem);
    color: #ffffff;
  }

  .home-cta__header p {
    margin: 0;
    color: #ffffff;
    font-size: 1.125rem;
  }

  .home-cta__button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 0 28px;
    border-radius: 6px;
    background: #ffffff;
    color: #1f1f1f;
    text-decoration: none;
    font-weight: 700;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .home-cta__button:hover {
    transform: translateY(-2px);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.16);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add apps/reader-home/src/components/home/HomeCTA.astro
git commit -m "feat(reader-home): add homepage cta section"
```

---

### Task 6: 重写首页入口 index.mdx

**Files:**
- Modify: `apps/reader-home/src/content/docs/index.mdx`

- [ ] **Step 1: 将 index.mdx 完整替换为以下内容**

```mdx
---
title: Slax Reader — Read Smarter, Not Just Later
description: Save Forever, Learn faster. Your intelligent library for high efficiency and deep undersatanding.
template: splash
head:
  - tag: style
    content: '.main-pane { max-width: 100% !important; } .sl-container { max-width: 100% !important; padding-inline: 0 !important; }'
---

import HomeCTA from '~/components/home/HomeCTA.astro';
import HomeComparison from '~/components/home/HomeComparison.astro';
import HomeFeatures from '~/components/home/HomeFeatures.astro';
import HomeHero from '~/components/home/HomeHero.astro';
import HomeHowItWorks from '~/components/home/HomeHowItWorks.astro';

<HomeHero />
<HomeFeatures />
<HomeHowItWorks />
<HomeComparison />
<HomeCTA />
```

- [ ] **Step 2: 运行开发服务器验证页面渲染**

Run:
```bash
cd /Users/kassia1/Desktop/Reader/slax-home/apps/reader-home && pnpm dev
```

Expected:
- dev server starts successfully
- `http://localhost:4322/reader/` renders 5 sections
- no Astro/TypeScript errors in terminal

- [ ] **Step 3: Commit**

```bash
git add apps/reader-home/src/content/docs/index.mdx apps/reader-home/src/components/home
git commit -m "feat(reader-home): rebuild homepage from old site structure"
```

---

## 成功标准核对

- [ ] 首页渲染出 Hero、Features、How It Works、Comparison、CTA 五个区块
- [ ] 文案按当前 spec，而不是旧 Vue 原文案
- [ ] 所有 CTA 跳转 `/reader/download`
- [ ] 桌面端为多列布局，移动端自动堆叠
- [ ] 页面使用 Reader 品牌绿色和 STYLE.md 圆角/阴影规范
- [ ] dev server 无报错

---

## Self-review

- Spec coverage: 已覆盖 5 个区块和 index.mdx 重写，成功标准均有对应任务。
- Placeholder scan: 无 TBD/TODO，无“自行实现”之类空指令。
- Type consistency: 组件名、文件路径、入口引用保持一致。
