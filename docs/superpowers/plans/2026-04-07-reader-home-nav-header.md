# reader-home 顶栏导航 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 reader-home 顶栏加入可配置的导航链接区域，支持普通链接和下拉菜单，现有顶栏功能全部保留。

**Architecture:** 新增 `src/config/nav.ts` 作为唯一配置入口，新增 `src/components/NavHeader.astro` 覆盖 Starlight 的 Header 组件。NavHeader 复用 Starlight 所有内置子组件（SiteTitle、Search、SocialIcons、ThemeSelect、LanguageSelect），在 SiteTitle 和 Search 之间插入 navItems 渲染区域。

**Tech Stack:** Astro 6, Starlight 0.38, TypeScript strict

---

## 文件清单

| 操作 | 路径 |
|------|------|
| 新增 | `apps/reader-home/src/config/nav.ts` |
| 新增 | `apps/reader-home/src/components/NavHeader.astro` |
| 修改 | `apps/reader-home/astro.config.mjs` |
| 修改（可选清理）| `apps/reader-home/astro.config.mjs` sidebar 配置 |

---

## Task 1: 创建 nav.ts 配置文件

**Files:**
- Create: `apps/reader-home/src/config/nav.ts`

- [ ] **Step 1: 创建配置文件**

```ts
// apps/reader-home/src/config/nav.ts

export type NavLink = {
  label: string;
  href: string;
  translations?: Record<string, string>;
};

export type NavDropdown = {
  label: string;
  translations?: Record<string, string>;
  children: NavLink[];
};

export type NavItem = NavLink | NavDropdown;

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return 'children' in item;
}

export const navItems: NavItem[] = [
  {
    label: 'Pricing',
    translations: { 'zh-CN': '定价' },
    href: '/reader/pricing',
  },
  // 新增普通链接示例：
  // { label: 'Download', translations: { 'zh-CN': '下载' }, href: '/reader/download' },
  //
  // 新增下拉菜单示例：
  // {
  //   label: 'Guides',
  //   translations: { 'zh-CN': '指南' },
  //   children: [
  //     { label: 'Tutorials', href: '/reader/guides/example' },
  //     { label: 'Blog', href: '/reader/blog' },
  //   ],
  // },
];
```

- [ ] **Step 2: 确认文件存在**

```bash
ls apps/reader-home/src/config/nav.ts
```

Expected: 文件路径输出，无报错

- [ ] **Step 3: Commit**

```bash
git add apps/reader-home/src/config/nav.ts
git commit -m "feat(reader-home): add nav config"
```

---

## Task 2: 创建 NavHeader.astro 组件

**Files:**
- Create: `apps/reader-home/src/components/NavHeader.astro`

- [ ] **Step 1: 创建组件**

```astro
---
// apps/reader-home/src/components/NavHeader.astro
import config from 'virtual:starlight/user-config';
import LanguageSelect from 'virtual:starlight/components/LanguageSelect';
import Search from 'virtual:starlight/components/Search';
import SiteTitle from 'virtual:starlight/components/SiteTitle';
import SocialIcons from 'virtual:starlight/components/SocialIcons';
import ThemeSelect from 'virtual:starlight/components/ThemeSelect';
import { navItems, isNavDropdown } from '../config/nav';

const shouldRenderSearch =
  config.pagefind ||
  config.components.Search !== '@astrojs/starlight/components/Search.astro';

// 获取当前语言，用于翻译
const lang = Astro.currentLocale ?? 'en';

function getLabel(item: { label: string; translations?: Record<string, string> }) {
  if (lang !== 'en' && item.translations) {
    // Starlight 中文 locale key 是 'zh-CN'
    return item.translations['zh-CN'] ?? item.label;
  }
  return item.label;
}

// 当前页路径，用于高亮
const currentPath = Astro.url.pathname;
---

<div class="header">
  <div class="title-wrapper sl-flex">
    <SiteTitle />
  </div>

  <!-- 自定义导航区域 -->
  <nav class="nav-items sl-hidden md:sl-flex" aria-label="Main navigation">
    {navItems.map((item) =>
      isNavDropdown(item) ? (
        <div class="nav-dropdown">
          <button class="nav-btn" aria-haspopup="true" aria-expanded="false">
            {getLabel(item)}
            <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul class="nav-dropdown-panel" role="menu">
            {item.children.map((child) => (
              <li role="none">
                <a
                  href={child.href}
                  role="menuitem"
                  class:list={['nav-dropdown-link', { active: currentPath.startsWith(child.href) }]}
                >
                  {getLabel(child)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <a
          href={item.href}
          class:list={['nav-link', { active: currentPath === item.href || currentPath === item.href + '/' }]}
        >
          {getLabel(item)}
        </a>
      )
    )}
  </nav>

  <div class="sl-flex print:hidden">
    {shouldRenderSearch && <Search />}
  </div>
  <div class="sl-hidden md:sl-flex print:hidden right-group">
    <div class="sl-flex social-icons">
      <SocialIcons />
    </div>
    <ThemeSelect />
    <LanguageSelect />
  </div>
</div>

<script>
  // 下拉菜单交互：hover + click 外部关闭
  document.querySelectorAll<HTMLElement>('.nav-dropdown').forEach((dropdown) => {
    const btn = dropdown.querySelector<HTMLButtonElement>('.nav-btn');
    const panel = dropdown.querySelector<HTMLElement>('.nav-dropdown-panel');
    if (!btn || !panel) return;

    const open = () => {
      panel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };

    dropdown.addEventListener('mouseenter', open);
    dropdown.addEventListener('mouseleave', close);
    btn.addEventListener('click', () => {
      panel.classList.contains('open') ? close() : open();
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target as Node)) close();
    });
  });
</script>

<style>
  @layer starlight.core {
    .header {
      display: flex;
      gap: var(--sl-nav-gap);
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    .title-wrapper {
      overflow: clip;
      padding: 0.25rem;
      margin: -0.25rem;
      min-width: 0;
    }

    .right-group,
    .social-icons {
      gap: 1rem;
      align-items: center;
    }

    .social-icons::after {
      content: '';
      height: 2rem;
      border-inline-end: 1px solid var(--sl-color-gray-5);
    }

    @media (min-width: 50rem) {
      :global(:root[data-has-sidebar]) {
        --__sidebar-pad: calc(2 * var(--sl-nav-pad-x));
      }
      :global(:root:not([data-has-toc])) {
        --__toc-width: 0rem;
      }
      .header {
        --__sidebar-width: max(0rem, var(--sl-content-inline-start, 0rem) - var(--sl-nav-pad-x));
        --__main-column-fr: calc(
          (
            100% + var(--__sidebar-pad, 0rem) - var(--__toc-width, var(--sl-sidebar-width)) -
            (2 * var(--__toc-width, var(--sl-nav-pad-x))) - var(--sl-content-inline-start, 0rem) -
            var(--sl-content-width)
          ) / 2
        );
        display: grid;
        grid-template-columns:
          minmax(
            calc(var(--__sidebar-width) + max(0rem, var(--__main-column-fr) - var(--sl-nav-gap))),
            auto
          )
          auto
          1fr
          auto;
        align-content: center;
      }
    }
  }

  /* ===== Nav items ===== */
  .nav-items {
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--sl-color-gray-2);
    text-decoration: none;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--sl-color-accent);
    background: color-mix(in srgb, var(--sl-color-accent) 10%, transparent);
  }

  /* ===== Dropdown ===== */
  .nav-dropdown {
    position: relative;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--sl-color-gray-2);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .nav-btn:hover {
    color: var(--sl-color-accent);
    background: color-mix(in srgb, var(--sl-color-accent) 10%, transparent);
  }

  .nav-chevron {
    transition: transform 0.2s ease;
  }

  .nav-btn[aria-expanded="true"] .nav-chevron {
    transform: rotate(180deg);
  }

  .nav-dropdown-panel {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 160px;
    background: var(--sl-color-black);
    border: 1px solid var(--sl-color-gray-6);
    border-radius: 8px;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
    padding: 6px;
    list-style: none;
    margin: 0;
    z-index: 100;
  }

  .nav-dropdown-panel.open {
    display: block;
  }

  .nav-dropdown-link {
    display: block;
    font-size: 0.875rem;
    color: var(--sl-color-gray-2);
    text-decoration: none;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .nav-dropdown-link:hover,
  .nav-dropdown-link.active {
    color: var(--sl-color-accent);
    background: color-mix(in srgb, var(--sl-color-accent) 10%, transparent);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add apps/reader-home/src/components/NavHeader.astro
git commit -m "feat(reader-home): add NavHeader component"
```

---

## Task 3: 注册 NavHeader 并清理 sidebar

**Files:**
- Modify: `apps/reader-home/astro.config.mjs`

- [ ] **Step 1: 在 components 里注册 NavHeader，并移除 sidebar 里的 Pricing 入口**

将 `astro.config.mjs` 中的 `components` 改为：

```js
components: {
  Head: './src/components/Head.astro',
  SkipLink: './src/components/SkipLink.astro',
  Header: './src/components/NavHeader.astro',
},
```

将 `sidebar` 改为（移除 Pricing 分组）：

```js
sidebar: [
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

- [ ] **Step 2: 启动 dev server 验证**

```bash
cd apps/reader-home && pnpm dev
```

在浏览器打开：
- `http://localhost:4322/reader/` — 顶栏应出现 Pricing 链接
- `http://localhost:4322/reader/zh/` — 顶栏应显示"定价"
- `http://localhost:4322/reader/pricing` — 点击 Pricing 应跳转此页
- GitHub / Twitter / 语言 / 主题切换应全部保留原位

- [ ] **Step 3: Commit**

```bash
git add apps/reader-home/astro.config.mjs
git commit -m "feat(reader-home): register NavHeader, clean up sidebar"
```

---

## 成功标准核对

- [ ] 顶栏出现 Pricing 链接，点击跳转 `/reader/pricing`
- [ ] 中文版顶栏显示"定价"，跳转 `/reader/zh/pricing`
- [ ] GitHub、Twitter、语言切换、主题切换位置不变
- [ ] sidebar 里不再出现 Pricing 分组
- [ ] dev server 正常启动，无报错
- [ ] 以后在 `nav.ts` 加一行即可新增顶栏入口
- [ ] 以后在 `nav.ts` 加 `children` 即可变为下拉菜单
