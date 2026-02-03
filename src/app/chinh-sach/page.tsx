import { ChevronRight, RefreshCw, Shield, Star, Truck } from 'lucide-react';
import Link from 'next/link';
import { TrongDongBadge, TrongDongWatermark } from '@/components/TrongDongPattern';
import Reveal from '@/components/Reveal';
import MotionViewport from '@/components/MotionViewport';
import HashScrollHandler from '@/components/HashScrollHandler';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Chính sách giao hàng, đổi trả, bảo mật | Tiệm Của Bản",
	description: "Chính sách giao hàng toàn quốc, đổi trả 7 ngày, hoàn tiền 100% và bảo mật thông tin tại Tiệm Của Bản.",
	keywords: "chính sách giao hàng, đổi trả sản phẩm, hoàn tiền, bảo mật thông tin, Tiệm Của Bản",
	alternates: { canonical: "/chinh-sach" },
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
	return (
		<main className="flex-1">
			<HashScrollHandler />
			{/* Breadcrumb - Festive Style */}
			<section className="pt-28 pb-6 bg-secondary/30 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-premium-red/5 via-transparent to-festive-gold/5 pointer-events-none" />
				<div className="container-main relative z-10">
					<nav className="flex items-center gap-2 text-sm font-bold">
						<Link href="/" className="text-muted-foreground hover:text-premium-red transition-colors">Trang chủ</Link>
						<ChevronRight size={14} className="text-muted-foreground" />
						<span className="text-premium-red">Chính sách</span>
					</nav>
				</div>
			</section>

			{/* Hero Section */}
			<section className="relative py-20 md:py-28 overflow-hidden bg-white">
				<TrongDongWatermark opacity={0.03} className="text-premium-red" />
				<div className="container-main relative z-10">
					<div className="max-w-3xl">
						<Reveal className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-premium-red/20">
							Quyền lợi khách hàng
						</Reveal>
						<Reveal delay={0.1} className="text-5xl md:text-7xl font-heading font-bold mb-8 text-foreground leading-[1.1]">
							Chính Sách & <br />
							<span className="text-premium-red">Điều Khoản</span>
						</Reveal>
						<Reveal delay={0.2} className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
							Tiệm Của Bản cam kết mang đến trải nghiệm mua sắm an tâm, minh bạch và bảo vệ tối đa quyền lợi của bạn.
						</Reveal>
					</div>
				</div>
			</section>

			{/* Policies Navigation */}
			<section className="sticky top-[var(--navbar-height)] z-40 bg-white/80 backdrop-blur-md border-y border-premium-red/10 shadow-sm hidden md:block">
				<div className="container-main">
					<div className="flex items-center gap-8 py-4">
						<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-r border-premium-red/10 pr-8">Xem nhanh</span>
						{policies.map((policy) => (
							<a
								key={policy.id}
								href={`#${policy.id}`}
								className="text-sm font-bold text-foreground hover:text-premium-red transition-colors flex items-center gap-2"
							>
								<policy.icon size={16} />
								{policy.title}
							</a>
						))}
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20 bg-white">
				<div className="container-main">
					<div className="grid lg:grid-cols-12 gap-16">
						{/* Sidebar Info */}
						<aside className="lg:col-span-4 space-y-8">
							<Reveal x={-30} y={0} className="p-8 rounded-[2.5rem] bg-secondary/50 border border-premium-red/5">
								<h3 className="text-xl font-bold mb-6 flex items-center gap-3">
									<Star className="text-festive-gold fill-festive-gold" size={20} />
									Cam kết từ Tiệm
								</h3>
								<ul className="space-y-4">
									{[
										'Sản phẩm đúng mô tả 100%',
										'Nguồn gốc rõ ràng, sạch sẽ',
										'Hỗ trợ khách hàng tận tâm',
										'Giao hàng nhanh, đóng gói kỹ',
									].map((text) => (
										<li key={text} className="flex items-start gap-3 text-sm text-muted-foreground">
											<div className="w-5 h-5 rounded-full bg-premium-red/10 flex items-center justify-center text-premium-red flex-shrink-0 mt-0.5">
												<ChevronRight size={12} />
											</div>
											{text}
										</li>
									))}
								</ul>
							</Reveal>

							<Reveal x={-30} y={0} delay={0.1} className="p-8 rounded-[2.5rem] bg-premium-red text-white relative overflow-hidden">
								<TrongDongBadge className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 rotate-12" />
								<div className="relative z-10">
									<h3 className="text-xl font-bold mb-4">Cần hỗ trợ gấp?</h3>
									<p className="text-white/80 text-sm mb-6">Đừng ngần ngại liên hệ trực tiếp với chúng mình để được giải quyết nhanh nhất.</p>
									<a
										href="tel:0339420806"
										className="flex items-center justify-center gap-2 w-full py-4 bg-white text-premium-red rounded-2xl font-bold hover:bg-festive-gold hover:text-white transition-colors shadow-lg"
									>
										Hotline: 0339 420 806
									</a>
								</div>
							</Reveal>
						</aside>

						{/* Content */}
						<div className="lg:col-span-8 space-y-24">
							{policies.map((policy, idx) => (
								<section key={policy.id} id={policy.id} className="scroll-mt-32">
									<Reveal y={40}>
										<div className="flex items-center gap-4 mb-8">
											<div className="w-14 h-14 rounded-2xl bg-premium-red/5 flex items-center justify-center text-premium-red">
												<policy.icon size={28} />
											</div>
											<h2 className="text-3xl font-heading font-bold">{policy.title}</h2>
										</div>

										<div className="space-y-12">
											{policy.content.map((item, i) => (
												<div key={item.heading} className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-premium-red before:rounded-full">
													<h4 className="text-xl font-bold text-foreground mb-3">{item.heading}</h4>
													<p className="text-muted-foreground leading-relaxed text-lg">{item.text}</p>
												</div>
											))}
										</div>
									</Reveal>
									{idx < policies.length - 1 && (
										<div className="mt-24 h-px bg-gradient-to-r from-premium-red/10 via-premium-red/5 to-transparent" />
									)}
								</section>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<MotionViewport className="py-24 bg-premium-red text-white text-center relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]" />
				<div className="container-main relative z-10">
					<Reveal className="max-w-2xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white">Cảm ơn bạn đã tin tưởng</h2>
						<p className="text-white/80 mb-10 text-lg italic">
							&quot;Sự hài lòng của khách hàng là niềm tự hào và động lực của bản làng chúng mình.&quot;
						</p>
						<Link
							href="/san-pham"
							className="inline-flex items-center gap-2 bg-white text-premium-red px-10 py-4 rounded-full font-bold hover:bg-festive-gold hover:text-white transition-all shadow-xl"
						>
							Quay lại cửa hàng
							<ChevronRight size={18} />
						</Link>
					</Reveal>
				</div>
			</MotionViewport>
		</main>
	);
}
