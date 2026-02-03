import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, Gift} from 'lucide-react';
import {TrongDongWatermark} from '@/components/TrongDongPattern';
import {formatPrice} from '@/hooks/useProducts';
import {Product} from '@/types/database';
import MotionViewport from '@/components/MotionViewport';
import Reveal from '@/components/Reveal';

interface BestSellersProps {
	initialProducts?: Product[];
}

export default function BestSellers({initialProducts}: BestSellersProps) {
	const bestSellers = initialProducts || [];
	
	return (
			<MotionViewport className="section-spacing bg-premium-red text-primary-foreground overflow-hidden relative">
				{/* Festive Background Decorations */}
				<div
						className="absolute inset-0 bg-gradient-to-br from-premium-red via-premium-red to-festive-gold/20 pointer-events-none"/>
				<div
						className="absolute top-0 right-0 w-96 h-96 bg-festive-gold/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
				<div
						className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"/>
				
				{/* Trống Đồng watermark */}
				<TrongDongWatermark opacity={0.05} className="text-white"/>
				
				<div className="container-main relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<div>
							<Reveal
									className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold mb-6 shadow-lg"
									x={-30}
									y={0}
							>
								<Gift className="w-4 h-4 text-festive-gold"/>
								✨ BÁN CHẠY NHẤT ✨
							</Reveal>
							
							<Reveal
									delay={0.1}
									className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight"
									x={-30}
									y={0}
							>
								Top Sản Phẩm <br/>
								<span className="text-festive-gold">Được Yêu Thích</span>
							</Reveal>
							
							<Reveal
									delay={0.2}
									className="text-white/80 mb-8 max-w-md text-lg leading-relaxed"
									x={-30}
									y={0}
							>
								Những đặc sản Tây Bắc được khách hàng lựa chọn nhiều nhất.
								Chất lượng đã được kiểm chứng qua hàng nghìn đơn hàng chuẩn vị.
							</Reveal>
							
							<Reveal
									delay={0.3}
									className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
									x={-30}
									y={0}
							>
								<Link
										href="/san-pham"
										className="inline-flex items-center gap-2 bg-festive-gold text-premium-red px-8 py-4 rounded-xl font-bold
									 transition-all duration-300 hover:bg-white hover:shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)] hover:-translate-y-1 group text-md"
								>
									XEM TẤT CẢ SẢN PHẨM
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
								</Link>
							</Reveal>
						</div>
						
						{/* Right - Products List */}
						<div className="space-y-4">
							{bestSellers.map((product, index) => (
									<Reveal
											key={product.id}
											delay={index * 0.15}
											x={30}
											y={0}
									>
										<Link
												href={`/san-pham/${product.slug}`}
												className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10
												transition-all duration-300 hover:bg-white/10 hover:border-festive-gold/30 hover:-translate-y-1 group"
										>
											<div className="flex items-center gap-4 flex-1">
												{/* Rank */}
												<div
														className="w-12 h-12 rounded-full bg-gradient-to-br from-festive-gold to-yellow-600 text-premium-red flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-lg"
												>
													{index + 1}
												</div>
												
												{/* Image */}
												<div
														className="w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/10 relative">
													<Image
															src={product.images?.[0] || '/placeholder.svg'}
															alt={product.name}
															fill
															sizes="80px"
															className="object-cover group-hover:scale-110 transition-transform duration-500"
													/>
												</div>
												
												{/* Info */}
												<div className="flex-1 min-w-0">
													<h3 className="font-bold text-white group-hover:text-festive-gold transition-colors line-clamp-1 text-lg">
														{product.name}
													</h3>
													<p className="text-sm text-white/60 line-clamp-1">
														{product.shortDescription || product.description.slice(0, 50)}
													</p>
												</div>
											</div>
											
											{/* Price */}
											<div className="text-left sm:text-right flex-shrink-0 pl-16 sm:pl-0">
												<p className="font-bold text-festive-gold text-lg">{formatPrice(product.basePrice)}</p>
												<span className="text-xs text-white/40 uppercase tracking-wider">{product.category}</span>
											</div>
										</Link>
									</Reveal>
							))}
						</div>
					</div>
				</div>
			</MotionViewport>
	);
}
