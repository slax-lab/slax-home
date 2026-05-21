// 简体中文 UI 字符串。结构必须与 en.ts 完全对齐。

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax —— 认真阅读，认真书写',
		defaultDescription:
			'Slax 做一个阅读器和一个笔记本，专为长内容设计的慢软件。',
		blogTitle: 'Slax 博客',
		readerBlogTitle: 'Slax Reader 博客',
		noteBlogTitle: 'Slax Note 博客',
		readerChangelogTitle: 'Slax Reader 更新日志',
		noteChangelogTitle: 'Slax Note 更新日志',
		readerAlternativesTitle: 'Slax Reader 对比',
		noteAlternativesTitle: 'Slax Note 对比',
		aboutTitle: '关于 Slax',
		privacyTitle: '隐私政策',
		termsTitle: '服务条款',
		notFoundTitle: '页面未找到',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: '博客',
		brand: 'Slax',
		languageSwitcher: '语言',
	},
	footer: {
		brandTagline: '工具简单，生活从容。',
		sections: {
			products: '产品',
			reader: 'Reader',
			note: 'Note',
			company: '公司',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: '更新日志',
			vsAlternatives: '对比',
			blog: '博客',
			about: '关于',
			privacy: '隐私政策',
			terms: '服务条款',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · 更新于 {lastUpdated}',
	},
	common: {
		readMore: '阅读全文',
		backToTop: '回到顶部',
		published: '发布于',
		updated: '更新于',
		tags: '标签',
		platforms: '平台',
		version: '版本',
		date: '日期',
		next: '下一篇',
		previous: '上一篇',
	},
	notFound: {
		heading: '页面未找到',
		body: '你访问的页面已经搬走或从未存在。请从顶部导航回到首页。',
		homeLink: '回到首页',
		readBlogLink: '读读博客',
	},
	about: {
		eyebrow: '关于',
		heading: 'Slax Lab 在做关于「专注」的小软件。',
		lede: '总部新加坡，同事散布在别处。',
		sectionHeading: '联系我们',
		note: '我们喜欢与认真阅读和写作的人聊天。挑一个顺手的渠道。',
		channels: {
			x: '在 X 上',
			reddit: '在 Reddit 上',
			github: '在 GitHub 上',
			discord: '在 Discord 上',
			email: '发邮件',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: '简单。从容。长期。',
			lede: '我们自己想用的软件——Slax Reader 和 Slax Note，做得小，做得久。',
		},
		comingSoon: '本地化着陆页正在准备中。完整英文版在',
	},
	changelog: {
		headline: '所有版本，一处查阅。',
		emptyState: '本语言版本的更新日志还在翻译中。完整版在',
		latestIs: '最新版本',
		shippedOn: '发布于',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: '稍后读不必什么都做。',
		bullets: [
			'没有算法、没有信息流。下一篇读什么，你说了算。',
			'无限快照，免费。',
			'开源。',
		],
		features: [
			{
				title: 'AI 帮你理解',
				body: '一键摘要、要点提炼、就文章内容直接问 AI。',
			},
			{
				title: '文章永不失效',
				body: '保存一次，永久备份。从此不再遇到 404。',
			},
			{
				title: '边读边讨论',
				body: '在同一篇文章上高亮、评论、和其他读者交流。',
			},
		],
		ctaPrimary: '浏览器中打开',
		ctaSecondary: '查看完整英文版',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: '说出来的话，几秒变成精修的文字。',
		bullets: [
			'一键录音，捕捉灵感。',
			'AI 自动去口水词、加标点、润色语气。',
			'文本或图片，随处分享。',
		],
		features: [
			{
				title: '瞬间捕捉',
				body: '走路、开车、开会，一键记下一闪而过的想法。',
			},
			{
				title: 'AI 润色',
				body: '准确转写，自动断句加标点，按你的语气重排成文。',
			},
			{
				title: '任意分享',
				body: '复制为文字，或导出为图片。无缝接入你已经在用的工具。',
			},
		],
		ctaPrimary: '从 App Store 下载',
		ctaSecondary: '查看完整英文版',
	},
};

export default ui;
