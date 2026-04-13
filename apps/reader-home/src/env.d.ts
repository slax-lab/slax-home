/// <reference path="../.astro/types.d.ts" />

declare module 'virtual:starlight/components/Search' {
	const Search: typeof import('astro').AstroComponent;
	export default Search;
}

declare module 'virtual:starlight/components/SiteTitle' {
	const SiteTitle: typeof import('astro').AstroComponent;
	export default SiteTitle;
}
