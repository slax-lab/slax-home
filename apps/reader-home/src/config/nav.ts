export type NavLink = {
	label: string;
	href: string;
	translations?: Record<string, string>;
};

export type NavDropdown = {
	label: string;
	translations?: Record<string, string>;
	children: (NavLink | NavGroup)[];
};

export type NavGroup = {
	label: string;
	href: string;
	translations?: Record<string, string>;
	children: NavLink[];
};

export type NavItem = NavLink | NavDropdown;

export type NavAction = {
	label: string;
	href: string;
	variant: 'ghost' | 'primary';
	translations?: Record<string, string>;
};

export function isNavDropdown(item: NavItem): item is NavDropdown {
	return 'children' in item;
}

export function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
	return 'children' in item;
}

// Left-side nav items: main links + resources dropdown
export const navItems: NavItem[] = [
	{
		label: 'Pricing',
		translations: { 'zh-CN': '定价' },
		href: '/reader/pricing',
	},
	{
		label: 'Download',
		translations: { 'zh-CN': '下载' },
		href: '/reader/download',
	},
	{
		label: 'Resources',
		translations: { 'zh-CN': '资源' },
		children: [
			{ label: 'Blog', translations: { 'zh-CN': '博客' }, href: '/blog/' },
			{
				label: 'Compare',
				translations: { 'zh-CN': '对比' },
				href: '/blog/',
				children: [
					{ label: 'vs Instapaper', href: '/compare/slax-reader-vs-instapaper/' },
				],
			},
		],
	},
];

// Right-side action buttons
export const navActions: NavAction[] = [
	{
		label: 'Start Free →',
		translations: { 'zh-CN': '免费开始 →' },
		href: 'https://r.slax.com/login',
		variant: 'primary',
	},
];
