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

- **框架**: Astro 6 + Starlight
- **内容格式**: MDX / Markdown（基于内容集合驱动路由）
- **博客**: starlight-blog（仅主站）
- **包管理**: pnpm workspace
- **SEO**: @astrojs/sitemap、JSON-LD 结构化数据
- **分析**: Google Tag Manager（可选）
- **图像处理**: sharp

## 项目结构

```
slax-home/
├── apps/
│   ├── slax-home/          # 主站 + 博客
│   │   ├── src/
│   │   │   ├── components/ # Head.astro, SkipLink.astro 等自定义组件
│   │   │   ├── content/
│   │   │   │   ├── docs/   # 英文文档 & 博客
│   │   │   │   │   ├── zh/ # 中文文档 & 博客
│   │   │   │   │   └── blog/
│   │   │   │   └── i18n/   # 国际化翻译文件
│   │   │   └── assets/
│   │   └── astro.config.mjs
│   ├── reader-home/        # Slax Reader 文档站
│   └── note-home/          # Slax Note 文档站
├── script/
│   └── build.sh            # 构建 & 合并脚本
├── public/                 # 全局静态资源
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

## 环境变量

| 变量名 | 说明 | 是否必须 |
|--------|------|----------|
| `PUBLIC_GTM_ID` | Google Tag Manager 容器 ID | 否 |

> 如不配置 `PUBLIC_GTM_ID`，GTM 相关脚本不会注入页面。

## 添加内容

### 文档页面

在对应应用的 `src/content/docs/` 目录下创建 `.mdx` 文件：

```
apps/slax-home/src/content/docs/guides/new-guide.mdx      # 英文
apps/slax-home/src/content/docs/zh/guides/new-guide.mdx   # 中文
```

### 博客文章（仅主站）

在 `apps/slax-home/src/content/docs/blog/` 目录下创建 `.mdx` 文件。

### 国际化

翻译文件位于各应用的 `src/content/i18n/` 目录：

- `en.json` — 英文
- `zh-CN.json` — 简体中文

## 部署

构建完成后，将根目录 `dist/` 作为静态站点部署即可。站点结构：

```
dist/
├── index.html              # 主站首页
├── reader/                 # Reader 文档
├── note/                   # Note 文档
├── zh/                     # 中文页面
├── blog/                   # 博客
├── pagefind/               # 搜索索引
├── sitemap-index.xml       # 统一 sitemap 入口
├── sitemap-home-index.xml  # 主站 sitemap
└── 404.html
```

## 相关链接

- [Astro 文档](https://docs.astro.build)
- [Starlight 文档](https://starlight.astro.build)
- [GitHub](https://github.com/slax-lab)
- [X / Twitter](https://x.com/SlaxReader)

## License

Private
