// String UI Bahasa Indonesia. Strukturnya harus persis sama dengan en.ts.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Membaca & menulis, dengan serius',
		defaultDescription:
			'Slax Lab membuat perangkat lunak kecil dan cermat untuk jangka panjang. Hari ini: Slax Reader dan Slax Note.',
		blogTitle: 'Blog Slax',
		readerBlogTitle: 'Blog Slax Reader',
		noteBlogTitle: 'Blog Slax Note',
		readerChangelogTitle: 'Slax Reader — Apa yang baru',
		noteChangelogTitle: 'Slax Note — Apa yang baru',
		readerAlternativesTitle: 'Slax Reader vs alternatif',
		noteAlternativesTitle: 'Slax Note vs alternatif',
		aboutTitle: 'Tentang Slax',
		aboutDescription:
			'Slax Lab adalah tim kecil di Singapura di balik Slax Reader (aplikasi read-later open source) dan Slax Note (catatan suara AI). Siapa kami dan cara menghubungi kami.',
		privacyTitle: 'Kebijakan Privasi',
		termsTitle: 'Ketentuan Layanan',
		notFoundTitle: 'Halaman tidak ditemukan',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Bahasa',
	},
	footer: {
		brandTagline: 'Alat sederhana, hidup tenang.',
		sections: {
			products: 'Produk',
			reader: 'Reader',
			note: 'Note',
			company: 'Perusahaan',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: 'Apa yang baru',
			vsAlternatives: 'Perbandingan',
			blog: 'Blog',
			about: 'Tentang',
			privacy: 'Privasi',
			terms: 'Ketentuan',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Terakhir diperbarui {lastUpdated}',
	},
	common: {
		readMore: 'Lanjut baca',
		backToTop: 'Kembali ke atas',
		published: 'Diterbitkan',
		updated: 'Diperbarui',
		tags: 'Tag',
		platforms: 'Platform',
		version: 'Versi',
		date: 'Tanggal',
		next: 'Berikutnya',
		previous: 'Sebelumnya',
		byAuthor: 'oleh {author}',
	},
	notFound: {
		heading: 'Halaman tidak ditemukan',
		body: 'Halaman yang kamu cari sudah pindah atau memang tidak pernah ada. Coba navigasi di atas.',
		homeLink: 'Kembali ke beranda',
		readBlogLink: 'Baca blog',
	},
	about: {
		eyebrow: 'Tentang',
		heading:
			'Slax Lab membuat perangkat lunak yang tenang untuk kerja yang butuh perhatian.',
		lede: 'Dari Singapura, dengan rekan-rekan tersebar di banyak tempat.',
		sectionHeading: 'Hubungi kami',
		note: 'Kami suka percakapan dengan pembaca dan penulis yang teliti. Pilih saluran yang paling cocok untukmu.',
		channels: {
			x: 'Di X',
			reddit: 'Di Reddit',
			github: 'Di GitHub',
			discord: 'Di Discord',
			email: 'Lewat email',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Sederhana. Tenang. Dibuat untuk bertahan.',
			lede: 'Perangkat lunak yang ingin kami pakai sendiri. Slax Reader dan Slax Note — kecil, rapi, dibuat untuk bertahan.',
		},
		comingSoon:
			'Halaman versi Bahasa Indonesia sedang dikerjakan. Versi Inggris lengkap ada di',
	},
	changelog: {
		headline: 'Setiap versi, di satu tempat.',
		emptyState:
			'Belum ada versi yang diterjemahkan. Catatan rilis lengkap ada di',
		latestIs: 'Yang terbaru adalah',
		shippedOn: 'dirilis pada',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: 'Aplikasi baca-nanti yang tidak mencoba jadi segalanya.',
		bullets: [
			'Tanpa algoritma. Tanpa feed. Kamu yang memilih bacaan berikutnya.',
			'Snapshot tak terbatas, gratis.',
			'Sumber terbuka.',
		],
		features: [
			{
				title: 'Pemahaman dengan bantuan AI',
				body: 'Ringkasan instan, poin kunci, dan jawaban atas apa pun yang kamu simpan.',
			},
			{
				title: 'Konten tidak akan hilang',
				body: 'Artikel yang sudah disimpan dicadangkan selamanya. Tidak ada lagi 404.',
			},
			{
				title: 'Membaca yang terhubung',
				body: 'Sorot, beri komentar, dan berdiskusi dengan pembaca lain di halaman yang sama.',
			},
		],
		ctaPrimary: 'Buka di Browser',
		ctaSecondary: 'Lihat versi lengkap dalam Bahasa Inggris',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'Ubah suara jadi tulisan rapi — dalam hitungan detik.',
		bullets: [
			'Rekam suara hanya dengan satu ketukan.',
			'AI membersihkan kata pengisi dan menambah tanda baca.',
			'Bagikan sebagai teks atau gambar ke mana saja.',
		],
		features: [
			{
				title: 'Tangkap seketika',
				body: 'Tangkap ide sekilas dengan satu ketukan saat berjalan, menyetir, atau dalam rapat.',
			},
			{
				title: 'AI memoles teksnya',
				body: 'Transkripsi akurat, tanda baca otomatis, dan polesan gaya sesuai nada bicaramu.',
			},
			{
				title: 'Bagikan ke mana saja',
				body: 'Salin sebagai teks atau ekspor sebagai gambar. Pas masuk ke alat apa pun yang sudah kamu pakai.',
			},
		],
		ctaPrimary: 'Unduh di App Store',
		ctaSecondary: 'Lihat versi lengkap dalam Bahasa Inggris',
	},
};

export default ui;
