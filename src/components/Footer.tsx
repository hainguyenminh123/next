"use client";

import Link from 'next/link';
import Image from 'next/image';
import {Facebook, Instagram, Mail, MapPin, Phone, Youtube} from 'lucide-react';
import {motion} from 'framer-motion';
import {TrongDongBand, TrongDongWatermark} from '@/components/TrongDongPattern';

const footerLinks = {
	shop: [
		{label: 'Tất cả sản phẩm', href: '/san-pham'},
		{label: 'Thịt sấy', href: '/san-pham?danh-muc=Sấy'},
		{label: 'Đồ khô', href: '/san-pham?danh-muc=Khô'},
		{label: 'Hạt & Ngũ cốc', href: '/san-pham?danh-muc=Hạt'},
	],
	info: [
		{label: 'Về chúng tôi', href: '/gioi-thieu'},
		{label: 'Liên hệ', href: '/lien-he'},
		{label: 'Chính sách giao hàng', href: '/chinh-sach#giaohang'},
		{label: 'Đổi trả & Hoàn tiền', href: '/chinh-sach#hoantra'},
	],
};

const socialLinks = [
	{icon: Facebook, href: '#', label: 'Facebook'},
	{icon: Instagram, href: '#', label: 'Instagram'},
	{icon: Youtube, href: '#', label: 'Youtube'},
];

export default function Footer() {
	return (
			<footer
					className="bg-premium-red text-primary-foreground relative overflow-hidden border-t border-festive-gold/20">
				{/* Festive Background Decorations */}
				<div
						className="absolute inset-0 bg-gradient-to-br from-premium-red via-premium-red to-black/40 pointer-events-none opacity-95"/>
				<div
						className="absolute top-0 right-0 w-[500px] h-[500px] bg-festive-gold/15 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
				<div
						className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/30 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none"/>
				
				{/* Cultural Watermark */}
				<TrongDongWatermark opacity={0.03} className="text-white scale-100 origin-center"/>
				
				<div className="container-main relative z-10 pt-20 pb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
						{/* Brand & Social */}
						<div className="lg:col-span-4">
							<motion.div
									initial={{opacity: 0, y: 20}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
							>
								<Link href="/" className="inline-block mb-6 group p-3 rounded-2xl">
									<Image
											src="/logo.png"
											alt="Tiệm của bản"
											width={200}
											height={96}
											className="h-16 sm:h-20 md:h-24 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
									/>
								</Link>
								<p className="text-white/80 text-md leading-relaxed mb-8 max-w-sm">
									Đặc sản Tây Bắc chuẩn vị, chọn lọc từ hộ dân và HTX vùng cao.
									Mang tinh hoa núi rừng đến bàn ăn mọi gia đình Việt trong dịp Tết đoàn viên.
								</p>
								
								<div className="flex gap-4">
									{socialLinks.map((social) => (
											<a
													key={social.label}
													href={social.href}
													className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-festive-gold hover:text-premium-red transition-all duration-300 group shadow-lg"
													aria-label={social.label}
											>
												<social.icon className="w-5 h-5 group-hover:scale-110 transition-transform"/>
											</a>
									))}
								</div>
							</motion.div>
						</div>
						
						{/* Shop Links */}
						<div className="lg:col-span-2">
							<motion.h4
									initial={{opacity: 0, y: 10}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									className="font-heading font-bold text-lg mb-6 text-festive-gold"
							>
								Sản phẩm
							</motion.h4>
							<ul className="space-y-4">
								{footerLinks.shop.map((link, idx) => (
										<motion.li
												key={link.href}
												initial={{opacity: 0, x: -10}}
												whileInView={{opacity: 1, x: 0}}
												viewport={{once: true}}
												transition={{delay: idx * 0.1}}
										>
											<Link
													href={link.href}
													className="text-white/70 hover:text-festive-gold hover:pl-2 transition-all duration-300 flex items-center group font-medium"
											>
												<span
														className="w-0 h-0.5 bg-festive-gold mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
												{link.label}
											</Link>
										</motion.li>
								))}
							</ul>
						</div>
						
						{/* Info Links */}
						<div className="lg:col-span-2">
							<motion.h4
									initial={{opacity: 0, y: 10}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									className="font-heading font-bold text-lg mb-6 text-festive-gold"
							>
								Thông tin
							</motion.h4>
							<ul className="space-y-4">
								{footerLinks.info.map((link, idx) => (
										<motion.li
												key={link.href}
												initial={{opacity: 0, x: -10}}
												whileInView={{opacity: 1, x: 0}}
												viewport={{once: true}}
												transition={{delay: idx * 0.1}}
										>
											<Link
													href={link.href}
													className="text-white/70 hover:text-festive-gold hover:pl-2 transition-all duration-300 flex items-center group font-medium"
											>
												<span
														className="w-0 h-0.5 bg-festive-gold mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
												{link.label}
											</Link>
										</motion.li>
								))}
							</ul>
						</div>
						
						{/* Contact */}
						<div className="lg:col-span-4">
							<motion.h4
									initial={{opacity: 0, y: 10}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									className="font-heading font-bold text-lg mb-6 text-festive-gold"
							>
								Liên hệ
							</motion.h4>
							<ul className="space-y-6">
								<motion.li
										initial={{opacity: 0, y: 10}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-festive-gold/30 transition-colors group"
								>
									<div
											className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-festive-gold flex-shrink-0 group-hover:bg-festive-gold group-hover:text-premium-red transition-all">
										<Phone className="w-5 h-5"/>
									</div>
									<div>
										<p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Hotline</p>
										<a href="tel:0339 420 806" className="text-md font-bold hover:text-festive-gold transition-colors">
											0339 420 806
										</a>
									</div>
								</motion.li>
								
								<motion.li
										initial={{opacity: 0, y: 10}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-festive-gold/30 transition-colors group"
								>
									<div
											className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-festive-gold flex-shrink-0 group-hover:bg-festive-gold group-hover:text-premium-red transition-all">
										<Mail className="w-5 h-5"/>
									</div>
									<div>
										<p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Email</p>
										<a href="mailto:nhai3056@gmail.com"
										   className="text-md font-bold hover:text-festive-gold transition-colors">
											nhai3056@gmail.com
										</a>
									</div>
								</motion.li>
								
								<motion.li
										initial={{opacity: 0, y: 10}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-festive-gold/30 transition-colors group"
								>
									<div
											className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-festive-gold flex-shrink-0 group-hover:bg-festive-gold group-hover:text-premium-red transition-all">
										<MapPin className="w-5 h-5"/>
									</div>
									<div>
										<p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Địa chỉ</p>
										<p className="text-sm font-medium leading-relaxed">
											29 Đ. Đức Diễn, Phúc Diễn, Bắc Từ Liêm, Hà Nội
										</p>
									</div>
								</motion.li>
							</ul>
						</div>
					</div>
					
					{/* Decorative Band */}
					<div className="mt-16 mb-8">
						<TrongDongBand className="opacity-20"/>
					</div>
					
					{/* Bottom */}
					<div className="pt-8 border-t border-white/10">
						<div className="flex flex-col md:flex-row justify-between items-center gap-6">
							<p className="text-sm text-primary-foreground/40 font-medium">
								© 2025 <span className="text-festive-gold">Tiệm của bản</span>. Tất cả quyền được bảo lưu.
							</p>
							<div className="flex items-center gap-8">
								<Link
										href="/chinh-sach"
										className="text-sm text-primary-foreground/40 hover:text-festive-gold transition-colors font-medium"
								>
									Chính sách bảo mật
								</Link>
								<Link
										href="/chinh-sach"
										className="text-sm text-primary-foreground/40 hover:text-festive-gold transition-colors font-medium"
								>
									Điều khoản dịch vụ
								</Link>
							</div>
						</div>
					</div>
				</div>
				
				{/* Festive Sparkles (Decorative) */}
				<div className="absolute bottom-10 right-10 w-2 h-2 bg-festive-gold rounded-full animate-pulse blur-[1px]"/>
				<div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-700 blur-[1px]"/>
				<div
						className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-festive-gold/50 rounded-full animate-pulse delay-1000 blur-[1px]"/>
			</footer>
	);
}
