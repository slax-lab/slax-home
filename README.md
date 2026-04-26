# Slax Home

Slax 官网，基于 [Astro](https://astro.build) 构建，部署于 https://slax.com 。通过创建分支、提交 PR 合并进 `main` 分支来触发部署更新线上网站。

## 技术栈

- **框架**: Astro + MDX
- **内容管理**: Astro Content Collections（博客、竞品对比页）
- **代码质量**: Biome（lint + format）+ Husky（pre-commit）
- **SEO**: @astrojs/sitemap、Open Graph、RSS
- **图像处理**: sharp
- **部署**: Cloudflare Pages

## 项目结构

```
slax-home/
├── src/
│   ├── components/             # Astro 组件
│   │   ├── Nav.astro           # 导航栏
│   │   ├── Footer.astro        # 页脚
│   │   ├── Logo.astro          # Logo
│   │   ├── Button.astro        # 按钮
│   │   ├── Eyebrow.astro       # 眉标文字
│   │   ├── SectionLabel.astro  # 区块标签
│   │   ├── Scene.astro         # 场景区块
│   │   ├── MastheadCard.astro  # 首屏卡片
│   │   ├── ProductCard.astro   # 产品卡片
│   │   ├── FaqList.astro       # FAQ 列表
│   │   └── PlaceholderPage.astro
│   ├── content/                # 内容集合
│   │   ├── blog/               # 博客文章（.mdx）
│   │   ├── reader-alternatives/ # Slax Reader 竞品对比
│   │   └── note-alternatives/   # Slax Note 竞品对比
│   ├── layouts/
│   │   └── Base.astro          # 基础布局
│   ├── pages/                  # 路由页面
│   │   ├── index.astro         # 首页
│   │   ├── about.astro         # 关于页
│   │   ├── 404.astro           # 404 页面
│   │   ├── rss.xml.js          # RSS 订阅
│   │   ├── blog/               # 博客列表 & 详情
│   │   ├── reader/             # Slax Reader 产品页 & 竞品对比
│   │   └── note/               # Slax Note 产品页 & 竞品对比
│   ├── styles/
│   │   ├── global.css          # 全局样式
│   │   └── tokens.css          # 设计令牌（颜色、字体等）
│   └── content.config.ts       # 内容集合定义
├── public/                     # 静态资源（图片、favicon 等）
├── docs/                       # 设计文档 & mockup
├── astro.config.mjs            # Astro 配置
├── biome.json                  # Biome lint/format 配置
├── tsconfig.json
└── package.json
```

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:4321 查看站点。

### 构建 & 预览

```bash
pnpm build
pnpm preview
```

## 代码质量

项目使用 [Biome](https://biomejs.dev/) 进行 lint 和格式化，Husky 在提交前自动运行 lint-staged。

```bash
pnpm lint          # 检查代码
pnpm lint:fix      # 自动修复
pnpm format        # 格式化代码
```

## 内容编辑

### 博客文章

在 `src/content/blog/` 目录下创建 `.mdx` 文件，frontmatter 示例：

```yaml
---
title: 文章标题
description: 文章描述
pubDate: 2026-01-01
tags: [标签1, 标签2]
# heroImage: /images/blog/cover.png
# draft: true
---
```

### 竞品对比页

- Slax Reader 竞品对比：`src/content/reader-alternatives/`
- Slax Note 竞品对比：`src/content/note-alternatives/`

## 部署

站点通过 Cloudflare Pages 部署。日常更新流程：创建分支 → 提交 PR → 合并进 `main` 分支 → 自动部署到 https://slax.com 。

手动部署到测试环境：

```bash
pnpm deploy:dev
```

## 相关链接

- [Astro 文档](https://docs.astro.build)
- [Biome 文档](https://biomejs.dev)
- [GitHub](https://github.com/slax-lab)
- [X / Twitter](https://x.com/SlaxReader)

## License

Private
