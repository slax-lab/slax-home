// 한국어 UI 문자열. en.ts 와 동일한 키 구조 유지.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — 깊이 읽고 천천히 쓰기',
		defaultDescription:
			'Slax 는 긴 글을 위한 리더와 노트를 만듭니다. 느리지만 단단한 소프트웨어.',
		blogTitle: 'Slax 블로그',
		readerBlogTitle: 'Slax Reader 블로그',
		noteBlogTitle: 'Slax Note 블로그',
		readerChangelogTitle: 'Slax Reader 업데이트 내역',
		noteChangelogTitle: 'Slax Note 업데이트 내역',
		readerAlternativesTitle: 'Slax Reader 비교',
		noteAlternativesTitle: 'Slax Note 비교',
		aboutTitle: 'Slax 소개',
		privacyTitle: '개인정보 처리방침',
		termsTitle: '이용약관',
		notFoundTitle: '페이지를 찾을 수 없습니다',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: '블로그',
		brand: 'Slax',
		languageSwitcher: '언어',
	},
	footer: {
		brandTagline: '단순한 도구로, 여유로운 일상을.',
		sections: {
			products: '제품',
			reader: 'Reader',
			note: 'Note',
			company: '회사',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: '업데이트 내역',
			vsAlternatives: '비교',
			blog: '블로그',
			about: '소개',
			privacy: '개인정보 처리방침',
			terms: '이용약관',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · 최종 업데이트 {lastUpdated}',
	},
	common: {
		readMore: '더 읽기',
		backToTop: '맨 위로',
		published: '발행일',
		updated: '업데이트',
		tags: '태그',
		platforms: '플랫폼',
		version: '버전',
		date: '날짜',
		next: '다음',
		previous: '이전',
	},
	notFound: {
		heading: '페이지를 찾을 수 없습니다',
		body: '찾으시는 페이지가 이동되었거나 존재하지 않습니다. 위쪽 메뉴에서 다시 시작해 주세요.',
		homeLink: '홈으로',
		readBlogLink: '블로그 보기',
	},
	about: {
		eyebrow: '소개',
		heading: 'Slax Lab 은 집중을 위한 작은 소프트웨어를 만듭니다.',
		lede: '싱가포르 본거지, 동료들은 곳곳에.',
		sectionHeading: '연락하기',
		note: '깊이 읽고 쓰는 분들과 이야기 나누는 걸 좋아합니다. 편한 채널을 골라 주세요.',
		channels: {
			x: 'X에서',
			reddit: 'Reddit에서',
			github: 'GitHub에서',
			discord: 'Discord에서',
			email: '이메일로',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: '단순하게, 천천히, 오래.',
			lede: '우리가 직접 쓰고 싶었던 소프트웨어. Slax Reader 와 Slax Note - 작게 만들어 오래 갑니다.',
		},
		comingSoon: '현지화된 랜딩 페이지는 준비 중입니다. 영문 전체 버전:',
	},
};

export default ui;
