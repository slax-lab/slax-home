# Slax Home

Slax 官网及产品文档站点的 monorepo，基于 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 构建，部署于 `https://slax.com`。

## 项目概览

本仓库包含三个子站点，构建后合并为一个统一的静态站点：

| 应用 | 路径 | 说明 | 开发端口 |
|------|------|------|----------|
| `apps/slax-home` | `/` | Slax 主站 & 博客 | 4321 |
| `apps/reader-home` | `/reader` | Slax Reader 文档 | 4322 |
| `apps/note-home` | `/note` | Slax Note 文档 | 4323 |

所有站点均支持 **英文** 和 **简体中文** 双语。

## 技术栈

- **框架**: Astro + Starlight
- **内容格式**: MDX / Markdown（基于内容集合驱动路由）
- **博客**: starlight-blog（仅主站）
- **包管理**: pnpm workspace
- **代码质量**: Biome（lint + format）+ Husky（pre-commit）
- **SEO**: @astrojs/sitemap、Open Graph、JSON-LD 结构化数据
- **分析**: Google Tag Manager（可选）
- **图像处理**: sharp

## 项目结构

```
slax-home/
├── apps/
│   ├── slax-home/              # 主站 + 博客
│   │   ├── src/
│   │   │   ├── components/     # 自定义 Astro 组件
│   │   │   │   ├── Head.astro          # 自定义 <head>（SEO/GTM）
│   │   │   │   ├── SkipLink.astro      # 无障碍跳转链接
│   │   │   │   ├── CallToAction.astro  # CTA 区块
│   │   │   │   ├── FeatureCard.astro   # 功能特性卡片
│   │   │   │   ├── FeatureGrid.astro   # 功能特性网格
│   │   │   │   ├── Highlight.astro     # 高亮展示区块
│   │   │   │   ├── ProductCard.astro   # 产品卡片
│   │   │   │   ├── ProductGrid.astro   # 产品网格
│   │   │   │   ├── Testimonial.astro   # 用户评价
│   │   │   │   └── TextImage.astro     # 图文混排
│   │   │   ├── content/
│   │   │   │   ├── docs/               # 英文页面 & 博客
│   │   │   │   │   ├── blog/           # 英文博客文章
│   │   │   │   │   ├── guides/         # 英文指南
│   │   │   │   │   ├── reference/      # 英文参考文档
│   │   │   │   │   ├── index.mdx       # 主站首页
│   │   │   │   │   └── 404.mdx
│   │   │   │   │   └── zh/             # 中文页面（结构同上）
│   │   │   │   └── i18n/               # 国际化翻译
│   │   │   │       ├── en.json
│   │   │   │       └── zh-CN.json
│   │   │   ├── styles/
│   │   │   │   ├── custom.css          # 全局样式覆盖
│   │   │   │   ├── landing.css         # 落地页样式
│   │   │   │   └── blog.css            # 博客页样式
│   │   │   └── content.config.ts       # 内容集合配置
│   │   ├── astro.config.mjs
│   │   └── public/
│   ├── reader-home/            # Slax Reader 文档站
│   └── note-home/              # Slax Note 文档站
├── docs/
│   ├── dev-guide.md            # 开发参考手册
│   └── style-guide.md          # 样式规范指南
├── script/
│   └── build.sh                # 构建 & 合并脚本
├── public/                     # 全局静态资源（favicon 等）
├── biome.json                  # Biome lint/format 配置
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

该命令会并行启动全部三个子站点。主站（`localhost:4321`）已配置反向代理，自动将 `/reader` 和 `/note` 请求转发到对应子站，因此只需访问 `http://localhost:4321` 即可获得与生产环境一致的浏览体验。

### 构建

```bash
pnpm build
```

构建流程（`script/build.sh`）：

1. 并行构建全部三个 Astro 应用
2. 将各应用的构建产物合并到根目录 `dist/`
3. 生成统一的 `sitemap-index.xml`，引用各子站的 sitemap

### 预览

```bash
pnpm preview
```

使用 `serve` 在本地预览合并后的构建产物。

## 代码质量

项目使用 [Biome](https://biomejs.dev/) 进行 lint 和格式化，Husky 在提交前自动运行 lint-staged。

```bash
pnpm lint          # 检查代码
pnpm lint:fix      # 自动修复
pnpm format        # 格式化代码
```

## 环境变量

| 变量名 | 说明 | 是否必须 |
|--------|------|----------|
| `PUBLIC_GTM_ID` | Google Tag Manager 容器 ID | 否 |

> 如不配置 `PUBLIC_GTM_ID`，GTM 相关脚本不会注入页面。

## 添加内容

### 落地页组件

主站提供一套预置的落地页组件（位于 `apps/slax-home/src/components/`），可在 MDX 页面中直接引入使用：

```mdx
import CallToAction from '../../components/CallToAction.astro'
import FeatureGrid from '../../components/FeatureGrid.astro'
import TextImage from '../../components/TextImage.astro'
```

### 文档页面

在对应应用的 `src/content/docs/` 目录下创建 `.mdx` 文件：

```
apps/slax-home/src/content/docs/guides/new-guide.mdx      # 英文
apps/slax-home/src/content/docs/zh/guides/new-guide.mdx   # 中文
```

新增页面后，如需出现在侧边栏，在 `apps/slax-home/astro.config.mjs` 的 `sidebar` 配置中添加对应条目。

### 博客文章（仅主站）

在 `apps/slax-home/src/content/docs/blog/` 目录下创建 `.mdx` 文件，frontmatter 示例：

```yaml
---
title: 文章标题
date: 2026-01-01
tags: [标签1, 标签2]
authors: [daguang]
# draft: true       # 草稿，不会发布
# featured: true    # 精选文章
# cover:
#   alt: 封面描述
#   image: ./cover.png
---
```

中文版本放在 `src/content/docs/zh/blog/` 目录下，文件名保持一致。

### 国际化

UI 翻译文件位于各应用的 `src/content/i18n/` 目录：

- `en.json` — 英文
- `zh-CN.json` — 简体中文

### 样式定制

| 文件 | 用途 |
|------|------|
| `src/styles/custom.css` | 全局 Starlight 样式变量覆盖 |
| `src/styles/landing.css` | 主站落地页专用样式 |
| `src/styles/blog.css` | 博客页面专用样式 |

## 开发文档

- [dev-guide.md](docs/dev-guide.md) — 开发参考手册（页面、博客创建快速参考）
- [style-guide.md](docs/style-guide.md) — 样式规范指南

## 部署

构建完成后，将根目录 `dist/` 作为静态站点部署即可。站点结构：

```
dist/
├── index.html              # 主站首页
├── zh/                     # 中文页面
├── blog/                   # 博客
├── guides/                 # 指南
├── reference/              # 参考文档
├── reader/                 # Reader 文档
├── note/                   # Note 文档
├── pagefind/               # 全站搜索索引
├── sitemap-index.xml       # 统一 sitemap 入口
├── sitemap-home-index.xml  # 主站 sitemap
├── robots.txt
└── 404.html
```

## 相关链接

- [Astro 文档](https://docs.astro.build)
- [Starlight 文档](https://starlight.astro.build)
- [Biome 文档](https://biomejs.dev)
- [GitHub](https://github.com/slax-lab)
- [X / Twitter](https://x.com/SlaxReader)

## License

Private
