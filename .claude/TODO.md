# Reader Home — 待讨论 & 待做事项

## 待讨论

### 1. 顶部导航栏：Blog 页面单独样式
- Blog 页面（`/reader/blog/...`）需要不同的顶部导航
- 目标样式：`[Logo] Slax Reader Support | [搜索框] [Homepage]`
- 待确认："Homepage" 跳回 `slax.com` 还是 `/reader/`？
- 实现方式：在现有 `NavHeader.astro` 里判断当前 URL，条件渲染不同导航内容

### 2. 侧边栏按入口分组隔离
- 问题：现在 Blog/Compare/Get Started/Changelog 全在一个侧边栏，太杂
- 目标：从 Blog 入口进来只看到 Blog/Compare，从 Get Started 进来只看到 Get Started 系列
- 方案 A（简单）：CSS/JS 根据 URL 隐藏不相关分组，实现快，SEO 略有影响
- 方案 B（彻底）：拆成多个 Starlight 子站，完全隔离，工作量大
- 待决策：选 A 还是 B，或者其它方案

---

## 上线前必须处理（内容是占位符，需要你编辑）

- [ ] `blog/index.mdx` — All Posts 汇总页，内容需要重新写几句
- [ ] `compare/index.mdx` — Compare - Why Slax Reader 页，内容需要重新写几句
- [ ] `get-started/how-to-save/index.mdx` — 占位内容
- [ ] `get-started/how-to-save/1-browser-extension.mdx` — 占位内容
- [ ] `get-started/how-to-save/2-mobile-app.mdx` — 占位内容
- [ ] `zh/index.mdx` — 中文主页，frontmatter 有坏链接（指向已删的 guides/example）

## 孤立页面（目前没有任何导航入口能到达）

- [ ] `/reader` — 主页，没被任何地方链接
- [ ] `/reader/contact` — 联系页，顶部导航没挂
- [ ] `/reader/privacy` — 隐私页，只能直接输 URL 访问
- [ ] `/reader/terms` — 条款页，只能直接输 URL 访问
- [ ] `/reader/zh` — 中文主页，没入口
- [ ] `/reader/zh/pricing` — 中文定价页，没入口

---

## 已完成

- [x] reader-home 内容架构搭建（Get Started / Blog / Compare）
- [x] 迁移 vs-instapaper 对比文章，URL 改为 `/reader/compare/slax-reader-vs-instapaper`
- [x] 迁移 4 篇博文到 `/reader/blog/`
- [x] 底部文章 Prev/Next 导航关掉（prev/next: false）
- [x] 删除占位博文分组（ai-powered-reading、ultimate-read-it-later-guide）
- [x] 删除 vs-readwise、vs-cubox 占位 compare 页
- [x] 侧边栏 collapsed: false，常驻展开
