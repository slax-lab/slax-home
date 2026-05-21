// 日本語 UI 文字列。en.ts と同じキー構造を維持すること。

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — 読むこと、書くことを大切に',
		defaultDescription:
			'Slax は長文のためのリーダーとノートを作っています。じっくり向き合う、ゆっくり育てるソフトウェア。',
		blogTitle: 'Slax ブログ',
		readerBlogTitle: 'Slax Reader ブログ',
		noteBlogTitle: 'Slax Note ブログ',
		readerChangelogTitle: 'Slax Reader 更新履歴',
		noteChangelogTitle: 'Slax Note 更新履歴',
		readerAlternativesTitle: 'Slax Reader 比較',
		noteAlternativesTitle: 'Slax Note 比較',
		aboutTitle: 'Slax について',
		privacyTitle: 'プライバシーポリシー',
		termsTitle: '利用規約',
		notFoundTitle: 'ページが見つかりません',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'ブログ',
		brand: 'Slax',
		languageSwitcher: '言語',
	},
	footer: {
		brandTagline: 'シンプルな道具で、ゆったりとした暮らしを。',
		sections: {
			products: 'プロダクト',
			reader: 'Reader',
			note: 'Note',
			company: '会社',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: '更新履歴',
			vsAlternatives: '比較',
			blog: 'ブログ',
			about: 'About',
			privacy: 'プライバシー',
			terms: '利用規約',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · 最終更新 {lastUpdated}',
	},
	common: {
		readMore: '続きを読む',
		backToTop: 'トップへ戻る',
		published: '公開日',
		updated: '更新日',
		tags: 'タグ',
		platforms: 'プラットフォーム',
		version: 'バージョン',
		date: '日付',
		next: '次へ',
		previous: '前へ',
	},
	notFound: {
		heading: 'ページが見つかりません',
		body: 'お探しのページは移動したか、存在しません。上部のナビゲーションからホームへお戻りください。',
		homeLink: 'ホームに戻る',
		readBlogLink: 'ブログを読む',
	},
	about: {
		eyebrow: 'About',
		heading: 'Slax Lab は、注意深さのための静かなソフトウェアを作っています。',
		lede: 'シンガポール拠点、仲間は各地に。',
		sectionHeading: 'お問い合わせ',
		note: '丁寧に読み書きする人との会話が好きです。お好きな方法でどうぞ。',
		channels: {
			x: 'X で',
			reddit: 'Reddit で',
			github: 'GitHub で',
			discord: 'Discord で',
			email: 'メールで',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'シンプルに、ゆっくりと、長く。',
			lede: '自分たちが使いたかったソフトウェア。Slax Reader と Slax Note、小さく長く育てる道具。',
		},
		comingSoon:
			'ローカライズ版のランディングページは準備中です。完全な英語版はこちら:',
	},
};

export default ui;
