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

## 已完成

- [x] reader-home 内容架构搭建（Get Started / Blog / Compare）
- [x] 迁移 vs-instapaper 对比文章，URL 改为 `/reader/compare/slax-reader-vs-instapaper`
- [x] 迁移两篇博文到 `/reader/blog/`
- [x] 底部文章 Prev/Next 导航去掉（待做，本次清理后处理）
