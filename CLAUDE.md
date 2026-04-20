# Slax 官网项目 - AI 操作指南

## 项目简介

这是 Slax 官网项目，基于 Astro + MDX 构建，部署于 https://slax.com 。通过创建分支、提交 PR 合并进 `main` 分支来触发部署更新线上网站。

技术栈：Astro + MDX，包管理器为 pnpm。

## 常用操作速查

### 日常开发

| 用户说的话 | 执行命令 |
|---|---|
| 帮我运行/启动这个项目 | `pnpm dev` |
| 帮我安装依赖 | `pnpm install` |
| 帮我检查代码规范 | `pnpm lint` |
| 帮我修复代码规范问题 | `pnpm lint:fix` |
| 帮我格式化代码 | `pnpm format` |

### 打包与部署

| 用户说的话 | 执行命令 |
|---|---|
| 帮我打包 / 构建项目 | `pnpm build` |
| 帮我打包并部署到测试环境 | `pnpm deploy:dev` |
| 帮我在本地预览打包结果 | `pnpm build && pnpm preview` |

### Cloudflare 相关

| 用户说的话 | 执行命令 |
|---|---|
| 帮我登录 Cloudflare | `npx wrangler login` |
| 我想查看 Cloudflare 部署状态 | `npx wrangler pages deployment list --project-name=slax-home` |

## 项目结构说明

```
slax-home/
├── src/
│   ├── components/      # Astro 组件（Nav、Footer、ProductCard 等）
│   ├── content/         # 内容集合
│   │   ├── blog/                # 博客文章（.mdx）
│   │   ├── reader-alternatives/ # Slax Reader 竞品对比
│   │   └── note-alternatives/   # Slax Note 竞品对比
│   ├── layouts/         # 页面布局（Base.astro）
│   ├── pages/           # 路由页面
│   │   ├── blog/        # 博客列表 & 详情
│   │   ├── reader/      # Slax Reader 产品页 & 竞品对比
│   │   └── note/        # Slax Note 产品页 & 竞品对比
│   ├── styles/          # 样式（global.css、tokens.css）
│   └── content.config.ts # 内容集合定义
├── public/              # 静态资源（图片、favicon 等）
├── docs/                # 设计文档 & mockup
├── dist/                # 构建输出（自动生成，不要手动修改）
└── package.json         # 项目根配置
```

## 开发端口

本地运行：http://localhost:4321

## 内容编辑指引

- 博客文章在 `src/content/blog/` 目录下，使用 `.mdx` 格式
- Slax Reader 竞品对比在 `src/content/reader-alternatives/` 目录下
- Slax Note 竞品对比在 `src/content/note-alternatives/` 目录下
- 图片等静态资源放在 `public/` 目录下

## 注意事项

- 部署前必须先登录 Cloudflare（`npx wrangler login`），只需登录一次
- `dist/` 目录是自动生成的，不要手动修改其中的文件
- 修改代码后如果需要部署到测试环境，直接执行 `pnpm deploy:dev` 即可，它会自动先打包再上传
