# Slax Monorepo — Landing Page Style Guide

> 本文档记录了 Slax 系列产品落地页的设计系统、CSS 规范与组件使用方式，适用于 slax-home、reader-home、note-home 三个子应用。

---

## 目录

1. [设计理念](#设计理念)
2. [色彩系统](#色彩系统)
3. [CSS 变量与 Token](#css-变量与-token)
4. [动画系统](#动画系统)
5. [背景系统](#背景系统)
6. [组件库](#组件库)
7. [MDX 使用示例](#mdx-使用示例)
8. [可访问性规范](#可访问性规范)
9. [文件结构](#文件结构)

---

## 设计理念

### 核心原则

- **主题自适应**：所有样式通过 Starlight CSS Token 驱动，三个应用共享同一套组件，颜色自动适配各自主题色。
- **GPU 友好**：所有动画仅使用 `transform` 和 `opacity`，配合 `will-change: transform` 开启 GPU 合成层，保持 60fps。
- **动而不乱**：区分「入场动画」（一次性 forwards）与「环境动画」（无限循环 infinite），页面静止时仍有细微呼吸感。
- **可访问优先**：所有动画均提供 `@media (prefers-reduced-motion: reduce)` 降级，禁用或简化动效。
- **作用域隔离**：落地页样式通过 `[data-has-hero]` 选择器限定范围，防止污染文档页；各应用通过 `html[data-site="X"]` 隔离 Token 覆盖。

### 视觉风格

- 深色优先，浅色模式同等支持
- 大面积渐变背景 + 模糊光晕营造深度感
- 标题渐变文字强调品牌色
- 卡片悬停时微上浮（4–5px）+ 边框/阴影增强，传达可交互感

---

## 色彩系统

### 各应用主题色

| 应用 | 品牌色 | `--brand-hsl` | 暗色 Accent | 亮色 Accent |
|------|--------|--------------|-------------|-------------|
| slax-home | 靛蓝 Indigo | `238, 73%, 61%` | `#4f5de6` | `#3d4bdb` |
| reader-home | 绿青 Green-Teal | `163, 79%, 41%` | `#14b87a` | `#0d9e68` |
| note-home | 青蓝 Cyan | `181, 53%, 55%` | `#4ec8d4` | `#2bb5c2` |

### Starlight Token 覆盖（以 slax-home 为例）

```css
/* 暗色模式 */
html[data-site="home"] {
  --sl-color-accent:     #4f5de6;
  --sl-color-accent-low: #1a1a40;   /* 低饱和背景 */
  --sl-color-accent-high:#c5c9ff;   /* 高亮文字 */
}

/* 亮色模式 */
html[data-site="home"]:not([data-theme="dark"]) {
  --sl-color-accent:     #3d4bdb;
  --sl-color-accent-low: #dde0ff;
  --sl-color-accent-high:#182068;
}
```

### 渐变文字规范

标题渐变文字统一使用以下模式，确保跟随主题色变化：

```css
background: linear-gradient(
  135deg,
  var(--sl-color-accent-high),
  var(--sl-color-accent),
  var(--sl-color-accent-high)
);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: gradient-shift 6s linear infinite;
```

### 强调文字 `<strong>` 规范

在渐变标题中，`<strong>` 标签用于打断渐变、突出纯白文字：

```css
strong {
  -webkit-text-fill-color: var(--sl-color-white);
  font-weight: 700;
}
```

---

## CSS 变量与 Token

### 自定义属性

| 变量 | 作用域 | 说明 |
|------|--------|------|
| `--brand-hsl` | `[data-has-hero]` | 当前应用品牌色的 HSL 分量，用于构造 `hsla()` 渐变 |
| `--card-hue` | `.product-card` | 单个 ProductCard 的色相值，内联注入 |
| `--img-left` | `.text-image` | 控制 TextImage 图片位置（left/right） |

### 常用 Starlight Token

| Token | 用途 |
|-------|------|
| `--sl-color-accent` | 主要品牌色，按钮背景、边框、图标 |
| `--sl-color-accent-high` | 高亮色，标题渐变端点，深色模式下对比度更高 |
| `--sl-color-accent-low` | 低饱和背景色，卡片背景叠加 |
| `--sl-color-gray-1` ~ `--sl-color-gray-7` | 灰阶，文字/边框/背景 |
| `--sl-color-black` | 最深背景色 |
| `--sl-color-white` | 最亮前景色 |

---

## 动画系统

### 入场动画

一次性播放，`animation-fill-mode: forwards`，元素由隐藏/偏移状态过渡到正常状态。

```css
/* 通用淡入上移 */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 卡片入场（带缩放） */
@keyframes card-enter {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

/* CTA / Testimonial 入场 */
@keyframes cta-enter {
  from { opacity: 0; transform: translateY(32px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}
```

#### 入场时序（Stagger）规范

多子元素使用 `nth-child` 错开延迟，间隔约 120–150ms：

```css
.card-grid > .card:nth-child(1) { animation-delay: 0.15s; }
.card-grid > .card:nth-child(2) { animation-delay: 0.27s; }
.card-grid > .card:nth-child(3) { animation-delay: 0.39s; }
.card-grid > .card:nth-child(4) { animation-delay: 0.51s; }
```

### 环境动画（Idle / Ambient）

无限循环，营造「有生命感」的静止状态。

```css
/* 英雄图片漂浮 */
@keyframes hero-img-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* 渐变文字流动 */
@keyframes gradient-shift {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* 按钮呼吸光晕 */
@keyframes btn-glow-pulse {
  0%, 100% { box-shadow: 0 0 0   0   hsla(var(--brand-hsl), 0); }
  50%       { box-shadow: 0 0 18px 4px hsla(var(--brand-hsl), 0.45); }
}

/* 卡片边框呼吸 */
@keyframes card-border-breathe {
  0%, 100% { border-color: hsla(var(--card-hue), 65%, 55%, 0.2); }
  50%       { border-color: hsla(var(--card-hue), 65%, 55%, 0.5); }
}

/* 图标方块呼吸 */
@keyframes icon-breathe {
  0%, 100% { box-shadow: 0 0 0  0   color-mix(in srgb, var(--sl-color-accent) 0%,  transparent); }
  50%       { box-shadow: 0 0 12px 2px color-mix(in srgb, var(--sl-color-accent) 60%, transparent); }
}

/* CTA 光晕呼吸 */
@keyframes cta-glow-breathe {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.12); }
}

/* Testimonial 引号漂浮 */
@keyframes quote-icon-float {
  0%, 100% { transform: translateY(0)    rotate(0deg); }
  50%       { transform: translateY(-4px) rotate(2deg); }
}
```

### 背景光球动画

页面背景使用两个伪元素光球，轨迹不同步以产生自然感：

```css
@keyframes orb-drift-1 {
  0%   { transform: translate(0, 0)      scale(1); }
  33%  { transform: translate(4vw, -3vh)  scale(1.04); }
  66%  { transform: translate(-3vw, 2vh)  scale(0.97); }
  100% { transform: translate(0, 0)      scale(1); }
}

@keyframes orb-drift-2 {
  0%   { transform: translate(0, 0)      scale(1); }
  40%  { transform: translate(-5vw, 4vh)  scale(1.06); }
  70%  { transform: translate(3vw, -2vh)  scale(0.95); }
  100% { transform: translate(0, 0)      scale(1); }
}
```

| 光球 | 伪元素 | 尺寸 | 周期 | 位置 |
|------|--------|------|------|------|
| 主光球 | `::before` | `105vw` 圆 | 18s | 右上角 |
| 次光球 | `::after` | `60rem` 圆 | 22s | 左下角 |

---

## 背景系统

落地页 `[data-has-hero]` 元素设置多层背景：

```css
[data-has-hero] {
  /* 静态渐变底色 */
  background: linear-gradient(
    215deg,
    hsla(var(--brand-hsl), 0.12),
    transparent 45%
  );
  position: relative;
  overflow: hidden;
}

/* 主光球 */
[data-has-hero]::before {
  content: '';
  position: fixed;
  width: 105vw; height: 105vw;
  border-radius: 50%;
  background: radial-gradient(circle,
    hsla(var(--brand-hsl), 0.13) 0%,
    transparent 70%
  );
  top: -20vh; right: -20vw;
  filter: blur(40px);
  animation: orb-drift-1 18s ease-in-out infinite;
  will-change: transform;
  pointer-events: none;
}

/* 次光球 */
[data-has-hero]::after {
  content: '';
  position: fixed;
  width: 60rem; height: 60rem;
  border-radius: 50%;
  background: radial-gradient(circle,
    hsla(var(--brand-hsl), 0.10) 0%,
    transparent 65%
  );
  bottom: -15rem; left: -10rem;
  filter: blur(50px);
  animation: orb-drift-2 22s ease-in-out infinite;
  will-change: transform;
  pointer-events: none;
}
```

---

## 组件库

所有组件位于 `apps/slax-home/src/components/`，在三个子应用中共享。

---

### ProductCard

单个产品卡片，支持自定义色相。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 卡片标题（必填） |
| `description` | `string` | — | 描述文字（必填） |
| `href` | `string` | — | 跳转链接（必填） |
| `hue` | `number` | `238` | 色相值 0–360 |
| `cta` | `string` | `'了解更多'` | CTA 文字 |

#### 使用示例

```mdx
import ProductCard from '@/components/ProductCard.astro';

<ProductCard
  title="Slax Reader"
  description="智能 RSS 阅读器，订阅你感兴趣的内容。"
  href="https://reader.slax.app"
  hue={163}
  cta="立即使用"
/>
```

#### 视觉规范

- 背景：`135deg` 渐变，基于 `--card-hue` 构造低饱和底色
- 标题：渐变文字（`card-accent → card-accent-mid`）
- 入场：`card-enter 0.7s ease-out forwards`
- 空闲：`card-border-breathe 4s ease-in-out infinite`（每张卡片错开 1.1s / 2.3s 延迟）
- 悬停：`translateY(-5px)` + 顶部 shimmer 边框 + 底部径向光晕

---

### ProductGrid

包裹多个 ProductCard 的网格容器，带有渐变标题。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 区块标题（可选） |

#### 使用示例

```mdx
import ProductGrid from '@/components/ProductGrid.astro';
import ProductCard from '@/components/ProductCard.astro';

<ProductGrid title="我们的产品">
  <ProductCard title="..." description="..." href="..." hue={238} />
  <ProductCard title="..." description="..." href="..." hue={163} />
</ProductGrid>
```

#### 视觉规范

- 标题：Starlight accent 渐变文字 + `gradient-shift` 6s 动画
- 容器：`section-enter 0.7s ease-out` 入场
- 网格：`repeat(auto-fill, minmax(280px, 1fr))`，间距 `1.5rem`

---

### FeatureCard

单个功能特性卡片，支持图标、布局方向配置。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 特性标题（必填） |
| `description` | `string` | — | 特性描述（必填） |
| `icon` | `string` | — | SVG 字符串（必填） |
| `layout` | `'top' \| 'side'` | `'top'` | 图标位置：顶部或左侧 |
| `iconStyle` | `'square' \| 'plain'` | `'square'` | 图标样式：方块背景或纯图标 |

#### 使用示例

```mdx
import FeatureCard from '@/components/FeatureCard.astro';

<FeatureCard
  title="智能推荐"
  description="基于你的阅读习惯，AI 为你精选内容。"
  icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
  layout="side"
  iconStyle="square"
/>
```

#### 视觉规范

- Square 图标：`2.75rem`，`border-radius: 0.625rem`，背景色 `--sl-color-accent`，`icon-breathe 3.5s infinite`
- 悬停：`translateY(-4px)` + accent 边框 + 双层 box-shadow

---

### FeatureGrid

特性卡片网格容器，支持多列布局与入场错开动画。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 区块标题（可选） |
| `description` | `string` | — | 区块描述（可选） |
| `columns` | `2 \| 3 \| 4` | `3` | 列数（桌面端） |

#### 使用示例

```mdx
import FeatureGrid from '@/components/FeatureGrid.astro';
import FeatureCard from '@/components/FeatureCard.astro';

<FeatureGrid title="核心功能" description="为效率而生的工具集" columns={3}>
  <FeatureCard ... />
  <FeatureCard ... />
  <FeatureCard ... />
</FeatureGrid>
```

#### 视觉规范

- 标题：accent 渐变；`<strong>` 覆盖为白色
- 子卡片错开入场：`feature-enter`，延迟从 `0.05s` 到 `0.54s`（每项增加约 `0.1s`）
- 图标呼吸错开：第2个卡片 0.8s 延迟，第3个 1.6s，第4个 2.4s
- 响应式：1列（移动）→ 2列（平板）→ `columns` 列（桌面）

---

### CallToAction

号召性行动区块，带光晕背景与双按钮。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 主标题（必填） |
| `description` | `string` | — | 描述文字（必填） |
| `primaryText` | `string` | — | 主按钮文字 |
| `primaryLink` | `string` | — | 主按钮链接 |
| `secondaryText` | `string` | — | 次按钮文字 |
| `secondaryLink` | `string` | — | 次按钮链接 |
| `mode` | `'dark' \| 'light'` | `'dark'` | 背景模式 |

#### 使用示例

```mdx
import CallToAction from '@/components/CallToAction.astro';

<CallToAction
  title="准备好开始了吗？"
  description="加入数千名用户，体验更智能的信息管理方式。"
  primaryText="免费试用"
  primaryLink="https://app.slax.app/signup"
  secondaryText="查看文档"
  secondaryLink="/docs"
  mode="dark"
/>
```

#### 视觉规范

- 暗色背景：`color-mix(accent 20%, black) → black → color-mix(accent 12%, black)` 斜角渐变
- 光晕：`cta-glow-breathe 5s ease-in-out infinite`（opacity 0.7→1，scale 1→1.12）
- 主按钮：`border-radius: 999px`，accent 背景，悬停时光晕增强 + SVG 箭头右移 `4px`
- 入场：`cta-enter 0.8s ease-out forwards`（translateY + scale 0.97→1）

---

### Testimonial

用户评价卡片，带引号图标、星级评分。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `quote` | `string` | — | 评价内容（必填） |
| `author` | `string` | — | 作者姓名（必填） |
| `role` | `string` | — | 职位/身份（可选） |
| `rating` | `number` | `5` | 星级 0–5 |
| `mode` | `'dark' \| 'light'` | `'dark'` | 背景模式 |

#### 使用示例

```mdx
import Testimonial from '@/components/Testimonial.astro';

<Testimonial
  quote="Slax 彻底改变了我管理信息的方式，效率提升了 300%。"
  author="张三"
  role="产品经理 @ TechCorp"
  rating={5}
  mode="dark"
/>
```

#### 视觉规范

- 引号图标：`quote-icon-float 7s ease-in-out infinite`（±4px + ±2deg）
- 星星颜色：`#f59e0b`（Amber）
- 作者名：全大写，`letter-spacing: 0.05em`
- 底部光晕：`glow-breathe 5s infinite`（opacity 0.6→1，scale 1→1.1）
- 入场：`testimonial-enter 0.8s ease-out forwards`

---

### TextImage

图文并排区块，支持图片左右位置切换。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 标题（必填） |
| `description` | `string` | — | 描述（必填） |
| `image` | `string` | — | 图片路径（必填） |
| `imageAlt` | `string` | `''` | 图片 alt 文字 |
| `imagePosition` | `'left' \| 'right'` | `'right'` | 图片位置 |

#### 使用示例

```mdx
import TextImage from '@/components/TextImage.astro';

<TextImage
  title="专注阅读，<strong>减少干扰</strong>"
  description="简洁的界面设计，让你专注于内容本身。"
  image="/images/reader-preview.png"
  imageAlt="Reader 界面预览"
  imagePosition="right"
/>
```

#### 视觉规范

- 桌面：flex 行布局，`imagePosition="left"` 时图片在左（`flex-direction: row-reverse`）
- `<strong>` 标签：`--sl-color-accent` 颜色（非渐变）
- 图片悬停：`translateY(-4px)` + 增强 `box-shadow`
- 多个 TextImage 相邻时：`border-top: 1px solid var(--sl-color-gray-5)` 分隔线

---

### Highlight

内联文字高亮，四种样式变体。

#### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'color' \| 'fill' \| 'tilt' \| 'gradient'` | `'color'` | 高亮样式 |

#### 使用示例

```mdx
import Highlight from '@/components/Highlight.astro';

这是一段包含 <Highlight type="gradient">渐变高亮</Highlight> 的文字。
```

#### 四种样式对比

| `type` | 效果描述 | 典型用途 |
|--------|---------|---------|
| `color` | accent 颜色文字，font-weight 600 | 普通强调 |
| `fill` | accent 背景 + 黑色文字，圆角 | 标签式强调 |
| `tilt` | 旋转 -1.5deg 的 accent 背景色块 | 手写感强调 |
| `gradient` | 渐变 clip 文字（accent → accent-high） | 视觉冲击强调 |

---

## MDX 使用示例

以下是一个完整的落地页 MDX 结构示例：

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
    - text: 了解更多
      link: /docs
      variant: minimal
---

import ProductGrid from '@/components/ProductGrid.astro';
import ProductCard from '@/components/ProductCard.astro';
import FeatureGrid from '@/components/FeatureGrid.astro';
import FeatureCard from '@/components/FeatureCard.astro';
import CallToAction from '@/components/CallToAction.astro';
import Testimonial from '@/components/Testimonial.astro';
import TextImage from '@/components/TextImage.astro';
import Highlight from '@/components/Highlight.astro';

<FeatureGrid title="为什么选择我们" columns={3}>
  <FeatureCard title="功能一" description="..." icon="..." />
  <FeatureCard title="功能二" description="..." icon="..." />
  <FeatureCard title="功能三" description="..." icon="..." />
</FeatureGrid>

<ProductGrid title="产品矩阵">
  <ProductCard title="产品A" description="..." href="..." hue={238} />
  <ProductCard title="产品B" description="..." href="..." hue={163} />
</ProductGrid>

<TextImage
  title="核心优势"
  description="..."
  image="/images/preview.png"
  imagePosition="right"
/>

<Testimonial
  quote="..."
  author="用户姓名"
  role="职位"
  rating={5}
/>

<CallToAction
  title="立即开始"
  description="..."
  primaryText="免费试用"
  primaryLink="/start"
/>
```

---

## 可访问性规范

### 减少动效

所有动画通过媒体查询降级：

```css
@media (prefers-reduced-motion: reduce) {
  /* 禁用所有入场动画 */
  .product-card,
  .feature-card,
  .cta-section,
  .testimonial-card {
    animation: none;
    opacity: 1;
    transform: none;
  }

  /* 禁用背景光球 */
  [data-has-hero]::before,
  [data-has-hero]::after {
    animation: none;
  }

  /* 禁用英雄图片漂浮 */
  .hero > img,
  .hero .hero-html {
    animation: none;
  }

  /* 禁用渐变文字流动 */
  .hero h1 {
    animation: none;
    background-position: 0% center;
  }
}
```

### 焦点样式

交互元素（按钮、卡片链接）需保留清晰的 `:focus-visible` 轮廓：

```css
.sl-link-button:focus-visible,
.product-card:focus-visible {
  outline: 2px solid var(--sl-color-accent);
  outline-offset: 3px;
}
```

### 语义化规范

- 组件标题使用正确的标题层级（`h2` 为区块标题，`h3` 为卡片标题）
- 图片必须提供有意义的 `alt` 文字（装饰性图片使用 `alt=""`）
- 所有图标 SVG 使用 `aria-hidden="true"`

---

## 文件结构

```
apps/
├── slax-home/
│   ├── src/
│   │   ├── styles/
│   │   │   ├── landing.css       # 落地页动画与交互样式（--brand-hsl: indigo）
│   │   │   └── custom.css        # Starlight Token 覆盖（data-site="home"）
│   │   ├── components/
│   │   │   ├── ProductCard.astro
│   │   │   ├── ProductGrid.astro
│   │   │   ├── FeatureCard.astro
│   │   │   ├── FeatureGrid.astro
│   │   │   ├── CallToAction.astro
│   │   │   ├── Testimonial.astro
│   │   │   ├── TextImage.astro
│   │   │   └── Highlight.astro
│   │   └── content/docs/
│   │       ├── index.mdx          # 英文落地页
│   │       └── zh/index.mdx       # 中文落地页
├── reader-home/
│   └── src/styles/
│       ├── landing.css            # --brand-hsl: green-teal
│       └── custom.css             # data-site="reader"
└── note-home/
    └── src/styles/
        ├── landing.css            # --brand-hsl: cyan
        └── custom.css             # data-site="note"

docs/
└── style-guide.md                 # 本文档
```

---

*最后更新：2026-04-01*
