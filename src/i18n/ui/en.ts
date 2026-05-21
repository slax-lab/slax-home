// English UI strings. This is the source-of-truth dictionary —
// every other locale must contain the same keys (enforced by `pnpm check:i18n`).

export const ui = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Reading & writing, taken seriously',
		defaultDescription:
			'Slax makes a reader and a notebook for the work of paying attention. Slow software, made for long-form.',
		blogTitle: 'Slax Blog',
		readerBlogTitle: 'Slax Reader Blog',
		noteBlogTitle: 'Slax Note Blog',
		readerChangelogTitle: "Slax Reader — What's new",
		noteChangelogTitle: "Slax Note — What's new",
		readerAlternativesTitle: 'Slax Reader vs alternatives',
		noteAlternativesTitle: 'Slax Note vs alternatives',
		aboutTitle: 'About Slax',
		privacyTitle: 'Privacy Policy',
		termsTitle: 'Terms of Service',
		notFoundTitle: 'Page not found',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Language',
	},
	footer: {
		brandTagline: 'Simple tools, relax life.',
		sections: {
			products: 'Products',
			reader: 'Reader',
			note: 'Note',
			company: 'Company',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: "What's new",
			vsAlternatives: 'vs alternatives',
			blog: 'Blog',
			about: 'About',
			privacy: 'Privacy',
			terms: 'Terms',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Last updated {lastUpdated}',
	},
	common: {
		readMore: 'Read more',
		backToTop: 'Back to top',
		published: 'Published',
		updated: 'Updated',
		tags: 'Tags',
		platforms: 'Platforms',
		version: 'Version',
		date: 'Date',
		next: 'Next',
		previous: 'Previous',
	},
	notFound: {
		heading: 'Page not found',
		body: 'The page you were looking for has moved or never existed. Try the navigation above.',
		homeLink: 'Back to home',
		readBlogLink: 'Read the blog',
	},
	about: {
		eyebrow: 'About',
		heading: 'Slax Lab makes quiet software for the work of attention.',
		lede: 'From Singapore, with correspondents elsewhere.',
		sectionHeading: 'Get in touch',
		note: 'We like conversations with careful readers and writers. Pick whichever channel suits you.',
		channels: {
			x: 'On X',
			reddit: 'On Reddit',
			github: 'On GitHub',
			discord: 'On Discord',
			email: 'By email',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Simple. Relax. Made to last.',
			lede: 'Software we wanted for ourselves. Slax Reader and Slax Note — small software, made to last.',
		},
		comingSoon:
			'Localized landing page in progress. Full English version is at',
	},
	changelog: {
		headline: 'Every version, in one place.',
		emptyState: 'No releases translated yet. The full release log is at',
		latestIs: 'The latest is',
		shippedOn: 'shipped',
	},
} as const;

export default ui;
export type UIDict = typeof ui;
