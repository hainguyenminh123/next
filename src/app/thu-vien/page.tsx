import { Sparkles, Star, Image as ImageIcon, Video } from 'lucide-react';
import { TrongDongWatermark } from '@/components/TrongDongPattern';
import Reveal from '@/components/Reveal';
import MotionFloat from '@/components/MotionFloat';
import MotionRotate from '@/components/MotionRotate';
import GalleryClient from './GalleryClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Thư viện hình ảnh & Video đặc sản Tây Bắc | Tiệm Của Bản",
	description: "Bộ sưu tập hình ảnh, video thực tế về sản phẩm và quy trình sản xuất đặc sản Tây Bắc tại Điện Biên của Tiệm Của Bản.",
	keywords: ["thư viện ảnh", "video đặc sản", "hình ảnh thực tế", "quy trình sản xuất đặc sản"],
	alternates: {canonical: "/thu-vien"},
	openGraph: {
		title: "Thư viện hình ảnh & Video | Tiệm Của Bản",
		description: "Xem những hình ảnh và video chân thực nhất về bản làng và đặc sản Tây Bắc.",
		url: 'https://tiemcuaban.com/thu-vien',
	}
};

interface GalleryItem {
	id: string;
	type: 'image' | 'video';
	src: string;
	thumbnail?: string;
	title: string;
	description?: string;
}

const galleryItems: GalleryItem[] = [
	{
		id: '1',
		type: 'image',
		src: '/maps/dienbien.jpg',
		title: 'Điện Biên - Vùng đất lịch sử',
		description: 'Nơi giao thương đặc sản Tây Bắc'
	},
	{
		id: '2',
		type: 'image',
		src: '/maps/hanoi.jpg',
		title: 'Hà Nội - Thủ đô văn hóa',
		description: 'Kết nối vùng miền với đặc sản Tây Bắc'
	},
	{
		id: '3',
		type: 'image',
		src: '/products/lap-xuong.jpg',
		title: 'Lạp xưởng Tây Bắc',
		description: 'Đặc sản nổi tiếng vùng cao'
	},
	{
		id: '4',
		type: 'image',
		src: '/products/lon-say.jpg',
		title: 'Lợn sấy khô',
		description: 'Món ăn truyền thống của người dân tộc'
	},
	{
		id: '5',
		type: 'image',
		src: '/products/mang-kho.jpg',
		title: 'Măng khô Tây Bắc',
		description: 'Nguyên liệu không thể thiếu trong ẩm thực'
	},
	{
		id: '6',
		type: 'image',
		src: '/products/trau-say.jpg',
		title: 'Thịt trâu sấy gác bếp',
		description: 'Đặc sản gác bếp đích thực'
	},
	{
		id: '7',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/lap-xuong/lap-xuong-gac-bep-nuong.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/lap-xuong/lap-xuong-dong-goi-1.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	},
	{
		id: '8',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/lap-xuong/lap-xuong-gac-bep-dong-goi.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/lap-xuong/lap-xuong-dong-goi-3.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	},
	{
		id: '9',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-trau-say/thit-trau-tam-uop.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-trau-say/thit-trau-tam-uop.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	},
	{
		id: '10',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-trau-say/thit-trau-chi-tiet.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-trau-say/thit-trau-chi-tiet-1.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	},
	{
		id: '11',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-lon-say/thit-lon-tam-uop.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-lon-say/thit-lon-tam-gia-vi.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	},
	{
		id: '12',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-lon-say/thit-lon-quy-trinh-say.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-lon-say/thit-lon-nuong.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	},
	{
		id: '13',
		type: 'video',
		src: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-lon-say/thit-lon-dong-goi.mp4',
		thumbnail: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/thit-lon-say/thit-lon-san-pham-1.jpg',
		title: 'Quy trình làm đặc sản',
		description: 'Video giới thiệu cách chế biến'
	}
];

export default function GalleryPage() {
	const imageCount = galleryItems.filter(i => i.type === 'image').length;
	const videoCount = galleryItems.filter(i => i.type === 'video').length;

	return (
		<main className="flex-1">
			{/* Hero Section - Breakthrough Design */}
			<section className="relative pt-32 pb-20 md:pt-48 md:pb-36 overflow-hidden bg-white">
				{/* Artistic Background Elements */}
				<div className="absolute inset-0 z-0 pointer-events-none">
					{/* Main dynamic gradients */}
					<div className="absolute top-0 right-0 w-[60%] h-full bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,0.08)_0%,transparent_70%)]" />
					<div className="absolute  bottom-0 left-0 w-[50%] h-full bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.12)_0%,transparent_70%)]" />

					{/* Abstract floating shapes */}
					<MotionFloat
						duration={20}
						scale={[1, 1.2, 1]}
						rotate={[0, 90, 0]}
						opacity={[0.03, 0.06, 0.03]}
						className="absolute -top-20 -right-20 w-[600px] h-[600px] border-[40px] border-premium-red/10 rounded-full"
					/>

					<MotionFloat
						duration={15}
						scale={[1.2, 1, 1.2]}
						x={[0, 50, 0]}
						y={[0, -30, 0]}
						className="absolute top-1/2 -left-32 w-96 h-96 bg-festive-gold/10 blur-[120px] rounded-full"
					/>

					{/* Cultural Texture - Dynamic */}
					<div className="absolute inset-0 opacity-[0.015] flex items-center justify-center">
						<MotionRotate
							duration={100}
							className="w-[150%] aspect-square"
						>
							<TrongDongWatermark className="text-premium-red" />
						</MotionRotate>
					</div>
				</div>

				<div className="container-main relative z-10">
					<div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12">
						<div className="text-left">
							<Reveal
								className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 text-premium-red text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] mb-8 border border-premium-red/20 shadow-sm"
							>
								<div className="w-2 h-2 rounded-full bg-festive-gold animate-pulse" />
								Feedback từ khách hàng
								<Sparkles size={14} className="text-festive-gold" />
							</Reveal>

							<Reveal
								y={20}
								delay={0.1}
								className="text-5xl md:text-7xl font-heading font-black text-foreground leading-[0.95] mb-6 uppercase"
							>
								THƯ VIỆN
							</Reveal>

							<Reveal
								y={20}
								delay={0.2}
								className="text-sm font-light text-muted-foreground leading-relaxed max-w-xl"
							>
								Sắc đỏ, ánh vàng và câu chuyện bản làng được ghi lại qua từng khung hình. Mỗi ảnh, mỗi video là
								một lát cắt hương vị Tây Bắc.
							</Reveal>

							<div className="mt-8 flex flex-wrap items-center gap-3">
								<span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/80 border border-premium-red/15 text-premium-red shadow-sm">Bản sắc</span>
								<span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/80 border border-festive-gold/20 text-festive-gold shadow-sm">Lễ hội</span>
								<span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/80 border border-premium-red/15 text-premium-red shadow-sm">Ẩm thực</span>
							</div>
						</div>

						<Reveal
							y={20}
							delay={0.3}
							className="relative"
						>
							<div className="absolute -top-10 -right-6 h-20 w-44 rounded-3xl bg-premium-red/20 blur-[1px]" />
							<div className="absolute -bottom-8 left-6 h-16 w-36 rounded-3xl bg-festive-gold/25 blur-[1px]" />

							<div className="relative rounded-[2.5rem] bg-white/90 border border-premium-red/10 shadow-[0_30px_70px_-30px_rgba(185,28,28,0.5)] p-6">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-2 text-premium-red font-bold uppercase tracking-widest text-xs">
										<Star size={14} className="text-festive-gold fill-festive-gold" />
										Bộ sưu tập
									</div>
									<div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">2026</div>
								</div>

								<div className="grid gap-4">
									<div className="rounded-2xl border border-premium-red/15 bg-premium-red/5 p-4 flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-premium-red/10 flex items-center justify-center">
											<ImageIcon className="w-5 h-5 text-premium-red" />
										</div>
										<div>
											<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Hình ảnh</p>
											<p className="text-2xl font-black text-foreground">{imageCount}+ File</p>
										</div>
									</div>
									<div className="rounded-2xl border border-festive-gold/20 bg-festive-gold/10 p-4 flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-festive-gold/20 flex items-center justify-center">
											<Video className="w-5 h-5 text-festive-gold" />
										</div>
										<div>
											<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Video</p>
											<p className="text-2xl font-black text-foreground">{videoCount}+ Clip</p>
										</div>
									</div>
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* Gallery Content */}
			<section className="pb-24 bg-white relative">
				<div className="container-main">
					<GalleryClient items={galleryItems} />
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="py-24 bg-secondary/30 relative overflow-hidden">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-0 right-0 w-[55%] h-full bg-[radial-gradient(circle_at_top_right,rgba(185,28,28,0.18)_0%,transparent_65%)]" />
					<div className="absolute bottom-0 left-0 w-[45%] h-full bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.18)_0%,transparent_70%)]" />
				</div>
				
				<div className="container-main relative z-10">
					<Reveal
						y={40}
						className="max-w-4xl mx-auto bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-premium-red/10 border border-premium-red/10 text-center relative overflow-hidden group"
					>
						<div className="absolute inset-0 pointer-events-none">
							<div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-premium-red/10 blur-[40px]" />
							<div className="absolute -bottom-14 -left-14 w-44 h-44 rounded-full bg-festive-gold/15 blur-[45px]" />
						</div>
						
						<div className="relative z-10">
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-premium-red/10 text-premium-red text-[11px] font-bold uppercase tracking-[0.3em] mb-6 border border-premium-red/15">
								Gợi ý
							</div>
							<h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Bạn yêu thích những gì vừa thấy?</h2>
							<p className="text-muted-foreground font-light text-sm mb-10">
								Tất cả các sản phẩm trong ảnh và video đều có sẵn tại cửa hàng của chúng mình. Hãy mang hương vị Tây Bắc về nhà ngay nhé!
							</p>
							
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<a
									href="/san-pham"
									className="inline-flex items-center gap-3 bg-premium-red text-white px-10 py-4 rounded-full font-bold hover:bg-premium-red-light transition-all text-md uppercase shadow-xl shadow-premium-red/20 hover:-translate-y-1"
								>
									Ghé cửa hàng ngay
								</a>
								<div className="inline-flex items-center gap-2 px-5 py-4 rounded-full border border-premium-red/15 text-premium-red font-bold text-md uppercase tracking-widest bg-white shadow-sm">
									Giao nhanh
									<span className="w-1.5 h-1.5 rounded-full bg-festive-gold" />
									Đóng gói sạch
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</section>
		</main>
	);
}
