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
		readerChangelogDescription:
			'Slax Reader release notes — new features, fixes, and improvements across Web, iOS, and Android, version by version.',
		noteChangelogDescription:
			'Slax Note release notes — new features, fixes, and improvements for iOS and Android, version by version.',
		readerAlternativesTitle: 'Slax Reader vs alternatives',
		noteAlternativesTitle: 'Slax Note vs alternatives',
		aboutTitle: 'About Slax — the team behind Slax Reader & Slax Note',
		aboutDescription:
			'Slax Lab is the small Singapore-based team behind Slax Reader (an open-source read-later app) and Slax Note (AI voice notes). Who we are and how to reach us.',
		privacyTitle: 'Privacy Policy',
		termsTitle: 'Terms of Service',
		notFoundTitle: 'Page not found',
		blogDescription:
			'The Slax blog: guides to saving and reading web articles, read-later app history and comparisons, and notes on how we build Slax Reader and Slax Note.',
		readerBlogDescription:
			'Slax Reader blog: how to save and read web articles, import from Pocket, Readwise Reader, Instapaper and Matter, and compare read-later apps.',
		noteBlogDescription:
			'Slax Note blog: how we build the AI voice notes app, including how a designer rewrote the app with AI coding tools.',
		readerAlternativesDescription:
			'Slax Reader compared with Pocket, Readwise Reader, Instapaper, Matter, Omnivore, Raindrop, Cubox and GoodLinks on price, AI features and export.',
		noteAlternativesDescription:
			'Slax Note compared with Voicenotes, AudioPen, Braintoss and Mem AI: what each voice notes app does, what it costs and when Slax Note fits better.',
		privacyDescription:
			'How Slax Lab collects, uses and shares personal information in Slax Reader, Slax Note and the Slax website, and how to contact us.',
		termsDescription:
			'The terms of service for Slax Reader, Slax Note and other Slax Lab apps: use of the apps, intellectual property, open source software and liability.',
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
		updatedMeta: 'Updated: {date}',
		tags: 'Tags',
		platforms: 'Platforms',
		version: 'Version',
		date: 'Date',
		next: 'Next',
		previous: 'Previous',
		byAuthor: 'by {author}',
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
	reader: {
		eyebrow: 'Slax Reader',
		heading: "A read-it-later app that doesn't try to be everything.",
		bullets: [
			'No algorithm. No feed. You choose what to read next.',
			'Unlimited snapshots, for free.',
			'Open-source.',
		],
		features: [
			{
				title: 'AI-Powered Understanding',
				body: 'Instant summaries, key insights, and answers to your questions about anything you save.',
			},
			{
				title: 'Content Never Dies',
				body: 'Articles saved once are backed up forever. No more 404s.',
			},
			{
				title: 'Connected Reading',
				body: 'Highlight, comment, and discuss with other readers on the same page.',
			},
		],
		ctaPrimary: 'Open in Browser',
		ctaSecondary: 'See the full English version',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'Turn voice into polished writing — in seconds.',
		bullets: [
			'One-tap voice capture.',
			'AI cleans up filler words and adds punctuation.',
			'Share as text or image anywhere.',
		],
		features: [
			{
				title: 'Capture Instantly',
				body: 'Record fleeting ideas with a single tap while walking, driving, or in a meeting.',
			},
			{
				title: 'AI Polishes the Text',
				body: 'Accurate transcription, automatic punctuation, and your-tone style polish.',
			},
			{
				title: 'Share Anywhere',
				body: 'Copy as text or export as image. Drop into any tool you already use.',
			},
		],
		ctaPrimary: 'Download on App Store',
		ctaSecondary: 'See the full English version',
	},
} as const;

export default ui;
export type UIDict = typeof ui;
