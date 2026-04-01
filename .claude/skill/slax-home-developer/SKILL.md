---
name: slax-home-developer
description: Slax 官网开发技能。当开发、维护 Slax 官网（Astro + Starlight monorepo）时使用，包括博客编写、文档维护、组件开发、SEO 配置等。
user-invocable: true
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

你是 Slax 官网的开发助手。在进行任何开发工作前，请先阅读以下配套文件以了解完整规范：

- `CODE.md`（同目录）：编码规范、Frontmatter 字段说明、Git 提交规范、构建检查清单
- `STYLE.md`（同目录）：UI 色彩规范、圆角/阴影/间距/按钮/表单样式标准

## 项目概述

Slax 官网是基于 **Astro 6 + Starlight** 的 pnpm monorepo，托管在 `https://slax.com`，包含三个子站：

| 子应用 | 路径 | 开发端口 | 说明 |
|--------|------|------|------|
| `slax-home` | `/` | 4321 | 主站 + 博客（Starlight + starlight-blog） |
| `reader-home` | `/reader` | 4322 | Slax Reader 文档站 |
| `note-home` | `/note` | 4323 | Slax Note 文档站 |

## 技术栈

- **框架**：Astro ^6.0.1 + Starlight ^0.38.2
- **博客**：starlight-blog（仅 slax-home）
- **包管理**：pnpm workspace
- **语言**：TypeScript strict
- **图像**：sharp
- **SEO**：schema-dts（JSON-LD 类型）、@astrojs/sitemap
- **部署**：SSG，`script/build.sh` 合并三站输出到 `dist/`

## 项目结构

```
slax-home-page/
├── apps/
│   ├── slax-home/                # 主站
│   │   ├── astro.config.mjs
│   │   ├── src/
│   │   │   ├── content.config.ts # 内容集合（docsSchema + blogSchema）
│   │   │   ├── content/
│   │   │   │   ├── docs/         # 英文内容
│   │   │   │   │   ├── index.mdx
│   │   │   │   │   ├── blog/     # 博客文章
│   │   │   │   │   ├── guides/
│   │   │   │   │   └── reference/
│   │   │   │   └── i18n/
│   │   │   └── components/
│   │   │       └── Head.astro    # 自定义 SEO Head（JSON-LD）
│   │   └── public/
│   │       ├── admin/            # CMS（TinaCMS）
│   │       └── robots.txt
│   ├── reader-home/
│   └── note-home/
├── public/skill/slax-home-developer/  # 本 Skill
├── script/build.sh                    # 合并构建脚本
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

## 关键开发规则

### 内容编写

1. 日期使用 ISO 8601：`2026-03-30T00:00:00.000Z`
2. 图片走 CDN：`https://static-cdn.slax.com/...`
3. 草稿设为 `draft: true`，生产自动排除
4. Frontmatter 字段详见 `CODE.md`

### 站点配置

1. 新增页面后检查 `sidebar` 配置
2. Vite proxy 仅限开发环境
3. 静态资源放对应子站的 `public/`
4. 覆盖 Starlight 组件通过 `components` 选项

### 构建部署

1. `pnpm dev`：并行启动三站
2. `pnpm build`：构建并合并到 `dist/`
3. `pnpm preview`：预览产物
4. 构建脚本自动合并 sitemap

### SEO

- 博客页 → `BlogPosting` JSON-LD（含 `datePublished`）
- 普通页 → `WebPage` JSON-LD
- 自动生成 `BreadcrumbList`
- robots.txt 屏蔽 AI 爬虫（GPTBot, ClaudeBot 等）

### Astro 最佳实践

1. 默认零 JS，仅需交互时加 `client:*` 指令
2. Content Collections 通过 `content.config.ts` + Zod 验证
3. MDX 中可用 Starlight 组件（Card, CardGrid, Tabs）
4. 图像优化用 `astro:assets` 的 `<Image>` 组件
