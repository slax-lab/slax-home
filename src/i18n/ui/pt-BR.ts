// Português (Brasil) UI strings. A estrutura deve ser idêntica à de en.ts.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Ler e escrever, com seriedade',
		defaultDescription:
			'A Slax Lab faz software pequeno e cuidadoso para o longo prazo. Hoje: Slax Reader e Slax Note.',
		blogTitle: 'Blog da Slax',
		readerBlogTitle: 'Blog do Slax Reader',
		noteBlogTitle: 'Blog do Slax Note',
		readerChangelogTitle: 'Slax Reader — Novidades',
		noteChangelogTitle: 'Slax Note — Novidades',
		readerAlternativesTitle: 'Slax Reader vs alternativas',
		noteAlternativesTitle: 'Slax Note vs alternativas',
		aboutTitle: 'Sobre a Slax',
		aboutDescription:
			'A Slax Lab é a pequena equipe de Singapura por trás do Slax Reader (leitura adiada de código aberto) e do Slax Note (notas de voz com IA). Quem somos e como entrar em contato.',
		privacyTitle: 'Política de privacidade',
		termsTitle: 'Termos de serviço',
		notFoundTitle: 'Página não encontrada',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Idioma',
	},
	footer: {
		brandTagline: 'Ferramentas simples, vida tranquila.',
		sections: {
			products: 'Produtos',
			reader: 'Reader',
			note: 'Note',
			company: 'Empresa',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: 'Novidades',
			vsAlternatives: 'Comparativo',
			blog: 'Blog',
			about: 'Sobre',
			privacy: 'Privacidade',
			terms: 'Termos',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Última atualização {lastUpdated}',
	},
	common: {
		readMore: 'Continuar lendo',
		backToTop: 'Voltar ao topo',
		published: 'Publicado',
		updated: 'Atualizado',
		tags: 'Tags',
		platforms: 'Plataformas',
		version: 'Versão',
		date: 'Data',
		next: 'Próximo',
		previous: 'Anterior',
		byAuthor: 'por {author}',
	},
	notFound: {
		heading: 'Página não encontrada',
		body: 'A página que você procurava mudou de lugar ou nunca existiu. Tente a navegação acima.',
		homeLink: 'Voltar para o início',
		readBlogLink: 'Ler o blog',
	},
	about: {
		eyebrow: 'Sobre',
		heading: 'A Slax Lab faz software silencioso para o trabalho da atenção.',
		lede: 'De Singapura, com colaboradores em outros lugares.',
		sectionHeading: 'Fale com a gente',
		note: 'Gostamos de conversas com leitores e escritores cuidadosos. Escolha o canal que mais te agradar.',
		channels: {
			x: 'No X',
			reddit: 'No Reddit',
			github: 'No GitHub',
			discord: 'No Discord',
			email: 'Por e-mail',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Simples. Calmo. Feito para durar.',
			lede: 'Software que queríamos para nós mesmos. Slax Reader e Slax Note — pequenos, feitos para durar.',
		},
		comingSoon:
			'A página em português está em construção. A versão completa em inglês está em',
	},
	changelog: {
		headline: 'Toda versão, num só lugar.',
		emptyState: 'Ainda não há versões traduzidas. O registro completo está em',
		latestIs: 'A mais recente é',
		shippedOn: 'lançada em',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: 'Um ler-depois que não tenta ser tudo.',
		bullets: [
			'Sem algoritmo. Sem feed. Você escolhe o que ler em seguida.',
			'Snapshots ilimitados, de graça.',
			'Código aberto.',
		],
		features: [
			{
				title: 'Compreensão com IA',
				body: 'Resumos instantâneos, pontos-chave e respostas sobre tudo o que você salva.',
			},
			{
				title: 'Conteúdo nunca morre',
				body: 'Tudo o que você salva fica em backup para sempre. Acabou o 404.',
			},
			{
				title: 'Leitura conectada',
				body: 'Destaque, comente e converse com outros leitores na mesma página.',
			},
		],
		ctaPrimary: 'Abrir no navegador',
		ctaSecondary: 'Ver a versão completa em inglês',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'Da voz ao texto polido — em segundos.',
		bullets: [
			'Captura por voz com um toque.',
			'A IA tira os vícios de fala e coloca a pontuação.',
			'Compartilhe como texto ou imagem em qualquer lugar.',
		],
		features: [
			{
				title: 'Capture na hora',
				body: 'Pegue ideias passageiras com um toque enquanto caminha, dirige ou está em uma reunião.',
			},
			{
				title: 'A IA pole o texto',
				body: 'Transcrição precisa, pontuação automática e um polimento no seu tom.',
			},
			{
				title: 'Compartilhe onde quiser',
				body: 'Copie como texto ou exporte como imagem. Encaixa em qualquer ferramenta que você já usa.',
			},
		],
		ctaPrimary: 'Baixar na App Store',
		ctaSecondary: 'Ver a versão completa em inglês',
	},
};

export default ui;
