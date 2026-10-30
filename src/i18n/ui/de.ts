// Deutsch UI strings. Struktur muss exakt mit en.ts übereinstimmen.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Lesen & Schreiben, ernsthaft gemacht',
		defaultDescription:
			'Slax Lab baut kleine, sorgfältige Software für die lange Strecke. Heute: Slax Reader und Slax Note.',
		blogTitle: 'Slax Blog',
		readerBlogTitle: 'Slax Reader Blog',
		noteBlogTitle: 'Slax Note Blog',
		readerChangelogTitle: 'Slax Reader — Was ist neu',
		noteChangelogTitle: 'Slax Note — Was ist neu',
		readerChangelogDescription:
			'Slax Reader Release Notes — neue Funktionen, Fixes und Verbesserungen für Web, iOS und Android, Version für Version.',
		noteChangelogDescription:
			'Slax Note Release Notes — neue Funktionen, Fixes und Verbesserungen für iOS und Android, Version für Version.',
		readerAlternativesTitle: 'Slax Reader im Vergleich',
		noteAlternativesTitle: 'Slax Note im Vergleich',
		aboutTitle: 'Über Slax — das Team hinter Slax Reader & Slax Note',
		aboutDescription:
			'Slax Lab ist das kleine Team aus Singapur hinter Slax Reader (Open-Source-Read-it-later) und Slax Note (KI-Sprachnotizen). Wer wir sind und wie man uns erreicht.',
		privacyTitle: 'Datenschutz',
		termsTitle: 'Nutzungsbedingungen',
		notFoundTitle: 'Seite nicht gefunden',
		blogDescription:
			'Der Slax Blog: Anleitungen zum Speichern und Lesen von Web-Artikeln, Geschichte und Vergleich von Später-lesen-Apps und Notizen zur Entwicklung von Slax Reader und Slax Note.',
		readerBlogDescription:
			'Slax Reader Blog: Web-Artikel speichern und lesen, Import aus Pocket, Readwise Reader, Instapaper und Matter, Später-lesen-Apps im Vergleich.',
		noteBlogDescription:
			'Slax Note Blog: wie wir die AI-Sprachnotiz-App bauen, auch wie ein Designer die App mit AI-Coding-Tools neu geschrieben hat.',
		readerAlternativesDescription:
			'Slax Reader im Vergleich mit Pocket, Readwise Reader, Instapaper, Matter, Omnivore, Raindrop, Cubox und GoodLinks: Preis, AI-Funktionen und Export.',
		noteAlternativesDescription:
			'Slax Note im Vergleich mit Voicenotes, AudioPen, Braintoss und Mem AI: was jede Sprachnotiz-App kann, was sie kostet und wann Slax Note besser passt.',
		privacyDescription:
			'Wie Slax Lab personenbezogene Daten in Slax Reader, Slax Note und auf der Slax-Website erhebt, nutzt und weitergibt, und wie Sie uns erreichen.',
		termsDescription:
			'Die Nutzungsbedingungen für Slax Reader, Slax Note und andere Apps von Slax Lab: Nutzung, geistiges Eigentum, Open-Source-Software und Haftung.',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Sprache',
	},
	footer: {
		brandTagline: 'Schlichte Werkzeuge, ruhiges Leben.',
		sections: {
			products: 'Produkte',
			reader: 'Reader',
			note: 'Note',
			company: 'Über uns',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: 'Was ist neu',
			vsAlternatives: 'Vergleich',
			blog: 'Blog',
			about: 'Über uns',
			privacy: 'Datenschutz',
			terms: 'Bedingungen',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Zuletzt aktualisiert {lastUpdated}',
	},
	common: {
		readMore: 'Weiterlesen',
		backToTop: 'Nach oben',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		updatedMeta: 'Aktualisiert: {date}',
		tags: 'Schlagwörter',
		platforms: 'Plattformen',
		version: 'Version',
		date: 'Datum',
		next: 'Weiter',
		previous: 'Zurück',
		byAuthor: 'von {author}',
	},
	notFound: {
		heading: 'Seite nicht gefunden',
		body: 'Die Seite, die du gesucht hast, ist umgezogen oder existiert nicht. Versuch die Navigation oben.',
		homeLink: 'Zur Startseite',
		readBlogLink: 'Blog lesen',
	},
	about: {
		eyebrow: 'Über uns',
		heading: 'Slax Lab macht leise Software für die Arbeit der Aufmerksamkeit.',
		lede: 'Aus Singapur, mit Mitstreitern anderswo.',
		sectionHeading: 'Kontakt',
		note: 'Wir mögen Gespräche mit sorgfältigen Leserinnen und Autoren. Wähl den Kanal, der dir passt.',
		channels: {
			x: 'Auf X',
			reddit: 'Auf Reddit',
			github: 'Auf GitHub',
			discord: 'Auf Discord',
			email: 'Per E-Mail',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Einfach. Ruhig. Gemacht, um zu bleiben.',
			lede: 'Software, die wir selbst nutzen wollten. Slax Reader und Slax Note — klein, sorgfältig, langlebig.',
		},
		comingSoon:
			'Die deutsche Landingpage ist in Arbeit. Die vollständige englische Fassung findest du unter',
	},
	changelog: {
		headline: 'Jede Version, an einem Ort.',
		emptyState:
			'Noch keine Versionen auf Deutsch übersetzt. Das vollständige Release-Log findest du unter',
		latestIs: 'Aktuell ist',
		shippedOn: 'erschienen am',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: 'Ein Später-lesen, das nicht alles sein will.',
		bullets: [
			'Kein Algorithmus, kein Feed. Du entscheidest, was du als nächstes liest.',
			'Unbegrenzte Snapshots, kostenlos.',
			'Open Source.',
		],
		features: [
			{
				title: 'KI-gestütztes Verstehen',
				body: 'Sofortige Zusammenfassungen, Kernaussagen und Antworten zu allem, was du speicherst.',
			},
			{
				title: 'Inhalte sterben nie',
				body: 'Einmal gespeicherte Artikel werden für immer gesichert. Keine 404s mehr.',
			},
			{
				title: 'Verbundenes Lesen',
				body: 'Markiere, kommentiere und diskutiere mit anderen Leserinnen auf derselben Seite.',
			},
		],
		ctaPrimary: 'Im Browser öffnen',
		ctaSecondary: 'Englische Vollversion ansehen',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'Aus Stimme wird sauberer Text — in Sekunden.',
		bullets: [
			'Sprachaufnahme mit einem Tipp.',
			'KI entfernt Füllwörter und setzt die Satzzeichen.',
			'Teile als Text oder Bild überall hin.',
		],
		features: [
			{
				title: 'Sofort festhalten',
				body: 'Halte flüchtige Ideen beim Laufen, Fahren oder im Meeting mit einem Tipp fest.',
			},
			{
				title: 'KI poliert den Text',
				body: 'Präzise Transkription, automatische Satzzeichen und ein Stil in deinem Ton.',
			},
			{
				title: 'Überallhin teilen',
				body: 'Als Text kopieren oder als Bild exportieren. In jedes Tool, das du schon nutzt.',
			},
		],
		ctaPrimary: 'Im App Store laden',
		ctaSecondary: 'Englische Vollversion ansehen',
	},
};

export default ui;
