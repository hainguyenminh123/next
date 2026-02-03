import { Mail, MapPin, MessageCircle, Phone, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { TrongDongBadge, TrongDongWatermark } from '@/components/TrongDongPattern';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import ContactMaps from '@/components/contact/ContactMaps';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Liên hệ Tiệm Của Bản | Hotline & Zalo đặt đặc sản Tây Bắc",
	description: "Liên hệ Tiệm Của Bản để đặt đặc sản Tây Bắc Điện Biên. Hotline: 0339 420 806. Zalo chat nhanh. Tư vấn và hỗ trợ giao hàng toàn quốc.",
	keywords: "liên hệ Tiệm Của Bản, hotline đặc sản Tây Bắc, zalo đặt hàng, mua thịt trâu gác bếp, đặt lạp xưởng",
	alternates: { canonical: "/lien-he" },
};

export default function ContactPage() {
	return (
		<main className="flex-1">
			{/* Hero Section */}
			<section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-white">
				<div className="absolute inset-0 z-0">
					<Image
						src="/hero-bg.jpg"
						alt="Tây Bắc landscape"
						fill
						priority
						className="object-cover opacity-[0.08] scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
				</div>

				<div className="container-main relative z-10 text-center">
					<Reveal
						className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-premium-red/5 text-premium-red text-xs font-bold uppercase tracking-[0.3em] mb-8 border border-premium-red/10"
					>
						<Sparkles size={14} />
						Kết nối với chúng mình
					</Reveal>

					<Reveal
						delay={0.1}
						className="text-5xl md:text-7xl font-heading font-bold mb-8 text-foreground"
					>
						Liên Hệ <span className="text-premium-red">Tiệm Của Bản</span>
					</Reveal>

					<Reveal
						delay={0.2}
						className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
					>
						Chúng mình luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7. Hãy để Tiệm Của Bản phục vụ bạn những thức quà vùng cao ngon nhất.
					</Reveal>
				</div>
			</section>

			{/* Contact Content */}
			<section className="pb-24 bg-white relative">
				<div className="container-main">
					<div className="grid lg:grid-cols-12 gap-16">
						{/* Left: Contact Info */}
						<div className="lg:col-span-5 space-y-12">
							<Reveal x={-30} y={0}>
								<h2 className="text-3xl font-heading font-bold mb-8">Thông tin liên hệ</h2>
								<div className="space-y-6">
									{[
										{ icon: Phone, label: 'Hotline / Zalo', value: '0339 420 806', href: 'tel:0339420806' },
										{ icon: MessageCircle, label: 'Chat Facebook', value: 'Tiệm Của Bản - Đặc sản Tây Bắc', href: 'https://facebook.com/tiemcuaban.vn' },
										{ icon: Mail, label: 'Email', value: 'tiemcuaban.vn@gmail.com', href: 'mailto:tiemcuaban.vn@gmail.com' },
										{ icon: MapPin, label: 'Văn phòng Hà Nội', value: '29 Đ. Đức Diễn, Phúc Diễn, Bắc Từ Liêm, Hà Nội', href: '#' },
									].map((item, i) => (
										<a
											key={item.label}
											href={item.href}
											className="flex items-start gap-5 p-6 rounded-[2rem] bg-secondary/50 border border-premium-red/5 hover:border-premium-red/20 hover:bg-white hover:shadow-xl transition-all duration-300 group"
										>
											<div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-premium-red shadow-sm group-hover:bg-premium-red group-hover:text-white transition-all duration-300">
												<item.icon size={24} />
											</div>
											<div>
												<div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</div>
												<div className="text-lg font-bold text-foreground group-hover:text-premium-red transition-colors">{item.value}</div>
											</div>
										</a>
									))}
								</div>
							</Reveal>

							<Reveal x={-30} y={0} delay={0.2} className="p-8 rounded-[2.5rem] bg-premium-red text-white relative overflow-hidden">
								<TrongDongBadge className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 rotate-12" />
								<div className="relative z-10">
									<h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
										<Star className="fill-festive-gold text-festive-gold" size={24} />
										Giờ làm việc
									</h3>
									<div className="space-y-3 opacity-90 text-lg">
										<div className="flex justify-between border-b border-white/10 pb-2">
											<span>Thứ 2 - Thứ 7</span>
											<span className="font-bold">08:00 - 21:00</span>
										</div>
										<div className="flex justify-between pt-1">
											<span>Chủ Nhật</span>
											<span className="font-bold">09:00 - 18:00</span>
										</div>
									</div>
									<p className="mt-6 text-sm text-white/70 italic">
										* Hỗ trợ đặt hàng online 24/7 qua Website và Zalo.
									</p>
								</div>
							</Reveal>
						</div>

						{/* Right: Contact Form */}
						<div className="lg:col-span-7">
							<Reveal x={30} y={0} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-premium-red/5 border border-premium-red/5 relative">
								<div className="mb-10">
									<h2 className="text-3xl font-heading font-bold mb-4">Gửi tin nhắn cho chúng mình</h2>
									<p className="text-muted-foreground text-lg">
										Bạn có thắc mắc về sản phẩm hoặc cần tư vấn quà tặng? Hãy để lại lời nhắn, chúng mình sẽ phản hồi ngay nhé!
									</p>
								</div>
								<ContactForm />
							</Reveal>
						</div>
					</div>
				</div>
			</section>

			{/* Maps Section */}
			<section className="section-spacing bg-secondary/30 relative overflow-hidden">
				<TrongDongWatermark opacity={0.03} className="text-premium-red" />
				<div className="container-main relative z-10">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<Reveal className="text-4xl font-heading font-bold mb-6">Ghé thăm chúng mình</Reveal>
						<Reveal delay={0.1} className="text-lg text-muted-foreground">
							Tìm kiếm Tiệm Của Bản tại các văn phòng và đại lý ủy quyền.
						</Reveal>
					</div>
					<ContactMaps />
				</div>
			</section>
		</main>
	);
}
