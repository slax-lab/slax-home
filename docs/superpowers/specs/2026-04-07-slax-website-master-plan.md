# Slax 官网总体设计文档

**日期：** 2026-04-07  
**负责人：** Kassia（非技术，通过 Claude Code 维护）  
**当前分支：** feature/pricing

---

## 一、项目背景

Slax 是一家生产力工具公司，旗下有两款产品：
- **Slax Reader**：智能阅读工具（read-later + AI 阅读）
- **Slax Note**：智能笔记工具

整个官网由技术团队搭建了基础框架（Astro 6 + Starlight monorepo），现在全部内容维护由 Kassia 通过 Claude Code 负责。

---

## 二、网站架构

### 三站结构

| 子站 | URL | 定位 | 当前状态 |
|------|-----|------|----------|
| slax-home | `slax.com/` | 公司门面 + 产品目录 | 框架已有，内容占位 |
| reader-home | `slax.com/reader/` | Reader 完整营销站 + 文档 | **主要开发对象** |
| note-home | `slax.com/note/` | Note 完整营销站 + 文档 | 未来阶段 |

### 开发端口（本地）

- slax-home：`localhost:4321`
- reader-home：`localhost:4322`
- note-home：`localhost:4323`

---

## 三、reader-home 完整页面规划

### 页面清单

| 优先级 | 页面 | URL | 导航位置 | 内容来源 |
|--------|------|-----|----------|----------|
| 🔴 P0 | 首页 | `/reader/` | 顶栏 Logo | 旧官网 r.slax.com/en 迁移 |
| 🔴 P0 | Pricing | `/reader/pricing` | 顶栏 | 旧官网迁移，已有初稿 |
| 🔴 P0 | Download | `/reader/download` | 顶栏 | 旧官网迁移 |
| 🟡 P1 | Contact | `/reader/contact` | 底栏 | 旧官网迁移 |
| 🟡 P1 | Terms | `/reader/terms` | 底栏 | 旧官网迁移 |
| 🟡 P1 | Privacy | `/reader/privacy` | 底栏 | 旧官网迁移 |
| 🟢 P2 | Blog 首页 | `/reader/blog/` | 顶栏 Resources 下拉 | 新建框架 |
| 🟢 P2 | Guides 首页 | `/reader/guides/` | 顶栏 Resources 下拉 | 新建框架 |
| 🟢 P2 | Tutorials 首页 | `/reader/tutorials/` | 顶栏 Resources 下拉 | 新建框架 |

### 导航结构

**顶栏（NavHeader）：**
```
[Slax Reader logo] [Pricing] [Download] [Resources ▾] [GitHub] [Twitter] [语言] [主题]

Resources 下拉：
  - Blog
  - Guides
  - Tutorials
```

**底栏（Footer）：**
```
Products          Resources         Legal
- Slax Reader     - Blog            - Terms
- Slax Note       - Guides          - Privacy
                  - Tutorials       - Contact
```

---

## 四、内容策略

### 语言

- 第一阶段：**英文优先**
- 中文：后续迭代补充（框架已支持双语）

### 内容来源原则

1. **旧官网内容**（r.slax.com/en）：照搬占位，后续优化
2. 提供 HTML 文件时：**保留原有文案**，只做结构和样式转换
3. 内容矩阵（blog/guides/tutorials）：框架先搭，内容后填

### SEO 策略

- guides：支柱内容（read-later 终极指南、AI 阅读等长文）
- tutorials：集群内容（具体功能操作教程）
- blog：品牌内容（产品介绍、竞品对比、行业观点、changelog）
- 目标：截流竞品流量（Pocket、Omnivore 等）

---

## 五、开发路线图

### 阶段一：P0 核心页面（约 1.5 周，每天 6 小时）

| 子项目 | 预计工作量 | 输出 |
|--------|-----------|------|
| reader-home 首页重做 | 2-3 天 | 完整品牌主页，对标旧官网 |
| Pricing 页完善 | 1 天 | 真实定价方案，旧官网文案 |
| Download 页 | 1 天 | 各平台下载入口 |

**阶段一完成标准：** 访问 `slax.com/reader/` 有完整首页，pricing 和 download 可用

---

### 阶段二：P1 法律 + 联系页（约 3 天）

| 子项目 | 预计工作量 | 输出 |
|--------|-----------|------|
| Contact 页 | 半天 | 联系方式 + 表单 |
| Terms 页 | 半天 | 直接迁移旧官网文案 |
| Privacy 页 | 半天 | 直接迁移旧官网文案 |
| Footer 组件 | 1 天 | 底栏导航，链接到所有法律页 |

**阶段二完成标准：** 网站有完整底栏，法律页面可访问

---

### 阶段三：P2 内容体系（约 1.5 周）

| 子项目 | 预计工作量 | 输出 |
|--------|-----------|------|
| Blog 框架 + 首篇文章 | 2-3 天 | 可发布博客，有 1-2 篇示例文章 |
| Guides 框架 + 首篇 | 2-3 天 | 可发布指南，有 1 篇示例 |
| Tutorials 框架 | 1-2 天 | 可发布教程 |
| 顶栏 Resources 下拉菜单 | 半天 | nav.ts 新增下拉 |

**阶段三完成标准：** 内容体系可以持续发布文章

---

### 阶段四：slax-home 主站完善（约 1 周）

| 子项目 | 预计工作量 | 输出 |
|--------|-----------|------|
| 主站首页内容完善 | 2 天 | 产品目录页，介绍 Reader + Note |
| 主站 Footer | 半天 | 与子站风格统一 |
| SEO 基础配置 | 1 天 | sitemap、robots.txt、meta 优化 |

---

### 阶段五：note-home（未来，暂不排期）

待 Reader 站完整上线后启动，复用 Reader 站的框架和组件。

---

## 六、总体时间预估

**前提：每天工作 6 小时，不含内容写作时间**

| 阶段 | 时间 |
|------|------|
| 阶段一：P0 核心页面 | 约 1.5 周 |
| 阶段二：P1 法律 + 联系页 | 约 3 天 |
| 阶段三：P2 内容体系框架 | 约 1.5 周 |
| 阶段四：slax-home 主站 | 约 1 周 |
| **reader-home 完整站** | **约 4 周** |
| **整个 slax-home 项目** | **约 5 周** |

> **注意：** 内容写作（blog 文章、guides 文章）不在以上时间内。框架搭好后，每篇文章可单独排期。

---

## 七、技术维护原则

1. **提供 HTML 文件时**：保留原有文案，只转换结构和样式
2. **顶栏导航**：统一通过 `src/config/nav.ts` 维护，一行配置增删入口
3. **每个功能**：先采访 → spec → plan → 实施，不跳步
4. **内容**：MDX 文件，Kassia 可直接编辑文案，不需要改代码
5. **图片**：统一用 CDN（`https://static-cdn.slax.com/...`）

---

## 八、当前已完成

- [x] 项目基础框架（三站 monorepo）
- [x] reader-home 首页（基础版，内容占位）
- [x] Pricing 页（初稿，待完善）
- [x] 顶栏 NavHeader 组件（支持普通链接 + 下拉菜单）
- [x] nav.ts 配置文件（统一维护顶栏导航）

## 九、下一步立即要做

1. **今天**：reader-home 首页重做 spec（参照旧官网，Kassia 提供 HTML 文件）
2. **本周**：完成阶段一（首页 + Pricing 完善 + Download）
