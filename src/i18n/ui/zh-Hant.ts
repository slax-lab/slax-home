// 繁體中文 UI 字串。結構必須與 en.ts 完全對齊。

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax —— 認真閱讀，認真書寫',
		defaultDescription:
			'Slax 為長內容打造一個閱讀器和一個筆記本，專注於慢慢來的軟體。',
		blogTitle: 'Slax 部落格',
		readerBlogTitle: 'Slax Reader 部落格',
		noteBlogTitle: 'Slax Note 部落格',
		readerChangelogTitle: 'Slax Reader 更新日誌',
		noteChangelogTitle: 'Slax Note 更新日誌',
		readerAlternativesTitle: 'Slax Reader 對比',
		noteAlternativesTitle: 'Slax Note 對比',
		aboutTitle: '關於 Slax',
		privacyTitle: '私隱政策',
		termsTitle: '服務條款',
		notFoundTitle: '找不到頁面',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: '部落格',
		brand: 'Slax',
		languageSwitcher: '語言',
	},
	footer: {
		brandTagline: '工具簡單，生活從容。',
		sections: {
			products: '產品',
			reader: 'Reader',
			note: 'Note',
			company: '公司',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: '更新日誌',
			vsAlternatives: '對比',
			blog: '部落格',
			about: '關於',
			privacy: '私隱政策',
			terms: '服務條款',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · 更新於 {lastUpdated}',
	},
	common: {
		readMore: '閱讀全文',
		backToTop: '回到頂部',
		published: '發佈於',
		updated: '更新於',
		tags: '標籤',
		platforms: '平台',
		version: '版本',
		date: '日期',
		next: '下一篇',
		previous: '上一篇',
	},
	notFound: {
		heading: '找不到頁面',
		body: '你想找的頁面已經搬走或從未存在。請從頂部導覽回到首頁。',
		homeLink: '回到首頁',
		readBlogLink: '看看部落格',
	},
	about: {
		eyebrow: '關於',
		heading: 'Slax Lab 在做關於「專注」的小軟體。',
		lede: '總部新加坡，同事散落各地。',
		sectionHeading: '聯絡我們',
		note: '我們喜歡與認真閱讀和書寫的人聊天。挑一個順手的方式。',
		channels: {
			x: '在 X 上',
			reddit: '在 Reddit 上',
			github: '在 GitHub 上',
			discord: '在 Discord 上',
			email: '寄電郵',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: '簡單。從容。長期。',
			lede: '我們自己想用的軟體——Slax Reader 與 Slax Note，做得小，做得久。',
		},
		comingSoon: '本地化著陸頁正在準備中。完整英文版在',
	},
};

export default ui;
