# slax-home Blog 页面实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 slax-home 添加自定义卡片式 `/blog/` 首页（Blog + Compare 双分组），把 starlight-blog 旧页面移到 `/blog2/`，并复制 4 篇正式文章进来。

**Architecture:** 把 `starlightBlog` 的 `prefix` 改为 `'blog2'`，旧示例文章随之迁移到 `blog2/` 目录。新建 `BlogIndex.astro`（改编自 reader-home 版本）作为 `/blog/` 的卡片首页，文章详情页走 Starlight 标准渲染；sidebar 配置 Blog/Compare 分组便于导航。

**Tech Stack:** Astro 6, Starlight 0.38, starlight-blog 0.26, pnpm monorepo, TypeScript

---

## 文件变更总览

| 操作 | 路径 |
|------|------|
| Modify | `apps/slax-home/astro.config.mjs` |
| Move   | `content/docs/blog/*.mdx` → `content/docs/blog2/*.mdx`（4 个示例文件） |
| Move   | `content/docs/zh/blog/*.mdx` → `content/docs/zh/blog2/*.mdx`（4 个） |
| Create | `apps/slax-home/src/components/BlogIndex.astro` |
| Create | `apps/slax-home/src/content/docs/blog/index.mdx` |
| Create | `apps/slax-home/src/content/docs/blog/a-smarter-more-efficient-ai-powered-way-to-save-and-read-forever.mdx` |
| Create | `apps/slax-home/src/content/docs/blog/built-an-open-source-pocket-alternative.mdx` |
| Create | `apps/slax-home/src/content/docs/blog/built-an-open-source-tool-to-save-content-permanently-and-simplify-learning.mdx` |
| Create | `apps/slax-home/src/content/docs/compare/slax-reader-vs-instapaper.mdx` |
| Verify | `apps/slax-home/src/content.config.ts`（确认 tags 支持） |

---

## Task 1: 迁移示例文章到 blog2/，修改 starlightBlog prefix

**Files:**
- Modify: `apps/slax-home/astro.config.mjs:175-188`
- Move: `content/docs/blog/{building-a-second-brain,five-habits-focused-readers,how-slax-is-built,test-blog}.mdx` → `content/docs/blog2/`
- Move: `content/docs/zh/blog/{building-a-second-brain,five-habits-focused-readers,how-slax-is-built,test-blog}.mdx` → `content/docs/zh/blog2/`

- [ ] **Step 1: 创建 blog2/ 目录并迁移文件**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home/apps/slax-home/src/content/docs

mkdir -p blog2 zh/blog2

mv blog/building-a-second-brain.mdx blog2/
mv blog/five-habits-focused-readers.mdx blog2/
mv blog/how-slax-is-built.mdx blog2/
mv blog/test-blog.mdx blog2/

mv zh/blog/building-a-second-brain.mdx zh/blog2/
mv zh/blog/five-habits-focused-readers.mdx zh/blog2/
mv zh/blog/how-slax-is-built.mdx zh/blog2/
mv zh/blog/test-blog.mdx zh/blog2/
```

- [ ] **Step 2: 修改 astro.config.mjs 中的 starlightBlog prefix**

在 `apps/slax-home/astro.config.mjs` 第 175 行找到 `starlightBlog({`，在其配置对象中添加 `prefix: 'blog2'`：

```js
starlightBlog({
  prefix: 'blog2',          // ← 新增这一行
  title: {
    'zh-CN': '我的博客',
    en: 'My Blog',
  },
  authors: {
    daguang: {
      name: 'Daguang',
      title: '开发者',
    },
  },
  postCount: 10,
  recentPostCount: 5,
}),
```

- [ ] **Step 3: 在 sidebar 加 Blog 和 Compare 分组**

在 `apps/slax-home/astro.config.mjs`，找到 `sidebar: [` 数组，在数组**最前面**插入两个分组：

```js
sidebar: [
  {
    label: 'Blog',
    autogenerate: { directory: 'blog' },
  },
  {
    label: 'Compare',
    autogenerate: { directory: 'compare' },
  },
  {
    label: 'Guides',
    translations: { 'zh-CN': '指南' },
    items: [
      {
        label: 'Example Guide',
        translations: { 'zh-CN': '示例指南' },
        slug: 'guides/example',
      },
    ],
  },
  {
    label: 'Reference',
    translations: { 'zh-CN': '参考' },
    autogenerate: { directory: 'reference' },
  },
],
```

- [ ] **Step 4: 验证 dev server 启动无报错**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home/apps/slax-home
pnpm dev
```

预期：终端无红色报错，`/blog2/` 可访问（旧 starlight-blog 列表）。

- [ ] **Step 5: Commit**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home
git add apps/slax-home/astro.config.mjs \
        apps/slax-home/src/content/docs/blog2/ \
        apps/slax-home/src/content/docs/zh/blog2/ \
        apps/slax-home/src/content/docs/blog/ \
        apps/slax-home/src/content/docs/zh/blog/
git commit -m "feat(slax-home): move example articles to blog2, change starlightBlog prefix"
```

---

## Task 2: 确认 content.config.ts 支持 tags 字段

**Files:**
- Verify/Modify: `apps/slax-home/src/content.config.ts`

- [ ] **Step 1: 查看当前 content.config.ts**

```bash
cat /Users/kassia1/Desktop/Reader/slax-home/apps/slax-home/src/content.config.ts
```

当前内容应为：
```ts
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
```

- [ ] **Step 2: 确认 blogSchema 是否含 tags**

starlight-blog 的 `blogSchema` 已包含 `tags: z.array(z.string()).optional()`。  
**如果** dev server 启动时出现 `Unknown field "tags"` 的警告，则修改 `content.config.ts`：

```ts
import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context).extend({
        tags: z.array(z.string()).optional(),
      }),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
```

若无警告，则无需修改，直接进入 Task 3。

---

## Task 3: 创建 BlogIndex.astro（slax-home 版本）

**Files:**
- Create: `apps/slax-home/src/components/BlogIndex.astro`

- [ ] **Step 1: 创建 BlogIndex.astro**

创建文件 `apps/slax-home/src/components/BlogIndex.astro`，内容如下：

```astro
---
// BlogIndex — 双列卡片 + tag 筛选 + Blog/Compare 分组 + more 折叠
import { getCollection } from 'astro:content';

const allDocs = await getCollection('docs');

function formatDate(date: Date | string | undefined) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function postUrl(id: string) {
  // slax-home 文章 URL：直接 /blog/xxx/ 或 /compare/xxx/
  return '/' + id.replace(/\.mdx?$/, '') + '/';
}

const blogPosts = allDocs
  .filter(p => p.id.startsWith('blog/') && !p.id.endsWith('index.mdx'))
  .sort((a, b) => new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime());

const comparePosts = allDocs
  .filter(p => p.id.startsWith('compare/') && !p.id.endsWith('index.mdx'))
  .sort((a, b) => new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime());

// 收集所有出现过的 tags（除 all）
const allTags = [...new Set([
  ...blogPosts.flatMap(p => p.data.tags ?? []),
  ...comparePosts.flatMap(p => p.data.tags ?? []),
])];
---

<div class="bi">

  <!-- Tag 筛选栏 -->
  <div class="bi__filters" role="group" aria-label="Filter by tag">
    <button class="bi__tag bi__tag--active" data-tag="all">All</button>
    {allTags.map(tag => (
      <button class="bi__tag" data-tag={tag}>
        {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </button>
    ))}
  </div>

  <!-- Blog section -->
  <section class="bi__section" data-section="blog">
    <h2 class="bi__section-title">Blog</h2>
    <div class="bi__grid" id="blog-grid">
      {blogPosts.map((post, i) => (
        <a
          class="bi__card"
          href={postUrl(post.id)}
          data-tags={(post.data.tags ?? []).join(',')}
          data-index={i}
        >
          <div class="bi__card-body">
            {post.data.date && (
              <time class="bi__card-date">
                {formatDate(post.data.date)}
              </time>
            )}
            <h3 class="bi__card-title">{post.data.title}</h3>
            {post.data.description && (
              <p class="bi__card-desc">{post.data.description}</p>
            )}
          </div>
          <span class="bi__card-cta">Read more →</span>
        </a>
      ))}
    </div>
    <button class="bi__more" id="blog-more" style="display:none" data-target="blog-grid">
      ↓ Show more
    </button>
  </section>

  <!-- Compare section -->
  <section class="bi__section" data-section="compare">
    <h2 class="bi__section-title">Compare</h2>
    <div class="bi__grid" id="compare-grid">
      {comparePosts.map((post, i) => (
        <a
          class="bi__card"
          href={postUrl(post.id)}
          data-tags={(post.data.tags ?? []).join(',')}
          data-index={i}
        >
          <div class="bi__card-body">
            {post.data.date && (
              <time class="bi__card-date">
                {formatDate(post.data.date)}
              </time>
            )}
            <h3 class="bi__card-title">{post.data.title}</h3>
            {post.data.description && (
              <p class="bi__card-desc">{post.data.description}</p>
            )}
          </div>
          <span class="bi__card-cta">Read more →</span>
        </a>
      ))}
    </div>
    <button class="bi__more" id="compare-more" style="display:none" data-target="compare-grid">
      ↓ Show more
    </button>
  </section>

</div>

<script>
  const SHOW_LIMIT = 4;

  function applyFilter(tag: string) {
    document.querySelectorAll<HTMLButtonElement>('.bi__tag').forEach(btn => {
      btn.classList.toggle('bi__tag--active', btn.dataset.tag === tag);
    });

    document.querySelectorAll<HTMLElement>('.bi__section').forEach(section => {
      const grid = section.querySelector<HTMLElement>('.bi__grid');
      const moreBtn = section.querySelector<HTMLButtonElement>('.bi__more');
      if (!grid || !moreBtn) return;

      const cards = Array.from(grid.querySelectorAll<HTMLElement>('.bi__card'));

      const matched = cards.filter(card => {
        if (tag === 'all') return true;
        const tags = (card.dataset.tags ?? '').split(',').map(t => t.trim());
        return tags.includes(tag);
      });

      cards.forEach(card => {
        const isMatch = matched.includes(card);
        if (isMatch) {
          card.dataset.filtered = 'show';
        } else {
          card.dataset.filtered = 'hide';
          card.style.display = 'none';
        }
      });

      applyMore(grid, moreBtn, matched);

      section.style.display = matched.length === 0 ? 'none' : '';
    });
  }

  function applyMore(
    grid: HTMLElement,
    moreBtn: HTMLButtonElement,
    matched: HTMLElement[]
  ) {
    const expanded = moreBtn.dataset.expanded === 'true';

    matched.forEach((card, i) => {
      card.style.display = (!expanded && i >= SHOW_LIMIT) ? 'none' : '';
    });

    if (matched.length > SHOW_LIMIT) {
      moreBtn.style.display = '';
      moreBtn.textContent = expanded ? '↑ Show less' : '↓ Show more';
    } else {
      moreBtn.style.display = 'none';
    }
  }

  document.querySelectorAll<HTMLButtonElement>('.bi__more').forEach(btn => {
    btn.addEventListener('click', () => {
      const gridId = btn.dataset.target!;
      const grid = document.getElementById(gridId)!;
      const expanded = btn.dataset.expanded === 'true';
      btn.dataset.expanded = expanded ? 'false' : 'true';

      const matched = Array.from(
        grid.querySelectorAll<HTMLElement>('.bi__card[data-filtered="show"]')
      );
      applyMore(grid, btn, matched);
    });
  });

  document.querySelectorAll<HTMLButtonElement>('.bi__tag').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll<HTMLButtonElement>('.bi__more').forEach(m => {
        m.dataset.expanded = 'false';
      });
      applyFilter(btn.dataset.tag!);
    });
  });

  applyFilter('all');
</script>

<style>
  .bi {
    width: 100%;
    max-width: 1100px;
    margin-inline: auto;
    padding: 48px 40px 80px;
    font-family: var(--sl-font);
  }

  .bi__filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .bi__tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0 20px;
    border-radius: 999px;
    border: 1.5px solid #d0ece8;
    background: #fff;
    color: #4a6b68;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
    font-family: var(--sl-font);
  }

  .bi__tag:hover {
    border-color: #16b998;
    color: #16b998;
  }

  .bi__tag--active {
    background: #16b998;
    border-color: #16b998;
    color: #fff;
  }

  .bi__section {
    margin-bottom: 56px;
  }

  .bi__section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111;
    -webkit-text-fill-color: #111;
    background: none !important;
    margin: 0 0 20px !important;
    padding: 0 !important;
    border: none !important;
    letter-spacing: -0.01em;
  }

  .bi__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .bi__card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    padding: 28px 24px;
    border-radius: 14px;
    border: 1.5px solid #e8f5f2;
    background: #fafffe;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.25s ease,
      border-color 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .bi__card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1.2rem;
    right: 1.2rem;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: linear-gradient(90deg, #16b998, #4ecacd);
    opacity: 0;
    transform: scaleX(0);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .bi__card:hover {
    transform: translateY(-3px);
    border-color: #a3ede0;
    box-shadow: 0 16px 40px rgba(22, 185, 152, 0.12);
  }

  .bi__card:hover::after {
    opacity: 1;
    transform: scaleX(1);
  }

  .bi__card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .bi__card-date {
    font-size: 0.75rem;
    font-weight: 600;
    color: #16b998;
    -webkit-text-fill-color: #16b998;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .bi__card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111;
    -webkit-text-fill-color: #111;
    background: none !important;
    line-height: 1.45;
    margin: 0 !important;
    border: none !important;
    padding: 0 !important;
  }

  .bi__card-desc {
    font-size: 0.85rem;
    color: #5a7a77;
    line-height: 1.65;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bi__card-cta {
    font-size: 0.82rem;
    font-weight: 600;
    color: #16b998;
    -webkit-text-fill-color: #16b998;
  }

  .bi__more {
    display: block;
    margin: 16px auto 0;
    padding: 8px 24px;
    border-radius: 999px;
    border: 1.5px solid #d0ece8;
    background: #fff;
    color: #16b998;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    font-family: var(--sl-font);
    transition: background 0.18s ease, border-color 0.18s ease;
  }

  .bi__more:hover {
    background: #f0fff9;
    border-color: #16b998;
  }

  @media (max-width: 720px) {
    .bi {
      padding: 32px 20px 56px;
    }
    .bi__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home
git add apps/slax-home/src/components/BlogIndex.astro
git commit -m "feat(slax-home): add BlogIndex component for custom /blog/ card page"
```

---

## Task 4: 创建 /blog/ 首页入口 MDX

**Files:**
- Create: `apps/slax-home/src/content/docs/blog/index.mdx`

- [ ] **Step 1: 创建 blog/index.mdx**

创建文件 `apps/slax-home/src/content/docs/blog/index.mdx`：

```mdx
---
title: Blog — Slax
description: Guides, deep dives, and insights on building a smarter reading and note-taking habit with Slax.
template: splash
head:
  - tag: style
    content: 'h1#_top { display: none !important; } .main-pane > .content-panel:first-child { display: none !important; } .main-pane > .content-panel:not(:first-child) { border-top: none !important; } .sl-container { max-width: 100% !important; padding-inline: 0 !important; } .content-panel { padding-block: 0 !important; } .page { background: #ffffff !important; }'
---

import BlogIndex from '~/components/BlogIndex.astro';

<BlogIndex />
```

- [ ] **Step 2: 在浏览器验证 /blog/ 渲染**

访问 `http://localhost:4321/blog/`，预期：
- 页面显示自定义卡片布局（无 Starlight 默认 h1 标题）
- Blog section 存在（暂无文章卡片，因文章还未复制）
- Compare section 存在（同上）
- Tag 筛选栏显示 "All" 按钮

- [ ] **Step 3: Commit**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home
git add apps/slax-home/src/content/docs/blog/index.mdx
git commit -m "feat(slax-home): add /blog/ index page with custom card layout"
```

---

## Task 5: 复制 3 篇 Blog 文章到 slax-home

**Files:**
- Create: `apps/slax-home/src/content/docs/blog/a-smarter-more-efficient-ai-powered-way-to-save-and-read-forever.mdx`
- Create: `apps/slax-home/src/content/docs/blog/built-an-open-source-pocket-alternative.mdx`
- Create: `apps/slax-home/src/content/docs/blog/built-an-open-source-tool-to-save-content-permanently-and-simplify-learning.mdx`

- [ ] **Step 1: 复制文章文件**

```bash
READER_BLOG=/Users/kassia1/Desktop/Reader/slax-home/apps/reader-home/src/content/docs/blog
SLAX_BLOG=/Users/kassia1/Desktop/Reader/slax-home/apps/slax-home/src/content/docs/blog

cp "$READER_BLOG/a-smarter-more-efficient-ai-powered-way-to-save-and-read-forever.mdx" "$SLAX_BLOG/"
cp "$READER_BLOG/built-an-open-source-pocket-alternative.mdx" "$SLAX_BLOG/"
cp "$READER_BLOG/built-an-open-source-tool-to-save-content-permanently-and-simplify-learning.mdx" "$SLAX_BLOG/"
```

- [ ] **Step 2: 检查 frontmatter 兼容性**

```bash
head -8 "$SLAX_BLOG/a-smarter-more-efficient-ai-powered-way-to-save-and-read-forever.mdx"
```

预期看到 `title`, `description`, `date`, `tags` 四个字段。这些字段 slax-home 的 schema 全部支持。

- [ ] **Step 3: 验证 /blog/ 卡片页显示 3 张 Blog 卡片**

访问 `http://localhost:4321/blog/`，预期：
- Blog section 出现 3 张卡片，标题与文章 title 一致
- 点击任一卡片，进入文章详情页（Starlight 标准渲染），URL 形如 `/blog/a-smarter.../`
- Sidebar 左侧显示 Blog 分组，其中列出 3 篇文章

- [ ] **Step 4: Commit**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home
git add apps/slax-home/src/content/docs/blog/
git commit -m "feat(slax-home): add 3 blog articles from reader-home"
```

---

## Task 6: 复制 Compare 文章到 slax-home

**Files:**
- Create: `apps/slax-home/src/content/docs/compare/slax-reader-vs-instapaper.mdx`

- [ ] **Step 1: 创建 compare/ 目录并复制文章**

```bash
mkdir -p /Users/kassia1/Desktop/Reader/slax-home/apps/slax-home/src/content/docs/compare

cp /Users/kassia1/Desktop/Reader/slax-home/apps/reader-home/src/content/docs/compare/slax-reader-vs-instapaper.mdx \
   /Users/kassia1/Desktop/Reader/slax-home/apps/slax-home/src/content/docs/compare/
```

- [ ] **Step 2: 验证 /blog/ 卡片页 Compare section 出现**

访问 `http://localhost:4321/blog/`，预期：
- Compare section 出现 1 张卡片："Slax Reader vs. Instapaper: More Than Saving, Built for Knowing"
- Tag 筛选栏出现 "Reader" 按钮（来自文章 `tags: ['reader']`）
- 点击 "Reader" 筛选，Blog（3 张）和 Compare（1 张）全部保留
- 点击卡片进入 `/compare/slax-reader-vs-instapaper/`，Starlight 正常渲染文章

- [ ] **Step 3: 验证 Tag 筛选逻辑**

- 点击 "All" → Blog 3 张 + Compare 1 张全部显示
- 点击 "Reader" → 同上（因为所有文章都有 reader tag）
- Sidebar 左侧显示 Blog 分组 + Compare 分组（各自可折叠）

- [ ] **Step 4: Commit**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home
git add apps/slax-home/src/content/docs/compare/
git commit -m "feat(slax-home): add compare articles directory and slax-reader-vs-instapaper"
```

---

## Task 7: 构建验证 + 推送

**Files:** 无新文件，只验证

- [ ] **Step 1: 完整构建**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home/apps/slax-home
pnpm build
```

预期：零报错，zero warnings about unknown frontmatter fields。

- [ ] **Step 2: 如果出现 tags unknown field 警告**

若有 `Unknown field "tags"` 警告，按 Task 2 Step 2 的方案修改 `content.config.ts`，再重新 build：

```bash
pnpm build
```

- [ ] **Step 3: 推送**

```bash
cd /Users/kassia1/Desktop/Reader/slax-home
git push origin feature/slax-home
```

---

## 自检报告

**Spec 覆盖确认：**
- ✅ starlightBlog prefix → Task 1
- ✅ 旧示例文章迁移到 blog2/ → Task 1
- ✅ sidebar Blog/Compare 分组 → Task 1
- ✅ blogSchema tags 兼容性 → Task 2
- ✅ BlogIndex.astro 创建（slax-home 版 URL）→ Task 3
- ✅ /blog/ index.mdx → Task 4
- ✅ 3 篇 Blog 文章复制 → Task 5
- ✅ 1 篇 Compare 文章复制 → Task 6
- ✅ pnpm build 零报错 → Task 7

**Placeholder 扫描：** 无 TBD / TODO / "similar to above"

**类型一致性：** `postUrl(id)` 函数在 Task 3 定义并在同文件内使用，无跨任务调用问题；`blogPosts`/`comparePosts`/`allTags` 变量名在 BlogIndex.astro 内部保持一致。
