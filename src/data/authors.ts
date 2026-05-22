// Author registry. Used by BlogArticlePage + AlternativePage to render
// Person-typed JSON-LD (GEO §2.4: anonymous / team-only bylines lose trust
// signal weight). We do not host /authors/<slug>/ pages; `url` is optional and
// points to the author's external authoritative profile when one exists.
//
// Articles default to DEFAULT_AUTHOR_SLUG; override per-post via the `author`
// frontmatter field (see content.config.ts).

export interface Author {
	slug: string;
	name: string;
	role: string;
	/** External authoritative URL for the author (personal site, etc.). Optional. */
	url?: string;
	/** External profiles for schema.org `sameAs` (X, GitHub, personal site, etc.). */
	sameAs: string[];
}

export const AUTHORS: Record<string, Author> = {
	luca: {
		slug: 'luca',
		name: 'Luca Wu',
		role: 'Founder, Slax Lab',
		sameAs: ['https://x.com/wulujia', 'https://github.com/wulujia'],
	},
	jane: {
		slug: 'jane',
		name: 'Jane',
		role: 'Product Manager, Slax Lab',
		sameAs: [],
	},
	'lin-chen': {
		slug: 'lin-chen',
		name: 'Lin Chen',
		role: 'Designer, Slax Lab',
		sameAs: [],
	},
	kk: {
		slug: 'kk',
		name: 'KK',
		role: 'Contributor, Slax Lab',
		sameAs: [],
	},
};

export const DEFAULT_AUTHOR_SLUG = 'luca';

export function getAuthor(slug?: string): Author {
	const key = slug ?? DEFAULT_AUTHOR_SLUG;
	return AUTHORS[key] ?? AUTHORS[DEFAULT_AUTHOR_SLUG];
}
