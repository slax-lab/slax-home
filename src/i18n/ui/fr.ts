// Chaînes UI françaises. La structure doit être identique à celle de en.ts.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Lire & écrire, sérieusement',
		defaultDescription:
			'Slax Lab fait des logiciels petits et soignés, pensés pour durer. Aujourd’hui : Slax Reader et Slax Note.',
		blogTitle: 'Blog Slax',
		readerBlogTitle: 'Blog Slax Reader',
		noteBlogTitle: 'Blog Slax Note',
		readerChangelogTitle: 'Slax Reader — Nouveautés',
		noteChangelogTitle: 'Slax Note — Nouveautés',
		readerAlternativesTitle: 'Slax Reader face aux alternatives',
		noteAlternativesTitle: 'Slax Note face aux alternatives',
		aboutTitle: 'À propos de Slax',
		aboutDescription:
			'Slax Lab est la petite équipe de Singapour derrière Slax Reader (lecture différée open source) et Slax Note (notes vocales IA). Qui nous sommes et comment nous joindre.',
		privacyTitle: 'Politique de confidentialité',
		termsTitle: 'Conditions d’utilisation',
		notFoundTitle: 'Page introuvable',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Langue',
	},
	footer: {
		brandTagline: 'Des outils simples, une vie posée.',
		sections: {
			products: 'Produits',
			reader: 'Reader',
			note: 'Note',
			company: 'À propos',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: 'Nouveautés',
			vsAlternatives: 'Comparatif',
			blog: 'Blog',
			about: 'À propos',
			privacy: 'Confidentialité',
			terms: 'Conditions',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Dernière mise à jour {lastUpdated}',
	},
	common: {
		readMore: 'Lire la suite',
		backToTop: 'Haut de page',
		published: 'Publié',
		updated: 'Mis à jour',
		updatedMeta: 'Mis à jour: {date}',
		tags: 'Tags',
		platforms: 'Plateformes',
		version: 'Version',
		date: 'Date',
		next: 'Suivant',
		previous: 'Précédent',
		byAuthor: 'par {author}',
	},
	notFound: {
		heading: 'Page introuvable',
		body: 'La page que vous cherchiez a été déplacée ou n’a jamais existé. Essayez la navigation ci-dessus.',
		homeLink: 'Retour à l’accueil',
		readBlogLink: 'Lire le blog',
	},
	about: {
		eyebrow: 'À propos',
		heading:
			'Slax Lab fait des logiciels discrets pour le travail de l’attention.',
		lede: 'Depuis Singapour, avec des correspondants ailleurs.',
		sectionHeading: 'Contact',
		note: 'Nous aimons les échanges avec les lecteurs et les auteurs attentifs. Choisissez le canal qui vous convient.',
		channels: {
			x: 'Sur X',
			reddit: 'Sur Reddit',
			github: 'Sur GitHub',
			discord: 'Sur Discord',
			email: 'Par e-mail',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Simple. Posé. Fait pour durer.',
			lede: 'Le logiciel qu’on voulait pour nous-mêmes. Slax Reader et Slax Note — petits, soignés, faits pour durer.',
		},
		comingSoon:
			'La page d’accueil en français est en préparation. La version anglaise complète se trouve sur',
	},
	changelog: {
		headline: 'Chaque version, au même endroit.',
		emptyState:
			'Aucune version traduite pour l’instant. Le journal complet est disponible sur',
		latestIs: 'La plus récente est',
		shippedOn: 'sortie le',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: 'Une appli à-lire-plus-tard qui n’essaie pas de tout faire.',
		bullets: [
			'Pas d’algorithme. Pas de fil. Vous choisissez ce que vous lisez ensuite.',
			'Captures illimitées, gratuites.',
			'Open source.',
		],
		features: [
			{
				title: 'Compréhension assistée par IA',
				body: 'Résumés instantanés, idées-clés et réponses sur tout ce que vous enregistrez.',
			},
			{
				title: 'Le contenu ne meurt jamais',
				body: 'Les articles sauvegardés sont conservés pour toujours. Adieu les 404.',
			},
			{
				title: 'Une lecture connectée',
				body: 'Surlignez, commentez et échangez avec d’autres lecteurs sur la même page.',
			},
		],
		ctaPrimary: 'Ouvrir dans le navigateur',
		ctaSecondary: 'Voir la version anglaise complète',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'De la voix au texte soigné — en quelques secondes.',
		bullets: [
			'Capture vocale en une touche.',
			'L’IA enlève les hésitations et ajoute la ponctuation.',
			'Partagez en texte ou en image, partout.',
		],
		features: [
			{
				title: 'Capturer sur l’instant',
				body: 'Attrapez vos idées fugaces d’une touche en marchant, en conduisant ou en réunion.',
			},
			{
				title: 'L’IA polit le texte',
				body: 'Transcription précise, ponctuation automatique et un polissage à votre ton.',
			},
			{
				title: 'Partager partout',
				body: 'Copiez en texte ou exportez en image. S’intègre à n’importe quel outil que vous utilisez déjà.',
			},
		],
		ctaPrimary: 'Télécharger sur l’App Store',
		ctaSecondary: 'Voir la version anglaise complète',
	},
};

export default ui;
