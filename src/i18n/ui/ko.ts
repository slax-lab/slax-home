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
		aboutDescription:
			'Slax Lab 은 싱가포르의 작은 팀입니다. 오픈소스 나중에 읽기 앱 Slax Reader 와 AI 음성 노트 Slax Note 를 만듭니다. 우리가 누구인지, 어떻게 연락하는지.',
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
		updatedMeta: '업데이트: {date}',
		tags: '태그',
		platforms: '플랫폼',
		version: '버전',
		date: '날짜',
		next: '다음',
		previous: '이전',
		byAuthor: '글: {author}',
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
			lede: '우리가 쓰고 싶은 소프트웨어를 만듭니다. Slax Reader 와 Slax Note — 오래 가도록 만든 작은 소프트웨어.',
		},
		comingSoon: '현지화된 랜딩 페이지는 준비 중입니다. 영문 전체 버전:',
	},
	changelog: {
		headline: '모든 버전을 한 페이지에.',
		emptyState:
			'이 언어의 업데이트 내역은 아직 번역되지 않았습니다. 영문 전체 버전:',
		latestIs: '최신 버전',
		shippedOn: '출시',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: '나중에 읽기, 딱 그만큼만.',
		bullets: [
			'알고리즘 없음. 피드 없음. 다음에 읽을 글은 당신이 정합니다.',
			'무제한 스냅샷, 무료.',
			'오픈소스.',
		],
		features: [
			{
				title: 'AI 가 이해를 돕습니다',
				body: '즉시 요약, 핵심 인사이트, 저장한 글에 직접 질문하기.',
			},
			{
				title: '기사는 사라지지 않습니다',
				body: '한 번 저장하면 영구 백업. 더 이상 404 는 없습니다.',
			},
			{
				title: '함께 읽기',
				body: '같은 글에 하이라이트, 코멘트, 다른 독자와 대화.',
			},
		],
		ctaPrimary: '브라우저에서 열기',
		ctaSecondary: '영문 전체 버전 보기',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: '말한 것을 몇 초 만에 다듬어진 글로.',
		bullets: [
			'한 번 탭으로 녹음, 영감을 놓치지 마세요.',
			'AI 가 어구를 정리하고 문장 부호를 더하며 톤을 다듬습니다.',
			'텍스트로 또는 이미지로 어디에나 공유.',
		],
		features: [
			{
				title: '즉시 캡처',
				body: '걷거나 운전하거나 회의 중에도 한 번 탭으로 떠오른 생각을 남깁니다.',
			},
			{
				title: 'AI 가 문장을 다듬어요',
				body: '정확한 전사, 자동 문장 부호, 당신의 말투를 살린 윤문.',
			},
			{
				title: '어디든 공유',
				body: '텍스트로 복사, 이미지로 내보내기. 지금 쓰는 도구에 바로 붙여 넣으세요.',
			},
		],
		ctaPrimary: 'App Store 에서 다운로드',
		ctaSecondary: '영문 전체 버전 보기',
	},
};

export default ui;
