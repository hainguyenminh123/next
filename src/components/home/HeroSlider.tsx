"use client";

import {useCallback, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight, ChevronLeft, ChevronRight, Sparkles} from 'lucide-react';
import {TrongDongBadge, TrongDongWatermark} from "@/components/TrongDongPattern";

const slides = [
	{
		id: 1,
		image: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/hero-bg/dac-san-dien-bien.jpg',
		badge: '✨ ĐẶC SẢN ĐIỆN BIÊN CHUẨN VỊ ✨',
		title: 'Hương vị núi rừng',
		subtitle: 'tận tay bạn',
		description: 'Khám phá tinh hoa ẩm thực Tây Bắc với những món ăn truyền thống được chế biến kỳ công, giữ trọn hương vị nguyên bản của núi rừng Điện Biên.',
	},
	{
		id: 2,
		image: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/hero-bg/thit-trau-gac-bep.jpg',
		badge: '🔥 BÁN SIÊU CHẠY 🔥',
		title: 'Thịt trâu gác bếp',
		subtitle: 'chuẩn vị núi rừng',
		description: 'Món quà quý từ vùng cao với vị ngọt của thịt trâu, mùi thơm của khói bếp và vị cay nồng của mắc khén, hạt dổi.',
	},
	{
		id: 3,
		image: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/hero-bg/lap-xuong.jpg',
		badge: '🧧 QUÀ TẾT Ý NGHĨA 🧧',
		title: 'Lạp xưởng Tây Bắc',
		subtitle: 'thơm béo đặc trưng',
		description: 'Sự kết hợp hoàn hảo giữa thịt lợn bản tươi ngon và các loại gia vị đặc trưng, tạo nên món ăn không thể thiếu trong mâm cỗ ngày Tết.',
	},
];

export default function HeroSlider() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	const nextSlide = useCallback(() => {
		setDirection(1);
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, []);
	
	const prevSlide = useCallback(() => {
		setDirection(-1);
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	}, []);
	
	const goToSlide = (index: number) => {
		setDirection(index > currentSlide ? 1 : -1);
		setCurrentSlide(index);
	};
	
	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(nextSlide, 6000);
		return () => clearInterval(interval);
	}, [isPaused, nextSlide]);
	
	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? '100%' : '-100%',
		}),
		center: {
			x: 0,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? '100%' : '-100%',
		}),
	};
	
	const slide = slides[currentSlide];
	
	if (!slide) return null;
	
	return (
			<section
					onPointerEnter={(event) => {
						if (event.pointerType === "mouse") {
							setIsPaused(true);
						}
					}}
					onPointerLeave={(event) => {
						if (event.pointerType === "mouse") {
							setIsPaused(false);
						}
					}}
					className="relative"
			>
				<div className="container-fluid-main">
					<div
							className="relative aspect-[5/3] md:aspect-[4/3] lg:aspect-[16/8] w-full rounded-3xl overflow-hidden shadow-lift border border-premium-red/10">
						{/* Cultural Watermark */}
						<TrongDongWatermark opacity={0.05} className="text-white z-10"/>
						
						{/* Slides */}
						<AnimatePresence initial={false} custom={direction} mode="wait">
							<motion.div
									key={slide.id}
									custom={direction}
									variants={slideVariants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										x: {type: 'spring', stiffness: 300, damping: 30},
										opacity: {duration: 0.5}
									}}
									className="absolute inset-0"
							>
								{/* Background Image */}
								<div className="absolute inset-0">
									<motion.div
											initial={{scale: 1.08, opacity: 0.85}}
											animate={{scale: 1, opacity: 1}}
											transition={{duration: 1.2, ease: 'easeOut'}}
											className="w-full h-full"
									>
										<Image
												src={slide.image}
												alt={slide.title}
												fill
												priority
												sizes="100vw"
												className="object-cover"
										/>
									</motion.div>
									{/* Gradients Overlay */}
									<div
											className="absolute inset-0 bg-gradient-to-t from-premium-red/20 via-transparent to-transparent z-10"/>
								</div>
								
								{/* Content */}
								<div
										className="relative h-full flex items-center justify-center md:justify-start px-5 sm:px-8 md:px-12 lg:px-24 py-8 md:py-10 z-20 text-center md:text-left">
									<div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl">
										<motion.div
												initial={{opacity: 0, x: -20}}
												animate={{opacity: 1, x: 0}}
												transition={{delay: 0.2}}
												className="inline-flex items-center justify-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-black/30 backdrop-blur-md text-[8px] sm:text-xs md:text-sm text-festive-gold rounded-full font-bold mb-3 sm:mb-6 border border-festive-gold/30 shadow-lg mx-auto md:mx-0"
										>
											<Sparkles className="w-3 h-3 sm:w-4 sm:h-4"/>
											{slide.badge}
										</motion.div>
										
										<div
												className="bg-black/20 md:bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl max-w-md md:max-w-lg">
											
											<motion.h2
													initial={{opacity: 0, y: 30}}
													animate={{opacity: 1, y: 0}}
													transition={{delay: 0.3, duration: 0.8}}
													className="text-[clamp(1.2rem,6.2vw,2.2rem)] md:text-[clamp(1.4rem,3.4vw,3.2rem)] font-bold text-white leading-[1.12] mb-3 drop-shadow-2xl"
											>
												{slide.title}
												<span
														className="block text-festive-gold drop-shadow-md mt-1 text-[0.95em]">{slide.subtitle}</span>
											</motion.h2>
											
											<motion.p
													initial={{opacity: 0, y: 20}}
													animate={{opacity: 1, y: 0}}
													transition={{delay: 0.4}}
													className="hidden sm:block text-xs sm:text-sm md:text-sm text-white/85 mb-4 drop-shadow-md leading-relaxed"
											>
												{slide.description}
											</motion.p>
											
											<motion.div
													initial={{opacity: 0, y: 20}}
													animate={{opacity: 1, y: 0}}
													transition={{delay: 0.5}}
													className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mx-auto md:mx-0"
											>
												<Link
														href="/san-pham"
														className="inline-flex items-center justify-center gap-3 bg-festive-gold text-premium-red px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl font-bold
                                 transition-all duration-300 hover:bg-white hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.5)] hover:-translate-y-1 text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto shadow-xl group"
												>
													MUA NGAY
													<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"/>
												</Link>
												<Link
														href="/gioi-thieu"
														className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl font-bold
                                 transition-all duration-300 hover:bg-white/20 hover:border-white/50 text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto shadow-xl"
												>
													TÌM HIỂU THÊM
												</Link>
											</motion.div>
										</div>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
						
						{/* Navigation Arrows */}
						<button
								onClick={prevSlide}
								className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 flex w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/20
                       items-center justify-center transition-all duration-300 hover:bg-premium-red hover:border-festive-gold hover:text-festive-gold hover:scale-110 z-30 group shadow-2xl"
								aria-label="Previous slide"
						>
							<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 group-hover:-translate-x-0.5 transition-transform"/>
						</button>
						<button
								onClick={nextSlide}
								className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 flex w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/20
                       items-center justify-center transition-all duration-300 hover:bg-premium-red hover:border-festive-gold hover:text-festive-gold hover:scale-110 z-30 group shadow-2xl"
								aria-label="Next slide"
						>
							<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 group-hover:translate-x-0.5 transition-transform"/>
						</button>
						
						{/* Dots */}
						<div
								className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 md:bottom-4 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 sm:gap-3 z-30">
							{slides.map((_, index) => (
									<button
											key={index}
											onClick={() => goToSlide(index)}
											className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 shadow-lg ${
													index === currentSlide
															? 'w-8 sm:w-10 md:w-12 bg-festive-gold'
															: 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/60'
											}`}
											aria-label={`Go to slide ${index + 1}`}
									/>
							))}
						</div>
						
						{/* Trust badges */}
						<div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-4 z-30">
							{['NGUỒN GỐC RÕ RÀNG', 'ĐÓNG GÓI SẠCH', 'SHIP TOÀN QUỐC'].map((badge, idx) => (
									<span
											key={badge}
											className="text-xs font-bold text-white flex items-center gap-2.5 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl"
									>
                <span className="w-2 h-2 rounded-full bg-festive-gold animate-pulse"/>
										{badge}
              </span>
							))}
						</div>
						
						{/* Decorative Festive Sparkle */}
						<div className="absolute top-10 right-10 z-30 pointer-events-none opacity-50">
							<TrongDongBadge className="w-20 h-20 text-festive-gold animate-spin-slow"/>
						</div>
					</div>
				</div>
			</section>
	);
}
