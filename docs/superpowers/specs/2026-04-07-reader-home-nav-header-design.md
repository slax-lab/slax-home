# reader-home 顶栏导航设计文档

**日期：** 2026-04-07  
**项目：** apps/reader-home  
**分支：** feature/pricing

---

## 目标

在 reader-home 顶栏（header）中加入可配置的导航链接区域，支持：
- 普通链接（点击直接跳转）
- 下拉菜单（hover/click 展开子项）

现有顶栏功能（GitHub、Twitter、语言切换、主题切换、搜索）全部保留原位。

---

## 布局

```
[Slax Reader logo]    [navItems 区域]    [GitHub] [Twitter] [语言] [主题]
```

navItems 区域位于 logo 右侧、社媒图标左侧。

---

## 文件结构

新增两个文件，不修改现有文件（除 astro.config.mjs 注册组件）：

```
apps/reader-home/src/
├── config/
│   └── nav.ts               ← 唯一需要维护的配置文件
└── components/
    └── NavHeader.astro      ← 顶栏导航组件
```

修改一处：
```
apps/reader-home/astro.config.mjs   ← 注册 NavHeader 覆盖 Header 组件
```

---

## nav.ts 配置结构

```ts
export type NavItem =
  | { label: string; href: string; translations?: Record<string, string> }
  | { label: string; children: NavItem[]; translations?: Record<string, string> };

export const navItems: NavItem[] = [
  {
    label: 'Pricing',
    translations: { 'zh-CN': '定价' },
    href: '/reader/pricing',
  },
  // 以后加 Download：
  // { label: 'Download', translations: { 'zh-CN': '下载' }, href: '/reader/download' },
  //
  // 以后加下拉菜单：
  // { label: 'Guides', translations: { 'zh-CN': '指南' }, children: [
  //   { label: 'Tutorials', href: '/reader/guides' },
  //   { label: 'Blog', href: '/reader/blog' },
  // ]},
];
```

---

## NavHeader.astro 行为

- 复用 Starlight 内置的 `<Header>` 组件（保留 logo、社媒、语言、主题、搜索）
- 在 logo 和社媒区域之间插入 navItems 渲染区域
- 普通链接：`<a>` 直接跳转，当前页高亮
- 下拉菜单：hover 展开，点击外部关闭，移动端点击展开
- 样式遵循 STYLE.md（主色 `#16b998`，圆角 6px，字体系统字体）

---

## 样式规范

- 链接默认色：`var(--sl-color-gray-2)`
- 链接 hover / 当前页：`var(--sl-color-accent)`（`#16b998`）
- 下拉面板：白色背景，圆角 8px，阴影 `0 30px 60px 0 rgba(0,0,0,0.08)`
- 移动端：折叠到汉堡菜单内（Starlight 自带移动端 header 处理）

---

## 成功标准

- [ ] 顶栏出现 Pricing 链接，点击跳转 `/reader/pricing`
- [ ] 中文版顶栏显示"定价"，跳转 `/reader/zh/pricing`
- [ ] GitHub、Twitter、语言切换、主题切换位置不变
- [ ] 以后在 `nav.ts` 加一行即可新增顶栏入口
- [ ] 以后在 `nav.ts` 加 `children` 即可变为下拉菜单
- [ ] dev server 正常启动，无报错

---

## 不在本次范围内

- 多级嵌套下拉（下拉里再套下拉）
- 移动端独立汉堡菜单样式定制
- sidebar 里的 Pricing 入口清理（可选，建议一并做）
