"use client";

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
	
	// Use short description or truncate description
	const shortDesc = product.shortDescription || product.description.slice(0, 80);
	const displayPrice = product.weightOptions[0]?.price || product.basePrice;
	const tag = product.category;
	
	return (
			<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.5, delay: index * 0.1}}
					className="h-full"
			>
				<Link href={`/san-pham/${product.slug}`} className="group block h-full">
					<div
							className="card-premium overflow-hidden h-full flex flex-col group/card relative hover:border-festive-gold/50 hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.2)]">
						{/* Image container */}
						<div className="relative aspect-square overflow-hidden bg-muted">
							{isVideo ? (
									<video
											src={productThumbnail}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
											className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
							)}
							
							{/* Soft Vignette Overlay */}
							<div
									className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"/>
							
							{/* Tag - Glassmorphism style from index.css */}
							<div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1">
								<span
										className="tag-product text-[10px] md:text-xs uppercase tracking-wider">{tag}</span>
							</div>
							
							{/* Trống Đồng badge - Enhanced */}
							<div
									className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-all duration-500 z-20 group-hover:rotate-12 group-hover:scale-110">
								<TrongDongBadge className="text-festive-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"/>
							</div>
							
							{/* Add to Cart Button - Floating style */}
							<button
									onClick={handleAddToCart}
									className="absolute bottom-4 right-4 p-3.5 bg-premium-red text-white rounded-full
                         shadow-xl opacity-0 translate-y-4 transition-all duration-500
                         group-hover:opacity-100 group-hover:translate-y-0
                         hover:bg-premium-red-light hover:scale-110 focus:outline-none focus:ring-2 focus:ring-premium-red/50"
									aria-label="Thêm vào giỏ"
							>
								<ShoppingBag className="w-5 h-5"/>
							</button>
						</div>
						
						{/* Content */}
						<div className="p-5 flex flex-col flex-1 relative bg-white dark:bg-card">
							{/* Background Decoration (Subtle Pattern) */}
							<div
									className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] group-hover:scale-110 group-hover:text-festive-gold transition-all duration-700">
								<TrongDongBadge className="text-premium-red w-full h-full"/>
							</div>
							
							<div className="flex-1 space-y-2">
								<h3 className="text-lg font-bold text-foreground group-hover:text-premium-red transition-colors duration-300 line-clamp-2 leading-tight">
									{product.name}
								</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
									{shortDesc}
								</p>
							</div>
							
							<div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between relative z-10">
								<div className="flex flex-col">
									<span
											className="text-[10px] uppercase tracking-widest text-premium-red/60 font-bold">Giá từ</span>
									<span
											className="text-xl font-extrabold text-foreground group-hover:text-premium-red transition-colors">
										{formatPrice(displayPrice)}
									</span>
								</div>
								
								<div
										className="w-8 h-8 rounded-full border border-premium-red/20 flex items-center justify-center text-premium-red group-hover:bg-premium-red group-hover:text-white group-hover:border-premium-red transition-all duration-300">
									<ArrowRight className="w-4 h-4"/>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</motion.div>
	);
}
