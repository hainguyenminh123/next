"use client";

import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {AnimatePresence, motion} from 'framer-motion';
import {Menu, Phone, Search, ShoppingBag, X} from 'lucide-react';
import {useCart} from '@/store/cart';

import {TrongDongBadge} from "@/components/TrongDongPattern";

const navLinks = [
	{href: '/', label: 'TRANG CHỦ'},
	{href: '/san-pham', label: 'SẢN PHẨM'},
	{href: '/thu-vien', label: 'THƯ VIỆN'},
	{href: '/gioi-thieu', label: 'VỀ CHÚNG TÔI'},
	{href: '/lien-he', label: 'LIÊN HỆ'},
];

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const headerRef = useRef<HTMLElement | null>(null);
	const pathname = usePathname();
	const {toggleCart, getTotalItems} = useCart();
	const totalItems = getTotalItems();
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);
	
	useEffect(() => {
		setIsMounted(true);
	}, []);
	
	useLayoutEffect(() => {
		const header = headerRef.current;
		if (!header) return;
		
		const setHeight = () => {
			const height = Math.ceil(header.getBoundingClientRect().height);
			const currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height');
			if (currentHeight !== `${height}px`) {
				document.documentElement.style.setProperty('--navbar-height', `${height}px`);
			}
		};
		
		setHeight();
		
		if (typeof ResizeObserver === 'undefined') {
			window.addEventListener('resize', setHeight);
			return () => window.removeEventListener('resize', setHeight);
		}
		
		const observer = new ResizeObserver(() => setHeight());
		observer.observe(header);
		return () => observer.disconnect();
	}, []);
	
	return (
			<>
				<header
						ref={headerRef}
						className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-300 ${
								isScrolled
										? 'bg-white/90 backdrop-blur-md shadow-medium py-2'
										: 'bg-transparent py-3'
						}`}
				>
					
					{!isScrolled && (
							<div
									className="container-fluid-main mb-2 hidden lg:flex justify-end items-center gap-6 text-[10px] font-bold tracking-widest text-premium-red/60 uppercase"
							>
								<span className="flex items-center gap-1.5"><Phone className="w-3 h-3"/> Hotline: 0877 309 894</span>
								<span className="w-1 h-1 rounded-full bg-premium-red/20"/>
								<span className="flex items-center gap-1.5">✨ Quà Tết Tây Bắc Chính Gốc ✨</span>
							</div>
					)}
					
					<div className={`container-fluid-main transition-all duration-500 ${
							!isScrolled ? 'px-4 sm:px-6 lg:px-8' : ''
					}`}>
						<nav
								className={`relative z-10 rounded-2xl duration-300 overflow-hidden ${
										!isScrolled
												? 'bg-card/80 backdrop-blur-md border border-premium-red/10 shadow-lift'
												: 'bg-transparent'
								}`}>
							{!isScrolled && (
									<>
										<div
												className="absolute inset-0 bg-gradient-to-r from-premium-red/5 via-transparent to-festive-gold/5 pointer-events-none"/>
										<div
												className="absolute -top-10 -right-10 w-32 h-32 bg-premium-red/5 blur-3xl rounded-full pointer-events-none"/>
										<div
												className="absolute -bottom-10 -left-10 w-32 h-32 bg-festive-gold/5 blur-3xl rounded-full pointer-events-none"/>
									</>
							)}
							
								<div className={`flex items-center justify-between transition-all duration-300 px-4 md:px-8 ${
										isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
								}`}>
								<Link
										href="/"
										className="flex items-center flex-shrink-0 group relative"
								>
									<div
											className="absolute -inset-2 bg-premium-red/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
									<Image
											src="/logo.png"
											alt="Tiệm của bản"
											width={200}
											height={60}
											className={`w-auto max-w-[140px] sm:max-w-[200px] object-contain relative z-10 transition-all duration-500 group-hover:scale-105 ${
													isScrolled ? 'h-8 sm:h-10 lg:h-12' : 'h-9 sm:h-12 lg:h-14'
											}`}
											priority
									/>
								</Link>
								
								<div className="hidden lg:flex items-center gap-0.5 xl:gap-2">
									{navLinks.map((link) => (
											<Link
													key={link.href}
													href={link.href}
													className={`px-4 py-2 text-[13px] font-medium transition-all duration-300 relative group whitespace-nowrap rounded-lg hover:bg-premium-red/5 ${
															pathname === link.href
																	? 'text-premium-red'
																	: 'text-foreground/80 hover:text-premium-red'
													}`}
											>
												<span className="relative z-10">{link.label}</span>
												{pathname === link.href && (
														<motion.span
																layoutId="nav-active"
																className="absolute inset-0 bg-premium-red/5 rounded-lg -z-0"
																transition={{type: "spring", bounce: 0.2, duration: 0.6}}
														/>
												)}
												<span
														className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-premium-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10"/>
											</Link>
									))}
								</div>
								
								{/* Actions */}
								<div className="flex items-center gap-1 md:gap-2">
									<Link
											href="/san-pham"
											className="p-2.5 text-foreground/70 hover:text-premium-red transition-all hover:bg-premium-red/5 rounded-xl duration-200"
											aria-label="Tìm kiếm"
									>
										<Search className="w-5 h-5"/>
									</Link>
									
									<button
											onClick={toggleCart}
											className="relative p-2.5 text-foreground/70 hover:text-premium-red transition-all hover:bg-premium-red/5 rounded-xl duration-200 group"
											aria-label="Giỏ hàng"
									>
										<ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform"/>
										{isMounted && totalItems > 0 && (
												<motion.span
														initial={{scale: 0}}
														animate={{scale: 1}}
														className="absolute top-1.5 right-1.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-premium-red text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
												>
													{totalItems}
												</motion.span>
										)}
									</button>
									
									<div className="h-6 w-[1px] bg-border mx-1 hidden lg:block"/>
									
									{/* Mobile Menu Toggle */}
									<button
											onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
											className="p-2.5 lg:hidden text-foreground/70 hover:text-premium-red hover:bg-premium-red/5 rounded-xl transition-all duration-200"
											aria-label="Menu"
									>
										{isMobileMenuOpen ? (
												<X className="w-6 h-6"/>
										) : (
												<Menu className="w-6 h-6"/>
										)}
									</button>
								</div>
							</div>
						</nav>
					</div>
				</header>
				
				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
							<motion.div
									initial={{opacity: 0, y: -20}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0, y: -20}}
									transition={{duration: 0.3, ease: "easeOut"}}
									className="fixed inset-x-0 z-40 px-5 lg:hidden"
									style={{top: "var(--navbar-height)"}}
							>
								<div
										className="bg-card/95 backdrop-blur-xl rounded-3xl border border-premium-red/10 shadow-lift overflow-hidden relative">
									{/* Decorative Background for Mobile Menu */}
									<div
											className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 pointer-events-none overflow-hidden">
										<TrongDongBadge className="w-full h-full text-premium-red"/>
									</div>
									
									<nav className="p-6 relative z-10">
										<div className="flex flex-col gap-2">
											{navLinks.map((link, index) => (
													<motion.div
															key={link.href}
															initial={{opacity: 0, x: -10}}
															animate={{opacity: 1, x: 0}}
															transition={{delay: index * 0.05}}
													>
														<Link
																href={link.href}
																className={`text-sm font-medium py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
																		pathname === link.href
																				? 'bg-premium-red text-white shadow-medium'
																				: 'text-foreground/70 hover:bg-premium-red/5 hover:text-premium-red'
																}`}
														>
															{link.label}
															{pathname === link.href && (
																	<div className="w-1.5 h-1.5 rounded-full bg-white"/>
															)}
														</Link>
													</motion.div>
											))}
										</div>
										
										{/* Quick Contact Info in Mobile Menu */}
										<div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
											<div className="flex items-center gap-3 text-xs font-bold text-premium-red/60 px-4">
												<Phone className="w-4 h-4"/>
												0877 309 894
											</div>
											<div className="text-[10px] font-medium text-muted-foreground px-4 italic">
												✨ Quà Tết Tây Bắc Chính Gốc ✨
											</div>
										</div>
									</nav>
								</div>
							</motion.div>
					)}
				</AnimatePresence>
			</>
	);
}
