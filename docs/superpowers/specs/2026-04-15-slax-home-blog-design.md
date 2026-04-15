# slax-home Blog 页面设计文档

**日期：** 2026-04-15  
**范围：** `apps/slax-home`  
**目标：** 在 slax-home 添加自定义卡片式 Blog 首页，支持 Blog/Compare 分组，并为未来新分类留扩展接口。

---

## 背景与约束

- slax-home 使用 `starlight-blog` 插件（v0.26.1），当前路由在 `/blog/`
- 现有 `blog/` 目录下为示例文章（无实际内容），保留备份即可
- 正式文章共 4 篇：3 篇 Blog + 1 篇 Compare（均来自 reader-home）
- reader-home 的 BlogIndex.astro 可作为改编基础（已有 tag 筛选、分组、show more）

---

## 文件结构变更

```
apps/slax-home/src/content/docs/
  blog/
    index.mdx                                      ← 新增：卡片首页（splash 模板）
    a-smarter-more-efficient-ai-powered-way-...mdx ← 新增：Blog 文章详情
    built-an-open-source-pocket-alternative.mdx    ← 新增：Blog 文章详情
    built-an-open-source-tool-to-save-...mdx       ← 新增：Blog 文章详情
    [旧 example 文章保留不动，属于 blog2/ 范畴见下]
  compare/
    slax-reader-vs-instapaper.mdx                  ← 新增：Compare 文章详情

apps/slax-home/src/components/
  BlogIndex.astro                                  ← 新增：改编自 reader-home 版本
```

> 注：`blog2/` 目录由 `starlightBlog({ prefix: 'blog2' })` 接管，
> 原有示例文章迁移到 `blog2/` 目录（或保持原名，starlight-blog 自动按 prefix 映射）。

---

## URL 结构

| 路径 | 内容 |
|------|------|
| `/blog/` | 自定义卡片首页（Blog + Compare 两个分组） |
| `/blog/文章名/` | Blog 分组文章详情（Starlight 标准渲染） |
| `/compare/文章名/` | Compare 分组文章详情（Starlight 标准渲染） |
| `/blog2/` | starlight-blog 旧管理页（备份，不对外推广） |
| `/blog2/文章名/` | starlight-blog 旧文章（备份） |

---

## 配置变更（astro.config.mjs）

### 1. starlightBlog prefix

```js
starlightBlog({
  prefix: 'blog2',   // 从默认 'blog' 改为 'blog2'
  // 其余配置不变
})
```

### 2. Sidebar 新增 Blog / Compare 分组

```js
sidebar: [
  { label: 'Blog', autogenerate: { directory: 'blog' } },
  { label: 'Compare', autogenerate: { directory: 'compare' } },
  // 现有 Guides / Reference 保留
  { label: 'Guides', ... },
  { label: 'Reference', ... },
]
```

未来新增分类（如 Tutorial、Case Study）：在 sidebar 加一行 autogenerate，在 content/docs/ 建对应目录，BlogIndex 里加一个 section，三处同步更新。

---

## BlogIndex.astro（slax-home 版本）

改编自 reader-home 的 BlogIndex.astro，差异如下：

| 项目 | reader-home | slax-home |
|------|------------|-----------|
| Blog 文章来源 | `id.startsWith('blog/')` | `id.startsWith('blog/')` |
| Compare 文章来源 | `id.startsWith('compare/')` | `id.startsWith('compare/')` |
| 文章 URL 函数 | `/reader/` + id | `/` + id（去掉 reader 前缀） |
| 集合名 | `docs`（reader-home 的） | `docs`（slax-home 的） |
| 样式 | BEM `.bi__*` 不变 | BEM `.bi__*` 不变，品牌色 `#16b998` 不变 |

URL 函数：
```ts
function postUrl(id: string) {
  return '/' + id.replace(/\.mdx?$/, '') + '/';
}
```

---

## content.config.ts 变更

当前 slax-home 用 `blogSchema`，已支持 `date`。需确认 `tags` 字段是否包含：
- 若 blogSchema 已含 tags → 无需改动
- 若不含 → 在 extend 中补 `z.object({ tags: z.array(z.string()).optional() })`

---

## 文章 frontmatter

从 reader-home 复制的文章保留原有 frontmatter（title/description/date/tags）。
tags 值为 `['reader']`，后续可按需扩展。

---

## 成功标准

- [ ] `/blog/` 渲染卡片首页，含 Blog（3 张）和 Compare（1 张）两个分组
- [ ] 点击卡片进入文章详情页，sidebar 显示 Blog / Compare 分组
- [ ] Tag 筛选按钮正常工作（All / Reader）
- [ ] Show more 按钮：超过 4 张时出现
- [ ] `/blog2/` 仍可访问旧 starlight-blog 页面
- [ ] `pnpm build` 零报错

---

## 扩展点

- 新分类：加目录 + sidebar 条目 + BlogIndex section，模式固定
- 多语言：zh 子目录下按同样结构复制即可
- 图片：文章中图片路径从 `/reader/images/blog/...` 改为 `/images/blog/...`（需在 slax-home public/ 目录对应存放）
