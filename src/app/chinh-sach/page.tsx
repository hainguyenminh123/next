import type {Metadata} from "next";
import {ChevronRight, RefreshCw, Shield, Star, Truck} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';
import Reveal from '@/components/Reveal';
import HashScrollHandler from '@/components/HashScrollHandler';

export const metadata: Metadata = {
	title: "Chính sách mua hàng & Bảo mật | Tiệm Của Bản",
	description: "Thông tin chi tiết về chính sách giao hàng, đổi trả hoàn tiền trong 7 ngày và cam kết bảo mật thông tin khách hàng tại Tiệm Của Bản.",
	keywords: ["chính sách giao hàng", "đổi trả sản phẩm", "bảo mật thông tin", "quy định mua hàng"],
	alternates: {canonical: "/chinh-sach"},
	openGraph: {
		title: "Chính sách mua hàng & Bảo mật | Tiệm Của Bản",
		description: "Minh bạch trong mọi kết nối, trọn vẹn trong từng lời hứa.",
		url: 'https://tiemcuaban.vn/chinh-sach',
	}
};

const policies = [
	{
		id: 'shipping',
		icon: Truck,
		title: 'Chính sách giao hàng',
		content: [
			{
				heading: 'Phạm vi giao hàng',
				text: 'Tiệm Của Bản giao hàng toàn quốc qua các đối tác vận chuyển uy tín: Giao Hàng Nhanh, Viettel Post, J&T Express.',
			},
			{
				heading: 'Thời gian giao hàng',
				text: 'Nội thành Hà Nội: 1-2 ngày làm việc. Các tỉnh miền Bắc: 2-3 ngày. Miền Trung và Nam: 3-5 ngày. Thời gian có thể thay đổi vào dịp lễ, Tết.',
			},
			{
				heading: 'Phí giao hàng',
				text: 'Phí giao hàng sẽ được thông báo khi bạn hoàn tất đặt hàng.',
			},
			{
				heading: 'Theo dõi đơn hàng',
				text: 'Sau khi gửi hàng, bạn sẽ nhận được mã vận đơn qua SMS/Zalo để theo dõi tình trạng đơn hàng.',
			},
		],
	},
	{
		id: 'returns',
		icon: RefreshCw,
		title: 'Đổi trả & Hoàn tiền',
		content: [
			{
				heading: 'Điều kiện đổi trả',
				text: 'Sản phẩm được đổi trả trong vòng 7 ngày kể từ khi nhận hàng nếu: sản phẩm bị lỗi do nhà sản xuất, sản phẩm không đúng mô tả, hàng bị hư hỏng do vận chuyển.',
			},
			{
				heading: 'Quy trình đổi trả',
				text: 'Liên hệ hotline hoặc Zalo thông báo lỗi sản phẩm. Gửi hình ảnh/video sản phẩm lỗi. Đóng gói và gửi lại sản phẩm theo hướng dẫn. Nhận sản phẩm thay thế hoặc hoàn tiền trong 3-5 ngày.',
			},
			{
				heading: 'Trường hợp không được đổi trả',
				text: 'Sản phẩm đã qua sử dụng một phần đáng kể. Sản phẩm hết hạn sử dụng do bảo quản không đúng cách. Sản phẩm không còn tem, nhãn, bao bì gốc.',
			},
			{
				heading: 'Hoàn tiền',
				text: 'Hoàn tiền qua chuyển khoản ngân hàng trong vòng 3-5 ngày làm việc sau khi xác nhận yêu cầu đổi trả hợp lệ.',
			},
		],
	},
	{
		id: 'privacy',
		icon: Shield,
		title: 'Chính sách bảo mật',
		content: [
			{
				heading: 'Thu thập thông tin',
				text: 'Chúng tôi thu thập thông tin cá nhân khi bạn đặt hàng: họ tên, số điện thoại, email, địa chỉ giao hàng. Thông tin này chỉ được sử dụng để xử lý đơn hàng và liên lạc với bạn.',
			},
			{
				heading: 'Bảo vệ thông tin',
				text: 'Thông tin cá nhân của bạn được bảo mật theo tiêu chuẩn an toàn cao nhất. Chúng tôi không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.',
			},
			{
				heading: 'Chia sẻ thông tin',
				text: 'Thông tin của bạn có thể được chia sẻ với đối tác vận chuyển để giao hàng. Chúng tôi yêu cầu các đối tác này bảo mật thông tin của bạn.',
			},
			{
				heading: 'Quyền của bạn',
				text: 'Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Liên hệ hotline hoặc email để thực hiện yêu cầu.',
			},
		],
	},
];

export default function PoliciesPage() {
	const breadcrumbs = [
		{name: 'Trang chủ', url: '/'},
		{name: 'Chính sách', url: '/chinh-sach'},
	];
	
	return (
		<Layout breadcrumbs={breadcrumbs}>
			<HashScrollHandler />
			
			{/* Hero Section */}
			<section className="relative pt-32 pb-20 md:pt-48 md:pb-44 overflow-hidden bg-[#fafafa]">
				{/* Architect Grid Background */}
				<div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
					style={{ 
						backgroundImage: `linear-gradient(#b91c1c 1px, transparent 1px), linear-gradient(90deg, #b91c1c 1px, transparent 1px)`,
						backgroundSize: '40px 40px'
					}} 
				/>
				
				{/* Cultural Core - Centered Pulse */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02]">
					<div className="w-full h-full animate-spin-slow">
						<TrongDongWatermark className="text-premium-red" />
					</div>
				</div>

				<div className="container-main relative z-10">
					<div className="flex flex-col lg:flex-row gap-16 items-start">
						{/* Left Content */}
						<div className="w-full lg:w-2/3">
							<Reveal y={-20} className="flex items-center gap-4 mb-12">
								<div className="h-[2px] w-12 bg-premium-red" />
								<span className="text-premium-red font-black uppercase tracking-[0.5em] text-xs">Standards of Trust</span>
							</Reveal>

							<div className="relative">
								<Reveal x={-50} duration={0.8}>
									<h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-foreground leading-[0.8] tracking-tighter mb-4">
										CHÍNH <br />
										<span className="relative">
											SÁCH
										</span>
									</h1>
								</Reveal>
								
								<Reveal delay={0.5} duration={0.8} className="mt-12 max-w-lg">
									<p className="text-xl md:text-3xl text-muted-foreground font-light leading-snug border-l-4 border-premium-red pl-8 italic">
										Minh bạch trong <span className="text-foreground font-bold">mọi kết nối</span>, 
										trọn vẹn trong <span className="text-premium-red font-bold">từng lời hứa</span>.
									</p>
								</Reveal>
							</div>
						</div>

						{/* Right Content - Stacked Cards */}
						<div className="w-full lg:w-1/3 relative mt-12 lg:mt-0">
							<div className="relative h-[280px] md:h-[350px]">
								{[
									{ icon: Truck, text: "Giao hàng", color: "text-premium-red", bg: "bg-premium-red/5", id: 'shipping', rotate: -5, top: 0, left: 0 },
									{ icon: RefreshCw, text: "Đổi trả", color: "text-festive-gold", bg: "bg-festive-gold/5", id: 'returns', rotate: 0, top: 80, left: 10 },
									{ icon: Shield, text: "Bảo mật", color: "text-accent", bg: "bg-accent/5", id: 'privacy', rotate: 5, top: 160, left: 20 }
								].map((card, idx) => (
									<Reveal 
										key={idx} 
										delay={0.6 + idx * 0.1} 
										x={50}
										className="absolute w-full"
										style={{ top: `${card.top}px`, left: `${card.left}px`, transform: `rotate(${card.rotate}deg)` }}
									>
										<Link
											href={`#${card.id}`}
											className="block bg-white p-6 md:p-8 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-border/50 cursor-pointer backdrop-blur-xl group hover:-translate-y-2 transition-all duration-300"
										>
											<div className="flex items-center gap-6">
												<div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
													<card.icon size={28} />
												</div>
												<div>
													<p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Quy định</p>
													<h3 className="text-lg md:text-xl font-bold text-foreground">{card.text}</h3>
												</div>
												<div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
													<ChevronRight className={card.color} />
												</div>
											</div>
										</Link>
									</Reveal>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			
			{/* Content Sections */}
			<section className="py-12 md:py-24 bg-white relative overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
				<TrongDongWatermark opacity={0.015} className="text-premium-red pointer-events-none" />
				
				<div className="container-main relative z-10">
					<div className="max-w-4xl mx-auto space-y-16">
						{policies.map((policy, index) => (
								<div
										key={policy.id}
										id={policy.id}
										className="scroll-mt-32"
								>
									<Reveal y={30} duration={0.6}>
										<div className="flex items-center gap-4 mb-8">
											<div className="w-14 h-14 rounded-2xl bg-premium-red/10 flex items-center justify-center text-premium-red shadow-sm border border-premium-red/10">
												<policy.icon className="w-7 h-7"/>
											</div>
											<div>
												<h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{policy.title}</h2>
												<div className="h-1 w-12 bg-festive-gold/30 mt-1 rounded-full" />
											</div>
										</div>
										
										<div className="card-premium p-6 md:p-12 space-y-10 relative overflow-hidden bg-white shadow-[0_8px_40px_-10px_rgba(0,0,0,0.1)] border-none group">
											<div className="absolute top-0 right-0 w-48 h-48 opacity-[0.02] -mr-12 -mt-12 rotate-12 transition-transform duration-700 group-hover:rotate-0">
												<TrongDongBadge className="w-full h-full text-premium-red" />
											</div>

											{policy.content.map((section, sIndex) => (
													<div key={sIndex} className="relative z-10">
														<div className="flex items-center gap-3 mb-4">
															<Star size={16} className="text-festive-gold fill-festive-gold" />
															<h4 className="font-heading font-bold text-foreground text-lg md:text-xl">{section.heading}</h4>
														</div>
														<p className="text-sm md:text-md text-muted-foreground leading-relaxed pl-7 border-l-2 border-festive-gold/20">
															{section.text}
														</p>
													</div>
											))}
										</div>
									</Reveal>
								</div>
						))}
						
						{/* Contact CTA */}
						<Reveal y={20} className="text-center pt-12 relative">
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-premium-red/5 blur-[80px] rounded-full -z-10" />
							
							<p className="text-muted-foreground mb-8 text-md md:text-lg font-medium">
								Bạn vẫn còn thắc mắc về các chính sách của chúng tôi?
							</p>
							<Link
									href="/lien-he"
									className="inline-flex items-center gap-3 bg-premium-red text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold
                       transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(185,28,28,0.4)] hover:-translate-y-1 text-sm md:text-lg group shadow-lg shadow-premium-red/20"
							>
								Liên hệ hỗ trợ ngay
								<ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"/>
							</Link>
						</Reveal>
					</div>
				</div>
			</section>
		</Layout>
	);
}
