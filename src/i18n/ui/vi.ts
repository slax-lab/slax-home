// Chuỗi UI tiếng Việt. Cấu trúc phải khớp chính xác với en.ts.

import type { UIDict } from './en';

export const ui: UIDict = {
	meta: {
		siteName: 'Slax',
		defaultTitle: 'Slax — Đọc và viết, một cách nghiêm túc',
		defaultDescription:
			'Slax Lab làm những phần mềm nhỏ, tỉ mỉ, dành cho chặng đường dài. Hôm nay là Slax Reader và Slax Note.',
		blogTitle: 'Blog Slax',
		readerBlogTitle: 'Blog Slax Reader',
		noteBlogTitle: 'Blog Slax Note',
		readerChangelogTitle: 'Slax Reader — Có gì mới',
		noteChangelogTitle: 'Slax Note — Có gì mới',
		readerAlternativesTitle: 'Slax Reader so với các lựa chọn khác',
		noteAlternativesTitle: 'Slax Note so với các lựa chọn khác',
		aboutTitle: 'Về Slax',
		privacyTitle: 'Chính sách quyền riêng tư',
		termsTitle: 'Điều khoản dịch vụ',
		notFoundTitle: 'Không tìm thấy trang',
	},
	nav: {
		reader: 'Reader',
		note: 'Note',
		blog: 'Blog',
		brand: 'Slax',
		languageSwitcher: 'Ngôn ngữ',
	},
	footer: {
		brandTagline: 'Công cụ giản dị, đời sống thư thái.',
		sections: {
			products: 'Sản phẩm',
			reader: 'Reader',
			note: 'Note',
			company: 'Công ty',
		},
		links: {
			slaxReader: 'Slax Reader',
			slaxNote: 'Slax Note',
			whatsNew: 'Có gì mới',
			vsAlternatives: 'So sánh',
			blog: 'Blog',
			about: 'Giới thiệu',
			privacy: 'Quyền riêng tư',
			terms: 'Điều khoản',
			rss: 'RSS',
		},
		copyright: '© 2026 Slax Lab',
		versionMeta: 'v{version} · Cập nhật lần cuối {lastUpdated}',
	},
	common: {
		readMore: 'Đọc tiếp',
		backToTop: 'Lên đầu trang',
		published: 'Đã đăng',
		updated: 'Đã cập nhật',
		tags: 'Thẻ',
		platforms: 'Nền tảng',
		version: 'Phiên bản',
		date: 'Ngày',
		next: 'Tiếp',
		previous: 'Trước',
		byAuthor: 'bởi {author}',
	},
	notFound: {
		heading: 'Không tìm thấy trang',
		body: 'Trang bạn tìm đã chuyển đi hoặc chưa từng tồn tại. Thử dùng thanh điều hướng phía trên.',
		homeLink: 'Về trang chủ',
		readBlogLink: 'Đọc blog',
	},
	about: {
		eyebrow: 'Giới thiệu',
		heading: 'Slax Lab làm phần mềm tĩnh lặng cho việc tập trung đọc và viết.',
		lede: 'Từ Singapore, với cộng sự rải rác khắp nơi.',
		sectionHeading: 'Liên hệ',
		note: 'Chúng tôi thích trò chuyện với những người đọc và viết cẩn thận. Chọn kênh nào tiện nhất cho bạn.',
		channels: {
			x: 'Trên X',
			reddit: 'Trên Reddit',
			github: 'Trên GitHub',
			discord: 'Trên Discord',
			email: 'Qua email',
		},
	},
	home: {
		hero: {
			eyebrow: 'Slax',
			heading: 'Giản dị. Thư thái. Bền lâu.',
			lede: 'Phần mềm chúng tôi tự dùng. Slax Reader và Slax Note — nhỏ gọn, đẹp đẽ, làm để dùng lâu.',
		},
		comingSoon: 'Bản tiếng Việt đang được hoàn thiện. Bản tiếng Anh đầy đủ ở',
	},
	changelog: {
		headline: 'Mọi phiên bản, ở cùng một chỗ.',
		emptyState: 'Chưa có phiên bản nào được dịch. Nhật ký phát hành đầy đủ ở',
		latestIs: 'Mới nhất là',
		shippedOn: 'phát hành ngày',
	},
	reader: {
		eyebrow: 'Slax Reader',
		heading: 'Một ứng dụng đọc-sau không cố gắng làm mọi thứ.',
		bullets: [
			'Không thuật toán. Không feed. Bạn chọn bài kế tiếp.',
			'Lưu ảnh chụp trang web không giới hạn, miễn phí.',
			'Mã nguồn mở.',
		],
		features: [
			{
				title: 'Hiểu nội dung nhờ AI',
				body: 'Tóm tắt tức thì, ý chính và câu trả lời cho mọi thứ bạn lưu.',
			},
			{
				title: 'Nội dung không bao giờ mất',
				body: 'Bài đã lưu được sao lưu vĩnh viễn. Không còn lỗi 404.',
			},
			{
				title: 'Đọc cùng nhau',
				body: 'Đánh dấu, bình luận và thảo luận với độc giả khác trên cùng một trang.',
			},
		],
		ctaPrimary: 'Mở trên trình duyệt',
		ctaSecondary: 'Xem bản tiếng Anh đầy đủ',
	},
	note: {
		eyebrow: 'Slax Note',
		heading: 'Từ giọng nói thành văn bản tinh gọn — trong vài giây.',
		bullets: [
			'Ghi âm chỉ với một chạm.',
			'AI tự bỏ từ thừa và thêm dấu câu.',
			'Chia sẻ dạng văn bản hoặc ảnh, mọi nơi.',
		],
		features: [
			{
				title: 'Bắt ý ngay lập tức',
				body: 'Ghi lại ý nghĩ thoáng qua chỉ bằng một chạm khi đang đi bộ, lái xe hoặc họp.',
			},
			{
				title: 'AI đánh bóng văn bản',
				body: 'Phiên âm chính xác, tự thêm dấu câu, mài giũa theo giọng văn của bạn.',
			},
			{
				title: 'Chia sẻ ở bất cứ đâu',
				body: 'Sao chép thành văn bản hoặc xuất thành ảnh. Hoà nhập với mọi công cụ bạn đang dùng.',
			},
		],
		ctaPrimary: 'Tải trên App Store',
		ctaSecondary: 'Xem bản tiếng Anh đầy đủ',
	},
};

export default ui;
