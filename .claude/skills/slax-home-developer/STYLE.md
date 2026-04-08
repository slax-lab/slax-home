# 官网色调风格文档（供 AI Agent 使用）

## 1. 核心色彩规范（必须严格遵循）

### 主色调（品牌主色）
- **色值**：`#16B998`
- **使用比例**：不超过页面 15%，不允许铺满大面积背景
- **应用场景**：页面头部导航栏、按钮（默认状态）、标题文字、重点强调元素

### 辅助色（功能色）
- **次要交互色**：`#1CB0B5`
  **应用场景**：按钮（悬停 / 激活状态）
- **链接文字**：`#5490C2`
  **悬浮状态**：加深 10%（除非需要，否则禁止下划线）
- **成功色**：`#0F1419`
  **应用场景**：成功提示、完成状态、Toast 提示
- **警告色**：`#FF6838`
  **应用场景**：警告提示、未完成状态、提醒边框
- **错误色**：`#FF6838`
  **应用场景**：错误提示、必填项未填、删除按钮

### 中性色（基础色）
- **背景主色**：`#FFFFFF`
  **应用场景**：页面整体背景、卡片背景
- **背景次色**：`#F8F9FA`
  **应用场景**：区块分隔背景、侧边栏背景
- **文字主色**：`#1F1F1F`
  **应用场景**：标题文字
- **文字次色**：`#333333`
  **应用场景**：正文文字
- **辅助文字 / 更浅灰色**：`#999999`
  **应用场景**：辅助说明文字、占位符文字
- **边框色**：`#ECF0F5`
  **应用场景**：输入框边框、卡片边框、分隔线

### 文字色彩层级
- **一级标题**：`#1F1F1F` 或主色 `#16B998`
- **二级标题**：`#1F1F1F`
- **正文**：`#333333`
- **辅助文字**：`#999999`

## 2. 风格要求
- **整体风格**：简约现代
- **字体**：`apple-system, "system-ui", "Segoe UI", Roboto, sans-serif`
- **行高**：1.5 ~ 1.8
- **字号层级**：按需发挥，要求主次分明、层级清晰
- **额外要求**：色彩过渡自然，避免大面积高饱和度对比，重点元素用主色突出

## 3. 圆角规范
- **按钮圆角 / Toast 提示圆角**：6px
- **卡片圆角**：12px
- **输入框圆角**：8px
- **头像 / 小标签圆角**：4px 或 999px

## 4. 阴影规范
- **阴影参数**：水平偏移 `0px`，垂直偏移 `30px`，模糊 `60px`，不扩展
- **阴影颜色**：`rgba(0, 0, 0, 0.08)`
- **CSS 写法**：

```css
box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.08);
```

- **要求**：禁止使用厚重、深色、高对比阴影

## 5. 间距 / 留白规范
- **模块间距**：24px / 32px / 48px / 68px / 100px
- **卡片内边距**：32px
- **页面左右边距**：
  - 移动端：24px
  - PC：48px
- **要求**：禁止元素挤在一起，保持呼吸感

## 6. 按钮样式规范
- **主按钮**：背景主色 `#16B998`，文字白色
- **次按钮**：背景透明，边框主色或 `#ECF0F5`
- **文字按钮**：无背景、无边框，仅文字颜色
- **按钮禁用态**：透明度 `0.6`，不可点击

## 7. 输入框 / 表单样式规范
- **默认状态**：白色背景 + `#ECF0F5` 边框
- **聚焦状态**：主色 `#16B998` 高亮边框
- **错误状态**：`#FF6838` 红色边框 + 提示文字

## 8. 图标与色彩搭配
- **功能图标**：跟随文字颜色
- **操作图标**：主色 `#16B998`
- **警示图标**：`#FF6838`

---

# 落地页设计系统（Landing Page）

> 适用于 slax-home、reader-home、note-home 三个子应用的落地页。

## 9. 各应用主题色

| 应用 | 品牌色 | `--brand-hsl` | 暗色 Accent | 亮色 Accent |
|------|--------|--------------|-------------|-------------|
| slax-home | 靛蓝 Indigo | `238, 73%, 61%` | `#4f5de6` | `#3d4bdb` |
| reader-home | 绿青 Green-Teal | `163, 79%, 41%` | `#14b87a` | `#0d9e68` |
| note-home | 青蓝 Cyan | `181, 53%, 55%` | `#4ec8d4` | `#2bb5c2` |

### Starlight Token 覆盖（以 slax-home 为例）

```css
html[data-site="home"] {
  --sl-color-accent:     #4f5de6;
  --sl-color-accent-low: #1a1a40;
  --sl-color-accent-high:#c5c9ff;
}
html[data-site="home"]:not([data-theme="dark"]) {
  --sl-color-accent:     #3d4bdb;
  --sl-color-accent-low: #dde0ff;
  --sl-color-accent-high:#182068;
}
```

### 渐变文字规范

标题渐变文字统一使用以下模式（跟随主题色自动变化）：

```css
background: linear-gradient(135deg, var(--sl-color-accent-high), var(--sl-color-accent), var(--sl-color-accent-high));
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: gradient-shift 6s linear infinite;
```

在渐变标题中，`<strong>` 标签用于打断渐变、突出纯白文字：

```css
strong { -webkit-text-fill-color: var(--sl-color-white); font-weight: 700; }
```

## 10. 落地页 CSS 变量

| 变量 | 作用域 | 说明 |
|------|--------|------|
| `--brand-hsl` | `[data-has-hero]` | 当前应用品牌色 HSL 分量，构造 `hsla()` 渐变 |
| `--card-hue` | `.product-card` | 单个 ProductCard 的色相值，内联注入 |
| `--img-left` | `.text-image` | 控制 TextImage 图片位置 |

常用 Starlight Token：`--sl-color-accent`、`--sl-color-accent-high`、`--sl-color-accent-low`、`--sl-color-gray-1~7`、`--sl-color-black`、`--sl-color-white`

## 11. 动画规范

**设计原则**：仅使用 `transform` 和 `opacity`，配合 `will-change: transform` 开启 GPU 合成层，保持 60fps。

### 入场动画（一次性，`animation-fill-mode: forwards`）

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes card-enter {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

多子元素错开延迟（间隔 120–150ms）：

```css
.card-grid > .card:nth-child(1) { animation-delay: 0.15s; }
.card-grid > .card:nth-child(2) { animation-delay: 0.27s; }
.card-grid > .card:nth-child(3) { animation-delay: 0.39s; }
```

### 环境动画（无限循环，营造生命感）

```css
@keyframes hero-img-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes gradient-shift   { 0%{background-position:0% center} 100%{background-position:200% center} }
@keyframes btn-glow-pulse   { 0%,100%{box-shadow:0 0 0 0 hsla(var(--brand-hsl),0)} 50%{box-shadow:0 0 18px 4px hsla(var(--brand-hsl),0.45)} }
@keyframes card-border-breathe { 0%,100%{border-color:hsla(var(--card-hue),65%,55%,0.2)} 50%{border-color:hsla(var(--card-hue),65%,55%,0.5)} }
@keyframes icon-breathe     { 0%,100%{box-shadow:0 0 0 0 color-mix(in srgb,var(--sl-color-accent) 0%,transparent)} 50%{box-shadow:0 0 12px 2px color-mix(in srgb,var(--sl-color-accent) 60%,transparent)} }
@keyframes cta-glow-breathe { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
```

### 背景光球动画

页面背景两个伪元素光球，轨迹不同步以产生自然感：

| 光球 | 伪元素 | 尺寸 | 周期 | 位置 |
|------|--------|------|------|------|
| 主光球 | `::before` | `105vw` 圆 | 18s | 右上角（top:-20vh, right:-20vw） |
| 次光球 | `::after` | `60rem` 圆 | 22s | 左下角（bottom:-15rem, left:-10rem） |

```css
[data-has-hero]::before {
  background: radial-gradient(circle, hsla(var(--brand-hsl),0.13) 0%, transparent 70%);
  filter: blur(40px); animation: orb-drift-1 18s ease-in-out infinite; will-change: transform;
}
[data-has-hero]::after {
  background: radial-gradient(circle, hsla(var(--brand-hsl),0.10) 0%, transparent 65%);
  filter: blur(50px); animation: orb-drift-2 22s ease-in-out infinite; will-change: transform;
}
```

### 可访问性（必须）

所有动画提供降级：

```css
@media (prefers-reduced-motion: reduce) {
  .product-card, .feature-card, .cta-section { animation: none; opacity: 1; transform: none; }
  [data-has-hero]::before, [data-has-hero]::after { animation: none; }
  .hero h1 { animation: none; background-position: 0% center; }
}
```

## 12. 落地页组件规范

所有组件位于 `apps/slax-home/src/components/`，三个子应用共享。

### ProductCard

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 卡片标题（必填） |
| `description` | `string` | — | 描述文字（必填） |
| `href` | `string` | — | 跳转链接（必填） |
| `hue` | `number` | `238` | 色相值 0–360 |
| `cta` | `string` | `'了解更多'` | CTA 文字 |

视觉：背景 `135deg` 渐变（基于 `--card-hue`）；入场 `card-enter 0.7s`；空闲 `card-border-breathe 4s`；悬停 `translateY(-5px)` + shimmer 边框。

### ProductGrid

| Prop | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 区块标题（可选） |

网格：`repeat(auto-fill, minmax(280px, 1fr))`，间距 `1.5rem`。标题使用 accent 渐变文字 + `gradient-shift 6s`。

### FeatureCard

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 特性标题（必填） |
| `description` | `string` | — | 特性描述（必填） |
| `icon` | `string` | — | SVG 字符串（必填） |
| `layout` | `'top'\|'side'` | `'top'` | 图标位置 |
| `iconStyle` | `'square'\|'plain'` | `'square'` | 图标样式 |

Square 图标：`2.75rem`，`border-radius: 0.625rem`，`icon-breathe 3.5s infinite`；悬停 `translateY(-4px)` + accent 边框。

### FeatureGrid

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 区块标题（可选） |
| `description` | `string` | — | 区块描述（可选） |
| `columns` | `2\|3\|4` | `3` | 列数（桌面端） |

子卡片错开入场：`feature-enter`，延迟 0.05s ~ 0.54s（每项增加约 0.1s）；响应式 1列（移动）→ 2列（平板）→ columns 列（桌面）。

### CallToAction

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 主标题（必填） |
| `description` | `string` | — | 描述文字（必填） |
| `primaryText` | `string` | — | 主按钮文字 |
| `primaryLink` | `string` | — | 主按钮链接 |
| `secondaryText` | `string` | — | 次按钮文字 |
| `secondaryLink` | `string` | — | 次按钮链接 |
| `mode` | `'dark'\|'light'` | `'dark'` | 背景模式 |

主按钮：`border-radius: 999px`，accent 背景，悬停 SVG 箭头右移 4px；光晕 `cta-glow-breathe 5s`。

### TextImage

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 标题（必填） |
| `description` | `string` | — | 描述（必填） |
| `image` | `string` | — | 图片路径（必填） |
| `imageAlt` | `string` | `''` | 图片 alt |
| `imagePosition` | `'left'\|'right'` | `'right'` | 图片位置 |

`imagePosition="left"` 时 `flex-direction: row-reverse`；多个 TextImage 相邻时加 `border-top: 1px solid var(--sl-color-gray-5)` 分隔线。

### Highlight

| `type` | 效果 | 典型用途 |
|--------|------|---------|
| `color` | accent 颜色文字，font-weight 600 | 普通强调 |
| `fill` | accent 背景 + 黑色文字，圆角 | 标签式强调 |
| `tilt` | 旋转 -1.5deg 的 accent 背景色块 | 手写感强调 |
| `gradient` | 渐变 clip 文字（accent → accent-high） | 视觉冲击强调 |

```mdx
<Highlight type="gradient">渐变高亮</Highlight>
```

## 13. 语义化规范

- 组件标题层级：`h2` 为区块标题，`h3` 为卡片标题
- 图片必须提供有意义的 `alt`（装饰性图片用 `alt=""`）
- 所有图标 SVG 使用 `aria-hidden="true"`
- 交互元素保留清晰的 `:focus-visible` 轮廓：`outline: 2px solid var(--sl-color-accent); outline-offset: 3px;`
