// 繁體中文 UI 字串。結構必須與 en.ts 完全對齊。
// 用詞偏好台灣 / 香港：軟體、資訊流、設定、登入。

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax —— 給認真讀寫的人的工具',
		defaultDescription:
			'Slax Lab 做小而美且長期的軟體，現在有 Slax Reader 和 Slax Note。',
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
		notFoundTitle: '找不到這個頁面',
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
			company: '關於',
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
		versionMeta: 'v{version} · 最近更新 {lastUpdated}',
	},
	common: {
		readMore: '繼續讀',
		backToTop: '回到頂部',
		published: '發佈',
		updated: '更新',
		tags: '標籤',
		platforms: '平台',
		version: '版本',
		date: '日期',
		next: '下一篇',
		previous: '上一篇',
	},
	notFound: {
		heading: '找不到這個頁面',
		body: '頁面不存在。',
		homeLink: '回首頁',
		readBlogLink: '看看部落格',
	},
	about: {
		eyebrow: '關於',
		heading: '給認真的人做安靜的工具。',
		lede: '公司在新加坡，同事散在各地。',
		sectionHeading: '聯絡我們',
		note: '我們喜歡和認真讀寫的人聊。下面任選一種聯絡方式。',
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
			lede: '做我們自己想用的小而美且長期的軟體。',
		},
		comingSoon: '中文版還在做。完整版在',
	},
	changelog: {
		headline: '每一版都在這裡。',
		emptyState: '中文版的更新日誌還在翻。完整版在',
		latestIs: '最新版',
		shippedOn: '發佈於',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: '簡單純粹的稍後讀工具。',
		bullets: [
			'沒有演算法，沒有資訊流。下一篇讀什麼，自己挑。',
			'免費無限網頁快照。',
			'開源。',
		],
		features: [
			{
				title: 'AI 輔助理解。',
				body: '立即出摘要、提重點。看不懂的內容可以直接問 AI。',
			},
			{
				title: '存了就不會丟',
				body: '一次存下，永久備份。再也不用怕 404。',
			},
			{
				title: '和別人一起讀',
				body: '在同一篇文章上劃重點、留評論，看別人怎麼讀。',
			},
		],
		ctaPrimary: '用瀏覽器打開',
		ctaSecondary: '看英文版',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: '說一段話，幾秒整成清晰流暢的文字。',
		bullets: [
			'一鍵錄音。',
			'AI 自動去贅字、加標點。',
			'可以將文字或圖片發到任何地方。',
		],
		features: [
			{
				title: '隨時記下',
				body: '走路、開車、開會的時候，一鍵把剛冒出來的想法存下來。',
			},
			{
				title: 'AI 整理成乾淨的文字',
				body: '轉寫準確，自動加標點，按你的口吻重新整理。',
			},
			{
				title: '發到任何地方',
				body: '複製文字或轉成圖片，發送到你的常用工具。',
			},
		],
		ctaPrimary: '在 App Store 下載',
		ctaSecondary: '看英文版',
	},
};

export default ui;
