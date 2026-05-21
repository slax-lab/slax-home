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
	changelog: {
		headline: '所有版本，一處查閱。',
		emptyState: '本地化版本的更新日誌還在翻譯中。完整版在',
		latestIs: '最新版本',
		shippedOn: '發佈於',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: '稍後讀不必什麼都做。',
		bullets: [
			'沒有演算法、沒有資訊流。下一篇讀什麼，你說了算。',
			'無限快照，免費。',
			'開源。',
		],
		features: [
			{
				title: 'AI 幫你理解',
				body: '一鍵摘要、要點提煉、針對文章內容直接問 AI。',
			},
			{
				title: '文章永不失效',
				body: '儲存一次，永久備份。從此不再遇到 404。',
			},
			{
				title: '邊讀邊討論',
				body: '在同一篇文章上劃重點、留言，與其他讀者交流。',
			},
		],
		ctaPrimary: '在瀏覽器中開啟',
		ctaSecondary: '查看完整英文版',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: '說出來的話，幾秒變成精煉的文字。',
		bullets: [
			'一鍵錄音，抓住靈感。',
			'AI 自動去除贅字、加標點、潤色語氣。',
			'文字或圖片，任意分享。',
		],
		features: [
			{
				title: '瞬間捕捉',
				body: '走路、開車、開會，一鍵記下一閃而過的想法。',
			},
			{
				title: 'AI 潤色',
				body: '準確轉寫，自動斷句加標點，按你的語氣重排成文。',
			},
			{
				title: '任意分享',
				body: '複製為文字，或匯出為圖片。無縫接入你已在用的工具。',
			},
		],
		ctaPrimary: '在 App Store 下載',
		ctaSecondary: '查看完整英文版',
	},
};

export default ui;
