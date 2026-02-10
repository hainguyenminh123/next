import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight, Sparkles} from 'lucide-react';
import {TrongDongBadge, TrongDongWatermark} from "@/components/TrongDongPattern";

const banner = {
	image: 'https://iqerjqnjzhatvbpwiwoy.supabase.co/storage/v1/object/public/hero-bg/0339%20420%20806%20(2).png',
	badge: '✨ ĐẶC SẢN ĐIỆN BIÊN CHUẨN VỊ ✨',
	title: 'Hương vị núi rừng',
	subtitle: 'tận tay bạn',
	description: 'Khám phá tinh hoa ẩm thực Tây Bắc với những món ăn truyền thống được chế biến kỳ công, giữ trọn hương vị nguyên bản.',
};

export default function HeroSlider() {
	return (
			<section className="relative">
				<div className="container-fluid-main">
					<div className="relative aspect-[5/3] md:aspect-[4/3] lg:aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lift border border-premium-red/10 max-w-6xl mx-auto">
						<div className="absolute inset-0">
							<Image
									src={banner.image}
									alt={banner.title}
									fill
									priority
									sizes="100vw"
									className="object-cover"
							/>
						</div>
						
						<div className="relative h-full flex items-center justify-center md:justify-start px-5 sm:px-8 md:px-12 lg:px-24 py-8 md:py-10 z-20 text-center md:text-left">
							<div className="w-full max-w-[90%] sm:max-w-md md:max-w-xl">
								<div className="inline-flex items-center justify-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-black/30 text-[8px] sm:text-xs md:text-sm text-festive-gold rounded-full font-bold mb-3 sm:mb-6 border border-festive-gold/30 shadow-lg mx-auto md:mx-0">
									<Sparkles className="w-3 h-3 sm:w-4 sm:h-4"/>
									{banner.badge}
								</div>
								
								<div className="bg-black/20 md:bg-black/30 border border-white/15 rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl max-w-md md:max-w-lg">
									<h2 className="text-[clamp(1.2rem,6.2vw,2.2rem)] md:text-[clamp(1.4rem,3.4vw,3.2rem)] font-bold text-white leading-[1.12] mb-3 drop-shadow-2xl">
										{banner.title}
										<span className="block text-festive-gold drop-shadow-md mt-1 text-[0.95em]">{banner.subtitle}</span>
									</h2>
									
									<p className="hidden sm:block text-xs sm:text-sm md:text-sm text-white/85 mb-4 drop-shadow-md leading-relaxed">
										{banner.description}
									</p>
									
									<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mx-auto md:mx-0">
										<Link
												href="/san-pham"
												className="inline-flex items-center justify-center gap-3 bg-festive-gold text-premium-red px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl font-bold
                                 transition-all duration-300 hover:bg-white hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.5)] hover:-translate-y-1 text-xs sm:text-sm whitespace-nowrap w-full sm:w-auto shadow-xl group"
										>
											MUA NGAY
											<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"/>
										</Link>
									</div>
								</div>
							</div>
						</div>
						
						<div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-4 z-30">
							{['NGUỒN GỐC RÕ RÀNG', 'ĐÓNG GÓI SẠCH', 'SHIP TOÀN QUỐC'].map((badge) => (
									<span
											key={badge}
											className="text-xs font-bold text-white flex items-center gap-2.5 bg-black/45 px-4 py-2 rounded-full border border-white/10 shadow-xl"
									>
                <span className="w-2 h-2 rounded-full bg-festive-gold animate-pulse"/>
										{badge}
              </span>
							))}
						</div>
						
						<div className="absolute top-10 right-10 z-30 pointer-events-none opacity-50">
							<TrongDongBadge className="w-20 h-20 text-festive-gold animate-spin-slow"/>
						</div>
					</div>
				</div>
			</section>
	);
}
