# Slax Home Page 编码规范

## 1. 文件与目录规范

### 文件命名

- **Astro 组件**：PascalCase，如 `Head.astro`、`BlogCard.astro`
- **页面文件**：kebab-case，如 `test-blog.mdx`
- **配置文件**：遵循框架约定，如 `astro.config.mjs`、`content.config.ts`
- **脚本文件**：kebab-case，如 `build.sh`

### 目录结构约定

- 页面内容放在 `src/content/docs/`
- 博客文章放在 `src/content/docs/blog/`（英文）和 `src/content/docs/zh/blog/`（中文）
- 组件放在 `src/components/`
- 公共资源放在 `public/`
- 国际化翻译放在 `src/content/i18n/`

## 2. Frontmatter 编写规范

### 博客文章（MDX）

```yaml
---
# 必填字段
title: 文章标题       
date: 2026-03-30T00:00:00.000Z

# 推荐字段
excerpt: '文章摘要'    
tags:                  
  - 标签名
draft: false           

# 可选字段
authors:               
  - daguang
cover:                 
  image: './cover.png'
  alt: '封面描述'
featured: false        
---
```

### 文档页面（MDX）

```yaml
---
title: 页面标题
description: 页面描述（160 字符以内）
template: splash       
hero:                  # 仅 splash 模板可用
  tagline: 标语文字
  image:
    html: '<img src="..." alt="..." />'
  actions:
    - text: 按钮文字
      link: ./path/
      icon: right-arrow
---
```

## 3. Astro 组件编写规范

### 组件结构

```astro
---
// 1. 类型导入
import type { SomeType } from 'some-module';

// 2. 运行时导入
import { getCollection } from 'astro:content';

// 3. Props 接口定义
interface Props {
  title: string;
  description?: string;
}

// 4. 解构 Props 并设置默认值
const { title, description = '' } = Astro.props;

// 5. 数据获取与处理逻辑
const posts = await getCollection('docs');
---

<!-- 6. 模板 -->
<div class="component">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<!-- 7. Scoped 样式 -->
<style>
  .component {
    /* 使用 CSS 变量遵循设计规范 */
  }
</style>
```

### 客户端交互指令

```astro
<!-- 默认：不发送 JS（零 JS） -->
<StaticComponent />

<!-- 仅在需要交互时使用 client 指令 -->
<InteractiveComponent client:idle />     <!-- 页面空闲时加载 -->
<BelowFoldWidget client:visible />       <!-- 滚动可见时加载 -->
<CriticalUI client:load />               <!-- 立即加载（谨慎使用） -->
```

**原则：默认不加 `client:*` 指令，仅在确实需要浏览器端交互时添加。**

## 4. Content Collections 编写规范

### Schema 定义

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema(),
  }),
};
```

### 扩展 Schema 注意事项

- 使用 `docsSchema({ extend })` 扩展而非替换
- `blogSchema` 需要接收 `context` 参数（包含 `image()` helper）
- 自定义字段使用 `.optional()` 和 `.default()` 确保向后兼容

## 5. SEO 与结构化数据规范

### JSON-LD 结构化数据

- **博客文章**：使用 `BlogPosting` schema，必须包含 `datePublished`
- **普通页面**：使用 `WebPage` schema
- **面包屑**：自动根据 URL 路径生成 `BreadcrumbList`

### Meta 标签

- 每个页面必须有唯一的 `title` 和 `description`
- `description` 控制在 160 字符以内
- 使用 `og:image` 提供社交分享图片

### 图片 SEO

- 所有图片必须有 `alt` 属性
- 使用描述性文件名（非 hash 值）
- 远程图片使用 CDN：`https://static-cdn.slax.com/...`

## 6. 国际化规范

### 内容同步

- 新增/修改英文内容后，必须同步更新中文版本
- 英文放 `docs/` 根目录，中文放 `docs/zh/` 目录
- UI 字符串更新同步维护 `en.json` 和 `zh-CN.json`

### 翻译注意

- URL slug 保持英文（不翻译路径）
- 标题、描述等 frontmatter 字段需翻译
- 代码示例中的注释可根据目标语言翻译

## 7. CSS 与样式规范

遵循 `STYLE.md` 中定义的设计规范：

- **主色调**：`#16B998`，使用面积不超过 15%
- **圆角**：按钮 6px、卡片 12px、输入框 8px
- **阴影**：`box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08)`
- **字体**：`apple-system, "system-ui", "Segoe UI", Roboto, sans-serif`
- **间距**：模块间 24/32/48/68/100px，卡片内边距 32px

### Starlight 主题定制

使用 Starlight 的 CSS 自定义属性覆盖默认主题：

```css
:root {
  --sl-color-accent: #16B998;
  --sl-color-accent-high: #1CB0B5;
}
```

## 8. TypeScript 规范

- 使用 `strict` 模式（继承 `astro/tsconfigs/strict`）
- 类型导入使用 `import type`
- schema-dts 类型用于 JSON-LD（`WithContext<BlogPosting>`）
- 避免使用 `any`，优先使用具体类型或 `unknown`

## 9. Git 提交规范

### 提交信息格式

```
<emoji> <type>: <description>

[optional body]
```

### 类型前缀

| 类型 | Emoji | 说明 |
|------|-------|------|
| feat | ✨ | 新功能 |
| fix | 🐛 | 修复 bug |
| docs | 📝 | 文档更新 |
| style | 💄 | 样式调整（不影响逻辑） |
| refactor | ♻️ | 代码重构 |
| perf | ⚡ | 性能优化 |
| chore | 🔧 | 构建/工具/配置变更 |
| content | 📄 | 内容更新（博客、文档） |
| i18n | 🌐 | 国际化相关 |
| seo | 🔍 | SEO 优化 |

### 示例

```
✨ Add tag filtering to blog listing page

📝 Update reader-home getting started guide

🌐 Add Chinese translation for privacy policy

🔧 Configure sitemap i18n hreflang settings
```

## 10. 构建与部署检查清单

- [ ] `pnpm build` 无错误
- [ ] 三个子站 sitemap 正确生成
- [ ] 顶级 `sitemap-index.xml` 包含所有子站
- [ ] robots.txt 中 sitemap URL 正确
- [ ] 博客文章中英文版本都存在
- [ ] JSON-LD 结构化数据有效（可用 Google Rich Results Test 验证）
- [ ] 所有图片有 alt 属性
- [ ] 页面 title 和 description 唯一且有意义

## 11. 快速参考

### 网页内容

| 功能 | 方法 |
|------|------|
| 新建页面 | 在 `src/content/docs/` 下创建 `.md` 文件 |
| 使用组件 | 文件改为 `.mdx`，然后 `import` |
| 修改侧边栏 | 编辑 `astro.config.mjs` 中的 `sidebar` |
| 自定义样式 | 创建 CSS 文件并在 `customCss` 中引入 |
| 添加搜索 | 默认已内置 Pagefind，无需配置 |
| 暗色模式 | 默认已内置，无需配置 |

### 创建 Blog

| 功能 | 方法 |
|------|------|
| 新建文章 | `src/content/docs/blog/` 下建 `.md` 文件 |
| 使用组件 | 文件改为 `.mdx`，然后 `import` |
| 必填字段 | `title` + `date` |
| 设置标签 | frontmatter 中 `tags: [标签1, 标签2]` |
| 设置作者 | frontmatter 中 `authors:` 或全局配置 |
| 精选文章 | frontmatter 中 `featured: true` |
| 草稿文章 | frontmatter 中 `draft: true` |
| 封面图 | frontmatter 中 `cover: { alt, image }` |

### 落地页 MDX 典型结构

```mdx
---
title: 产品名称
template: splash
hero:
  title: 智能信息管理工具
  tagline: 让信息为你所用
  actions:
    - text: 免费开始
      link: /start
      variant: primary
---

import ProductGrid from '@/components/ProductGrid.astro';
import ProductCard from '@/components/ProductCard.astro';
import FeatureGrid from '@/components/FeatureGrid.astro';
import FeatureCard from '@/components/FeatureCard.astro';
import CallToAction from '@/components/CallToAction.astro';
import TextImage from '@/components/TextImage.astro';
import Highlight from '@/components/Highlight.astro';

<FeatureGrid title="为什么选择我们" columns={3}>
  <FeatureCard title="功能一" description="..." icon="..." />
  <FeatureCard title="功能二" description="..." icon="..." />
</FeatureGrid>

<ProductGrid title="产品矩阵">
  <ProductCard title="产品A" description="..." href="..." hue={238} />
  <ProductCard title="产品B" description="..." href="..." hue={163} />
</ProductGrid>

<TextImage title="核心优势" description="..." image="/images/preview.png" imagePosition="right" />

<CallToAction title="立即开始" description="..." primaryText="免费试用" primaryLink="/start" />
```
