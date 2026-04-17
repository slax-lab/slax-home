# Slax 官网项目 - AI 操作指南

## 项目简介

这是 Slax 官网的 monorepo 项目，包含三个子站点：

- **slax-home** (`apps/slax-home`) — 主站 & 博客，路径 `/`
- **reader-home** (`apps/reader-home`) — Slax Reader 文档，路径 `/reader`
- **note-home** (`apps/note-home`) — Slax Note 文档，路径 `/note`

技术栈：Astro + Starlight，包管理器为 pnpm。

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
├── apps/
│   ├── slax-home/       # 主站（首页 + 博客）
│   ├── reader-home/     # Slax Reader 产品文档
│   └── note-home/       # Slax Note 产品文档
├── dist/                # 打包输出目录（自动生成，不要手动修改）
├── script/build.sh      # 打包脚本（自动合并三个子站点）
└── package.json         # 项目根配置
```

## 开发端口

本地运行时，三个子站点分别在不同端口：

- 主站：http://localhost:4321
- Reader：http://localhost:4322
- Note：http://localhost:4323

## 内容编辑指引

- 博客文章在 `apps/slax-home/src/content/blog/` 目录下，使用 `.mdx` 格式
- Reader 文档在 `apps/reader-home/src/content/docs/` 目录下
- Note 文档在 `apps/note-home/src/content/docs/` 目录下
- 图片等静态资源放在对应 app 的 `public/` 目录下

## 注意事项

- 部署前必须先登录 Cloudflare（`npx wrangler login`），只需登录一次
- `dist/` 目录是自动生成的，不要手动修改其中的文件
- 修改代码后如果需要部署到测试环境，直接执行 `pnpm deploy:dev` 即可，它会自动先打包再上传
