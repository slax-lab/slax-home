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

export function isNavDropdown(item: NavItem): item is NavDropdown {
	return 'children' in item;
}

export const navItems: NavItem[] = [
	{
		label: 'Pricing',
		translations: { 'zh-CN': '定价' },
		href: '/reader/pricing',
	},
	// 新增普通链接示例：
	// { label: 'Download', translations: { 'zh-CN': '下载' }, href: '/reader/download' },
	//
	// 新增下拉菜单示例：
	// {
	//   label: 'Guides',
	//   translations: { 'zh-CN': '指南' },
	//   children: [
	//     { label: 'Tutorials', href: '/reader/guides/example' },
	//     { label: 'Blog', href: '/reader/blog' },
	//   ],
	// },
];
