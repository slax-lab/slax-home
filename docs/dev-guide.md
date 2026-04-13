## 📋 网页内容实现快速参考卡

| 功能 | 方法 |
|---|---|
| 新建页面 | 在 `src/content/docs/` 下创建 `.md` 文件 |
| 使用组件 | 文件改为 `.mdx`，然后 `import` |
| 修改侧边栏 | 编辑 `astro.config.mjs` 中的 `sidebar` |
| 自定义样式 | 创建 CSS 文件并在 `customCss` 中引入 |
| 添加搜索 | 默认已内置 Pagefind，无需配置 |
| 暗色模式 | 默认已内置，无需配置 |

---

## 📋 创建Blog 快速参考卡
| 功能 | 方法 |
|---|---|
| 新建文章 | `src/content/docs/blog/` 下建 `.md` 文件 |
| 使用组件 | 文件改为 `.mdx`，然后 `import` |
| 必填字段 | `title` + `date` |
| 设置标签 | frontmatter 中 `tags: [标签1, 标签2]` |
| 设置作者 | frontmatter 中 `authors:` 或全局配置 |
| 精选文章 | frontmatter 中 `featured: true` |
| 草稿文章 | frontmatter 中 `draft: true` |
| 封面图 | frontmatter 中 `cover: { alt, image }` |
