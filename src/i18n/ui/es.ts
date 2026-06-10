// Español UI strings. La estructura debe coincidir exactamente con en.ts.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Leer y escribir, en serio',
		defaultDescription:
			'Slax Lab hace software pequeño y cuidado para el largo plazo. Hoy: Slax Reader y Slax Note.',
		blogTitle: 'Blog de Slax',
		readerBlogTitle: 'Blog de Slax Reader',
		noteBlogTitle: 'Blog de Slax Note',
		readerChangelogTitle: 'Slax Reader — Novedades',
		noteChangelogTitle: 'Slax Note — Novedades',
		readerAlternativesTitle: 'Slax Reader vs alternativas',
		noteAlternativesTitle: 'Slax Note vs alternativas',
		aboutTitle: 'Acerca de Slax',
		aboutDescription:
			'Slax Lab es el pequeño equipo de Singapur detrás de Slax Reader (lectura diferida de código abierto) y Slax Note (notas de voz con IA). Quiénes somos y cómo contactarnos.',
		privacyTitle: 'Política de privacidad',
		termsTitle: 'Términos del servicio',
		notFoundTitle: 'Página no encontrada',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Idioma',
	},
	footer: {
		brandTagline: 'Herramientas simples, vida tranquila.',
		sections: {
			products: 'Productos',
			reader: 'Reader',
			note: 'Note',
			company: 'Empresa',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: 'Novedades',
			vsAlternatives: 'Comparativa',
			blog: 'Blog',
			about: 'Nosotros',
			privacy: 'Privacidad',
			terms: 'Términos',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Última actualización {lastUpdated}',
	},
	common: {
		readMore: 'Seguir leyendo',
		backToTop: 'Arriba',
		published: 'Publicado',
		updated: 'Actualizado',
		tags: 'Etiquetas',
		platforms: 'Plataformas',
		version: 'Versión',
		date: 'Fecha',
		next: 'Siguiente',
		previous: 'Anterior',
		byAuthor: 'por {author}',
	},
	notFound: {
		heading: 'Página no encontrada',
		body: 'La página que buscas se movió o nunca existió. Prueba con la navegación de arriba.',
		homeLink: 'Volver al inicio',
		readBlogLink: 'Leer el blog',
	},
	about: {
		eyebrow: 'Acerca de',
		heading:
			'Slax Lab hace software silencioso para el trabajo de prestar atención.',
		lede: 'Desde Singapur, con colaboradores en otros lugares.',
		sectionHeading: 'Contacto',
		note: 'Nos gustan las conversaciones con lectores y escritores cuidadosos. Elige el canal que prefieras.',
		channels: {
			x: 'En X',
			reddit: 'En Reddit',
			github: 'En GitHub',
			discord: 'En Discord',
			email: 'Por correo',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Simple. Relajado. Hecho para durar.',
			lede: 'Software que queríamos para nosotros. Slax Reader y Slax Note: pequeños, hechos para durar.',
		},
		comingSoon:
			'La página de inicio en español está en preparación. La versión completa en inglés está en',
	},
	changelog: {
		headline: 'Cada versión, en un solo lugar.',
		emptyState:
			'Todavía no hay versiones traducidas. El registro completo está en',
		latestIs: 'La más reciente es',
		shippedOn: 'lanzada el',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: 'Una app de leer después que no quiere serlo todo.',
		bullets: [
			'Sin algoritmo. Sin feed. Tú eliges qué leer a continuación.',
			'Capturas ilimitadas, gratis.',
			'Código abierto.',
		],
		features: [
			{
				title: 'Comprensión asistida por IA',
				body: 'Resúmenes al instante, ideas clave y respuestas sobre todo lo que guardas.',
			},
			{
				title: 'El contenido nunca muere',
				body: 'Lo que guardas una vez queda respaldado para siempre. Adiós a los 404.',
			},
			{
				title: 'Lectura conectada',
				body: 'Resalta, comenta y conversa con otros lectores en la misma página.',
			},
		],
		ctaPrimary: 'Abrir en el navegador',
		ctaSecondary: 'Ver la versión completa en inglés',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'De la voz al texto pulido, en segundos.',
		bullets: [
			'Captura por voz con un toque.',
			'La IA quita muletillas y añade puntuación.',
			'Comparte como texto o imagen donde sea.',
		],
		features: [
			{
				title: 'Captura al instante',
				body: 'Atrapa ideas fugaces de un toque mientras caminas, conduces o estás en una reunión.',
			},
			{
				title: 'La IA pule el texto',
				body: 'Transcripción precisa, puntuación automática y un pulido con tu tono.',
			},
			{
				title: 'Comparte donde sea',
				body: 'Copia como texto o exporta como imagen. Encaja en cualquier herramienta que ya uses.',
			},
		],
		ctaPrimary: 'Descargar en App Store',
		ctaSecondary: 'Ver la versión completa en inglés',
	},
};

export default ui;
