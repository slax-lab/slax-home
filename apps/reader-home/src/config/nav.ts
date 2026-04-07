export type NavLink = {
	label: string;
	href: string;
	translations?: Record<string, string>;
};

export type NavDropdown = {
	label: string;
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

// Left-side nav items: product dropdown + main links + resources dropdown
export const navItems: NavItem[] = [
	{
		label: 'Slax',
		translations: { 'zh-CN': 'Slax' },
		children: [
			{ label: 'Slax Home', translations: { 'zh-CN': 'Slax 主站' }, href: '/' },
			{ label: 'Slax Reader', translations: { 'zh-CN': 'Slax Reader' }, href: '/reader/' },
			{ label: 'Slax Note', translations: { 'zh-CN': 'Slax Note' }, href: '/note/' },
		],
	},
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
			{ label: 'Blog', translations: { 'zh-CN': '博客' }, href: '#' },
			{ label: 'Guides', translations: { 'zh-CN': '指南' }, href: '#' },
			{ label: 'Tutorials', translations: { 'zh-CN': '教程' }, href: '#' },
		],
	},
];

// Right-side action buttons
export const navActions: NavAction[] = [
	{
		label: 'Sign In',
		translations: { 'zh-CN': '登录' },
		href: '#',
		variant: 'ghost',
	},
	{
		label: 'Start Free →',
		translations: { 'zh-CN': '免费开始 →' },
		href: '/reader/download',
		variant: 'primary',
	},
];
