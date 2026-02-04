import {Mail, MapPin, MessageCircle, Phone, Sparkles, Star} from 'lucide-react';
import Layout from '@/components/Layout';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import ContactMaps from '@/components/contact/ContactMaps';
import type {Metadata} from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Liên hệ Tiệm Của Bản | Tư vấn đặc sản Tây Bắc 24/7",
	description: "Liên hệ với Tiệm Của Bản qua Hotline/Zalo: 0339 420 806. Chúng mình luôn sẵn sàng tư vấn về thịt trâu gác bếp, lạp xưởng và các đặc sản Điện Biên khác.",
	keywords: ["liên hệ", "hotline đặc sản", "zalo đặt hàng", "địa chỉ mua đặc sản"],
	alternates: {canonical: "/lien-he"},
	openGraph: {
		title: "Liên hệ Tiệm Của Bản | Tư vấn 24/7",
		description: "Chúng mình luôn sẵn lòng lắng nghe và tư vấn những thức quà tinh tế nhất từ vùng cao Tây Bắc.",
		url: 'https://tiemcuaban.vn/lien-he',
	}
};

export default function ContactPage() {
	const breadcrumbs = [
		{name: 'Trang chủ', url: '/'},
		{name: 'Liên hệ', url: '/lien-he'},
	];
	
	return (
			<Layout breadcrumbs={breadcrumbs}>
				{/* Hero Section */}
				<section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 md:pt-48 md:pb-40 overflow-hidden bg-white">
					{/* Background Layers */}
					<div className="absolute inset-0 z-0">
						<div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"/>
						<div className="absolute inset-0 bg-gradient-to-r from-premium-red/5 via-transparent to-festive-gold/5"/>
					</div>
					
					{/* Floating Decorative Elements */}
					<div
							className="absolute top-1/4 -left-20 w-48 h-48 md:w-96 md:h-96 bg-premium-red/10 blur-[60px] md:blur-[100px] rounded-full animate-pulse"/>
					<div
							className="absolute bottom-1/4 -right-20 w-48 h-48 md:w-96 md:h-96 bg-festive-gold/15 blur-[70px] md:blur-[120px] rounded-full animate-pulse"
							style={{animationDelay: '2s'}}/>
					
					{/* Cultural Elements */}
					<div
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.02] pointer-events-none">
						<TrongDongWatermark className="text-premium-red"/>
					</div>
					
					<div className="container-main relative z-10 px-4 md:px-0">
						<div className="max-w-6xl mx-auto">
						<div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
								<div className="text-center md:text-left md:pr-8">
									<Reveal y={-20} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-premium-red/5 text-premium-red text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 border border-premium-red/10 backdrop-blur-sm shadow-sm">
										<Sparkles size={14} className="animate-pulse"/>
										Kết nối với chúng mình
										<Sparkles size={14} className="animate-pulse"/>
									</Reveal>
									
									<Reveal
											y={30}
											duration={0.8}
											className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 md:mb-8 leading-[1.2] md:leading-[1.1]"
									>
										<h1>
											Đồng hành cùng <br className="hidden sm:block"/>
											<span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-red via-accent to-festive-gold">
											Tiệm Của Bản
										</span>
										</h1>
									</Reveal>
									
									<Reveal
											y={20}
											delay={0.3}
											duration={0.8}
											className="text-sm md:text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto md:mx-0"
									>
										<p>
											Chúng mình luôn sẵn lòng lắng nghe và tư vấn những thức quà tinh tế nhất từ vùng cao Tây Bắc.
											Hãy để Tiệm Của Bản mang hương vị bản làng đến gần bạn hơn.
										</p>
									</Reveal>
								</div>
								
								<Reveal
										scale={0.9}
										duration={1}
										className="md:flex justify-end relative pr-4 lg:pr-0 mt-8 md:mt-0"
								>
									<div className="relative mx-auto md:mr-0 max-w-[280px] sm:max-w-xs md:max-w-none">
										<div
												className="w-full aspect-square md:w-96 md:h-96 rounded-[2rem] md:rounded-[3rem] border-2 border-festive-gold/20 rotate-6 absolute inset-0 -z-10 bg-festive-gold/5"/>
										<div
												className="w-full aspect-square md:w-96 md:h-96 rounded-[2rem] md:rounded-[3rem] border-2 border-premium-red/20 -rotate-3 absolute inset-0 -z-10 bg-premium-red/5"/>
										<div className="w-full aspect-square md:w-96 md:h-96 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
											<Image
													src="/hero-bg.jpg"
													alt="Tây Bắc Landscape"
													width={600}
													height={600}
													className="w-full h-full object-cover opacity-80"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-premium-red/40 to-transparent"/>
											<div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
												<div className="flex items-center gap-2 mb-1 md:mb-2">
													<Star className="w-4 h-4 md:w-5 md:h-5 fill-festive-gold text-festive-gold"/>
													<span className="text-[10px] md:text-sm font-bold uppercase tracking-widest">Tiệm Của Bản</span>
												</div>
												<p className="text-sm md:text-lg font-medium italic leading-snug">&quot;Gói ghém chân tình Tây Bắc trong từng món quà&quot;</p>
											</div>
										</div>
									</div>
									
									{/* Floating badge */}
									<div
											className="absolute -top-6 -right-2 md:-top-10 md:-right-10 w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center border border-festive-gold/20 backdrop-blur-sm z-20 animate-bounce-slow">
										<div className="text-center">
											<p className="text-lg md:text-2xl font-bold text-premium-red leading-none">24/7</p>
											<p className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">Hỗ trợ</p>
										</div>
									</div>
								</Reveal>
							</div>
						</div>
					</div>
				</section>
				
				<section className="pt-16 pb-16 sm:pb-24 bg-white relative">
					<div className="container-main">
						<div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
							<div className="lg:col-span-1 space-y-8">
								<Reveal x={-30} y={0}>
									<div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
										<div className="h-px w-8 bg-premium-red"/>
										<span className="text-sm font-bold text-premium-red uppercase tracking-widest">
										Thông tin liên hệ
									</span>
									</div>
									<h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4 text-center lg:text-left">Kết nối trực tiếp</h2>
									<p className="text-muted-foreground text-sm leading-relaxed mb-8 text-center lg:text-left">
										Đội ngũ Tiệm Của Bản luôn sẵn sàng hỗ trợ bạn. Liên hệ qua Zalo hoặc Hotline để được tư vấn nhanh
										nhất!
									</p>
									
									<div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
										{[
											{
												icon: Phone,
												label: 'Hotline',
												value: '0339 420 806',
												href: 'tel:0339420806',
												color: 'text-premium-red',
												bgColor: 'bg-premium-red/10',
												hoverBorder: 'hover:border-premium-red/30'
											},
											{
												icon: MessageCircle,
												label: 'Zalo',
												value: 'Chat ngay với shop',
												href: 'https://zalo.me/0339420806',
												color: 'text-accent',
												bgColor: 'bg-accent/10',
												hoverBorder: 'hover:border-accent/30'
											},
											{
												icon: Mail,
												label: 'Email',
												value: 'tiemcuaban.vn@gmail.com',
												href: 'mailto:tiemcuaban.vn@gmail.com',
												color: 'text-festive-gold',
												bgColor: 'bg-festive-gold/10',
												hoverBorder: 'hover:border-festive-gold/30'
											},
											{
												icon: MapPin,
												label: 'Địa chỉ',
												value: '29 Đức Diễn, Bắc Từ Liêm, HN',
												href: 'https://maps.google.com',
												color: 'text-premium-red',
												bgColor: 'bg-premium-red/10',
												hoverBorder: 'hover:border-premium-red/30'
											}
										].map((item, index) => (
											<a
													key={index}
													href={item.href}
													target={item.icon === MapPin || item.icon === MessageCircle ? "_blank" : undefined}
													rel={item.icon === MapPin || item.icon === MessageCircle ? "noopener noreferrer" : undefined}
													className={`group flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-white transition-all duration-300 hover:shadow-lg ${item.hoverBorder}`}
											>
												<div
														className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
													<item.icon size={24}/>
												</div>
												<div className="min-w-0">
													<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
													<p className="text-sm font-bold text-foreground truncate">{item.value}</p>
												</div>
											</a>
										))}
									</div>
								</Reveal>
							</div>
							
							{/* Right: Contact Form */}
							<div className="lg:col-span-2">
								<Reveal x={30} y={0}>
									<div className="card-premium p-6 sm:p-10 relative overflow-hidden bg-white/50 backdrop-blur-sm">
										<div
												className="absolute top-0 right-0 w-32 h-32 bg-premium-red/5 rounded-full blur-3xl -mr-16 -mt-16"/>
										<div
												className="absolute bottom-0 left-0 w-32 h-32 bg-festive-gold/5 rounded-full blur-3xl -ml-16 -mb-16"/>
										
										<div className="relative z-10">
											<div className="mb-10 text-center lg:text-left">
												<h3 className="text-2xl font-heading font-bold text-foreground mb-3">Gửi tin nhắn</h3>
												<p className="text-muted-foreground text-sm">Điền thông tin dưới đây, chúng mình sẽ phản hồi
													bạn ngay lập tức.</p>
											</div>
											
											<ContactForm/>
										</div>
									</div>
								</Reveal>
							</div>
						</div>
					</div>
				</section>
				
				{/* Maps Section */}
				<section className="section-spacing bg-secondary/30 relative overflow-hidden">
					<div
							className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"/>
					<TrongDongWatermark opacity={0.03} className="text-premium-red"/>
					
					<div className="container-main relative z-10">
						<div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 sm:mb-16">
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
								<div
										className="w-16 h-16 rounded-2xl bg-premium-red/10 flex items-center justify-center shadow-sm border border-premium-red/10 group mx-auto sm:mx-0">
									<MapPin className="w-8 h-8 text-premium-red group-hover:scale-110 transition-transform"/>
								</div>
								<div className="text-center sm:text-left">
									<h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground">Ghé thăm chúng mình</h2>
									<p className="text-muted-foreground text-sm sm:text-md mt-1">
										Tìm kiếm Tiệm Của Bản tại Hà Nội hoặc Điện Biên
									</p>
								</div>
							</div>
							
							<div className="flex items-center gap-3">
								<div className="h-px w-12 bg-festive-gold/30 hidden md:block"/>
								<div className="h-2 w-2 rounded-full bg-premium-red"/>
								<div className="h-px w-12 bg-festive-gold/30 hidden md:block"/>
							</div>
						</div>
						<ContactMaps/>
					</div>
				</section>
			</Layout>
	);
}
