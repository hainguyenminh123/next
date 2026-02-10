"use client";

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {motion} from 'framer-motion';
import {useCart} from '@/store/cart';
import {ArrowRight, ShoppingBag} from 'lucide-react';
import {formatPrice} from '@/hooks/useProducts';
import type {Product} from '@/types/database';
import {getVideoThumbnail, isVideoUrl} from '@/lib/utils';
import {TrongDongBadge} from "@/components/TrongDongPattern";

interface ProductCardProps {
	product: Product;
	index?: number;
}

export default function ProductCard({product, index = 0}: ProductCardProps) {
	const router = useRouter();
	const {addItem, openCart} = useCart();
	const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
	
	const productThumbnail = product.images?.[0] || '/placeholder.svg';
	const isVideo = isVideoUrl(productThumbnail);
	
	useEffect(() => {
		if (isVideo) {
			getVideoThumbnail(productThumbnail)
					.then(setVideoThumbnail)
					.catch(console.warn);
		}
	}, [productThumbnail, isVideo]);
	
	const handleCardClick = () => {
		router.push(`/san-pham/${product.slug}`);
	};
	
	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		
		// Get the first weight option or use base price
		const firstOption = product.weightOptions[0];
		const price = firstOption?.price || product.basePrice;
		const weight = firstOption?.weight || '';
		
		addItem({
			id: product.id,
			slug: product.slug,
			name: product.name,
			image: productThumbnail,
			selectedWeight: weight,
			selectedPrice: price,
		});
		openCart();
	};
	
	const displayPrice = product.weightOptions[0]?.price || product.basePrice;
	const tag = product.category;
	
	return (
			<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.5, delay: index * 0.1}}
					className="h-full cursor-pointer"
					onClick={handleCardClick}
			>
				<div className="relative h-full group">
					<div
							className="relative h-full overflow-hidden rounded-[1.25rem] border border-premium-red/15 bg-white shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)] transition-all duration-500 group/card hover:-translate-y-1.5 hover:border-festive-gold/50 hover:shadow-[0_35px_70px_-35px_rgba(185,28,28,0.35)]">
						{/* Decorative frame */}
						<div className="absolute inset-0 pointer-events-none">
							<div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-festive-gold/20 blur-[80px]"/>
							<div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-premium-red/10 blur-[90px]"/>
						</div>
							{/* Image container */}
						<div className="relative aspect-square overflow-hidden bg-muted border-2 border-premium-red/70 rounded-[1rem] m-3">
							{isVideo ? (
									<video
										src={productThumbnail}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										muted
										playsInline
										poster={videoThumbnail || undefined}
										onMouseOver={(e) => e.currentTarget.play()}
										onMouseOut={(e) => {
											e.currentTarget.pause();
											e.currentTarget.currentTime = 0;
										}}
									/>
							) : (
									<Image
										src={productThumbnail}
										alt={product.name}
										fill
										sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
							)}
							
							<div
									className="absolute inset-0 bg-gradient-to-t from-premium-red/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"/>
							
							<div
									className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
								<div className="flex flex-col items-center gap-3">
									<button
										onClick={handleAddToCart}
										className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-premium-red text-white shadow-lg shadow-premium-red/30 hover:bg-premium-red-light hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-premium-red/50"
										aria-label="Thêm vào giỏ"
									>
										<ShoppingBag className="w-5 h-5"/>
									</button>
								</div>
							</div>
							
							{/* Top ribbon */}
							<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-premium-red via-festive-gold to-premium-red opacity-80"/>
							
							{/* Tag - Glassmorphism style from index.css */}
							<div className="absolute top-3 left-3 z-30 flex flex-wrap gap-1">
								<span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs uppercase tracking-wider font-bold bg-white/85 text-premium-red border border-premium-red/20 shadow-sm">
									{tag}
								</span>
							</div>
							
							{/* Trống Đồng badge - Enhanced */}
							<div
									className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-all duration-500 z-30 group-hover:rotate-6 group-hover:scale-110">
								<TrongDongBadge className="text-festive-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"/>
							</div>
							
						</div>
						
						{/* Content */}
						<div className="px-5 pb-5 pt-1 flex flex-col flex-1 relative">
							{/* Background Decoration (Subtle Pattern) */}
							<div
									className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] group-hover:scale-110 group-hover:text-festive-gold transition-all duration-700">
								<TrongDongBadge className="text-premium-red w-full h-full"/>
							</div>
							
							<div className="flex-1 space-y-2">
								<h3 className="text-lg font-bold text-foreground group-hover:text-premium-red transition-colors duration-300 line-clamp-2 leading-tight">
									{product.name}
								</h3>
							</div>
							
							<div className="mt-4 pt-4 border-t border-border/40 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between relative z-10">
								<div className="flex flex-col">
									<span
											className="text-[10px] uppercase tracking-widest text-premium-red/60 font-bold">Giá từ</span>
									<span
											className="text-xl font-extrabold text-foreground group-hover:text-premium-red transition-colors">
										{formatPrice(displayPrice)}
									</span>
								</div>
								
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleCardClick();
								}}
								className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-premium-red/20 text-premium-red text-xs font-bold uppercase tracking-widest group-hover:bg-premium-red group-hover:text-white group-hover:border-premium-red transition-all duration-300 self-start"
							>
									Xem
									<ArrowRight className="w-4 h-4"/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
	);
}
