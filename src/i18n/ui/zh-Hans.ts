// 简体中文 UI 字符串。结构必须与 en.ts 完全对齐。

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax —— 给认真读写的人的工具',
		defaultDescription:
			'Slax Lab 做小而美且长期的软件，现在有 Slax Reader 和 Slax Note。',
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
		notFoundTitle: '没找到这个页面',
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
			company: '关于',
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
		versionMeta: 'v{version} · 最近更新 {lastUpdated}',
	},
	common: {
		readMore: '继续读',
		backToTop: '回到顶部',
		published: '发布',
		updated: '更新',
		tags: '标签',
		platforms: '平台',
		version: '版本',
		date: '日期',
		next: '下一篇',
		previous: '上一篇',
		byAuthor: '作者 {author}',
	},
	notFound: {
		heading: '没找到这个页面',
		body: '页面不存在。',
		homeLink: '回首页',
		readBlogLink: '看看博客',
	},
	about: {
		eyebrow: '关于',
		heading: '给认真的人做安静的工具。',
		lede: '公司在新加坡，同事散在各地。',
		sectionHeading: '联系我们',
		note: '我们喜欢和认真读写的人聊。下面任选一种联系方式。',
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
			lede: '做我们自己想用的软件。Slax Reader 和 Slax Note——小而美，做得长久。',
		},
		comingSoon: '中文版还在做。完整版在',
	},
	changelog: {
		headline: '每一版都在这里。',
		emptyState: '中文版的更新日志还在翻。完整版在',
		latestIs: '最新版',
		shippedOn: '发布于',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: '简单纯粹的稍后读工具。',
		bullets: [
			'没有算法，没有信息流。下一篇读什么，自己挑。',
			'免费无限网页快照。',
			'开源。',
		],
		features: [
			{
				title: 'AI 辅助理解。',
				body: '立即出摘要、提重点。看不懂的内容可以直接问 AI。',
			},
			{
				title: '存了就不会丢',
				body: '一次存下，永久备份。再也不用怕 404。',
			},
			{
				title: '和别人一起读',
				body: '在同一篇文章上划重点、留评论，看别人怎么读。',
			},
		],
		ctaPrimary: '用浏览器打开',
		ctaSecondary: '看英文版',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: '说一段话，几秒整成清晰流畅的文字。',
		bullets: [
			'一键录音。',
			'AI 自动去口水词、加标点。',
			'可以将文字或图片发到任何地方。',
		],
		features: [
			{
				title: '随时记下',
				body: '走路、开车、开会的时候，一键把刚冒出来的想法存下来。',
			},
			{
				title: 'AI 整理成干净的文字',
				body: '转写准确，自动加标点，按你的口吻重新整理。',
			},
			{
				title: '发到任何地方',
				body: '复制文字或转成图片，发送到你的常用工具。',
			},
		],
		ctaPrimary: '在 App Store 下载',
		ctaSecondary: '看英文版',
	},
};

export default ui;
