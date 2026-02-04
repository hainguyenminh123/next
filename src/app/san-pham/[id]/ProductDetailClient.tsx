"use client";

import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion, AnimatePresence} from 'framer-motion';
import Reveal from "@/components/Reveal";
import {
	BookOpen,
	Calendar,
	ChefHat,
	ChevronLeft,
	ChevronRight,
	LayoutGrid,
	MapPin,
	Minus,
	Play,
	Plus,
	Quote,
	RefreshCw,
	Scale,
	Shield,
	ShieldCheck,
	ShoppingBag,
	Sparkles,
	Star,
	Truck
} from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import ProductCard from "@/components/ProductCard";
import {formatPrice} from "@/data/products";
import {useSubmitReview} from "@/hooks/useReviews";
import {useCart} from "@/store/cart";
import {toast} from "@/components/ui/sonner";
import {getVideoThumbnail, isVideoUrl} from "@/lib/utils";
import type {Product, Review} from "@/types/database";
import {TrongDongBadge, TrongDongWatermark} from "@/components/TrongDongPattern";

const REVIEWS_PER_PAGE = 6;

export default function ProductDetailClient({
	                                            product,
	                                            relatedProducts,
	                                            initialReviews,
                                            }: {
	product: Product;
	relatedProducts: Product[];
	initialReviews?: Review[];
}) {
	const [reviewName, setReviewName] = useState("");
	const [reviewLocation, setReviewLocation] = useState("");
	const [reviewRating, setReviewRating] = useState(5);
	const [reviewContent, setReviewContent] = useState("");
	const submitReviewMutation = useSubmitReview();
	
	const [quantity, setQuantity] = useState(1);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [videoThumbnailUrls, setVideoThumbnailUrls] = useState<Record<string, string>>({});
	const [reviewPage, setReviewPage] = useState(1);
	const [isWritingReview, setIsWritingReview] = useState(false);
	
	const [selectedWeight, setSelectedWeight] = useState("");
	const [selectedPrice, setSelectedPrice] = useState(0);
	
	const {addItem, openCart} = useCart();
	
	useEffect(() => {
		const defaultWeightOption = product.weightOptions[0];
		setSelectedWeight(defaultWeightOption?.weight || "");
		setSelectedPrice(defaultWeightOption?.price || product.basePrice);
	}, [product]);
	
	const productImages = useMemo(() => product?.galleryImages?.length
			? product.galleryImages.map((img) => img.imageUrl)
			: product?.images?.length
					? product.images
					: ["/placeholder.svg"], [product]);
	
	const allReviews = useMemo(() => initialReviews || [], [initialReviews]);
	const totalReviewPages = Math.max(1, Math.ceil(allReviews.length / REVIEWS_PER_PAGE));
	
	const displayReviews = useMemo(() => {
		const start = (reviewPage - 1) * REVIEWS_PER_PAGE;
		return allReviews.slice(start, start + REVIEWS_PER_PAGE);
	}, [allReviews, reviewPage]);
	
	const isVideo = (url: string) => isVideoUrl(url);
	
	useEffect(() => {
		productImages.forEach((url) => {
			if (isVideo(url) && !videoThumbnailUrls[url]) {
				getVideoThumbnail(url)
						.then(thumbnailUrl => {
							setVideoThumbnailUrls(prev => ({...prev, [url]: thumbnailUrl}));
						})
						.catch(e => {
							console.warn('Could not generate video thumbnail', e);
						});
			}
		});
		
		// Also handle blog section images if they are videos
		product?.blogSections.forEach(section => {
			if (section.image && isVideo(section.image) && !videoThumbnailUrls[section.image] && !section.thumbnail) {
				getVideoThumbnail(section.image)
						.then(thumbnailUrl => {
							setVideoThumbnailUrls(prev => ({...prev, [section.image!]: thumbnailUrl}));
						})
						.catch(e => {
							console.warn('Could not generate video thumbnail for blog section', e);
						});
			}
		});
	}, [productImages, product?.blogSections, videoThumbnailUrls]);
	
	const handleAddToCart = () => {
		const firstImage = productImages.find((img) => !isVideo(img)) || productImages[0] || "";
		addItem(
				{
					id: product.id,
					slug: product.slug,
					name: product.name,
					image: firstImage,
					selectedWeight,
					selectedPrice,
				},
				quantity
		);
		openCart();
	};
	
	const handleWeightChange = (weight: string, price: number) => {
		setSelectedWeight(weight);
		setSelectedPrice(price);
	};
	
	const resetForm = () => {
		setReviewName("");
		setReviewLocation("");
		setReviewRating(5);
		setReviewContent("");
	};
	
	const submitReview = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await submitReviewMutation.mutateAsync({
				product_id: product.id,
				name: reviewName,
				location: reviewLocation || undefined,
				rating: reviewRating,
				content: reviewContent,
			});
			toast.success("Đã gửi đánh giá của bạn! Đánh giá sẽ hiển thị sau khi được duyệt.");
			resetForm();
			setIsWritingReview(false);
		} catch {
			toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
		}
	};
	
	const visiblePages = useMemo(() => {
		const total = totalReviewPages;
		const current = reviewPage;
		const maxButtons = 5;
		if (total <= maxButtons) return Array.from({length: total}, (_, i) => i + 1);
		const pages: (number | string)[] = [];
		const left = Math.max(2, current - 1);
		const right = Math.min(total - 1, current + 1);
		
		pages.push(1);
		if (left > 2) pages.push('...');
		for (let i = left; i <= right; i++) pages.push(i);
		if (right < total - 1) pages.push('...');
		pages.push(total);
		return pages;
	}, [reviewPage, totalReviewPages]);
	
	const handleReviewPageChange = (p: number) => {
		if (p >= 1 && p <= totalReviewPages && p !== reviewPage) {
			setReviewPage(p);
		}
	};
	
	return (
			<>
				{/* Breadcrumb - Festive Style */}
				<section className="pt-28 pb-6 bg-secondary/30 relative overflow-hidden">
					{/* Decorative background */}
					<div className="absolute inset-0 bg-gradient-to-br from-premium-red/5 via-transparent to-festive-gold/5 pointer-events-none" />
					<TrongDongWatermark opacity={0.03} className="text-premium-red" />
					
					<div className="container-main relative z-10">
						<nav className="flex items-center gap-2 text-xs md:text-sm">
							<Link href="/" className="text-muted-foreground hover:text-premium-red transition-colors font-medium">
								Trang chủ
							</Link>
							<ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50"/>
							<Link href="/san-pham" className="text-muted-foreground hover:text-premium-red transition-colors font-medium">
								Sản phẩm
							</Link>
							<ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50"/>
							<span className="text-premium-red font-bold truncate max-w-[200px] md:max-w-none">{product.name}</span>
						</nav>
					</div>
				</section>
				
				{/* Product Detail */}
				<section className="py-8 md:py-12">
					<div className="container-main">
						<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
							{/* Image Gallery Slider */}
							<Reveal
									x={-20}
									className="space-y-4 w-full"
							>
								{/* Main Media */}
								<div className="relative aspect-square sm:aspect-[4/3] md:aspect-square lg:aspect-square rounded-xl md:rounded-[2rem] overflow-hidden bg-muted shadow-lift group/media border border-premium-red/5">
									{isVideo(productImages[currentImageIndex]) ? (
											<video
													src={productImages[currentImageIndex]}
													controls
													className="w-full h-full object-cover"
													autoPlay
													muted
													loop
											/>
									) : (
											<motion.img
													key={currentImageIndex}
													initial={{opacity: 0, scale: 1.1}}
													animate={{opacity: 1, scale: 1}}
													transition={{duration: 0.5}}
													src={productImages[currentImageIndex]}
													alt={`${product.name} - Ảnh ${currentImageIndex + 1}`}
													className="w-full h-full object-cover"
											/>
									)}
									
									{/* Navigation Arrows */}
									{productImages.length > 1 && (
											<AnimatePresence>
												<motion.button
														initial={{opacity: 0}}
														animate={{opacity: 1}}
														exit={{opacity: 0}}
														onClick={() => setCurrentImageIndex(prev =>
																prev === 0 ? productImages.length - 1 : prev - 1
														)}
														className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-premium-red border border-premium-red/10
                                       hover:bg-premium-red hover:text-white transition-all duration-300 shadow-xl z-20 opacity-100 lg:opacity-0 lg:group-hover/media:opacity-100"
														aria-label="Ảnh trước"
												>
													<ChevronLeft className="w-4 h-4 md:w-6 md:h-6"/>
												</motion.button>
												<motion.button
														initial={{opacity: 0}}
														animate={{opacity: 1}}
														exit={{opacity: 0}}
														onClick={() => setCurrentImageIndex(prev =>
																prev === productImages.length - 1 ? 0 : prev + 1
														)}
														className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-premium-red border border-premium-red/10
                                       hover:bg-premium-red hover:text-white transition-all duration-300 shadow-xl z-20 opacity-100 lg:opacity-0 lg:group-hover/media:opacity-100"
														aria-label="Ảnh tiếp"
												>
													<ChevronRight className="w-4 h-4 md:w-6 md:h-6"/>
												</motion.button>
											</AnimatePresence>
									)}
									
									{/* Dots Indicator */}
									<div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
										{productImages.map((_, idx) => (
												<button
														key={idx}
														onClick={() => setCurrentImageIndex(idx)}
														className={`h-1 md:h-2 rounded-full transition-all duration-300 shadow-sm ${
																idx === currentImageIndex
																		? 'bg-festive-gold w-4 md:w-8'
																		: 'bg-white/60 hover:bg-white/80 w-1 md:w-2'
														}`}
														aria-label={`Xem ảnh ${idx + 1}`}
												/>
										))}
									</div>

									{/* Decorative Trống Đồng in corner */}
									<div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 pointer-events-none">
										<TrongDongBadge className="w-8 h-8 md:w-12 md:h-12 text-festive-gold drop-shadow-lg opacity-70" />
									</div>
								</div>
								
								{/* Thumbnails */}
								<div className="flex gap-2 md:gap-3 overflow-x-auto py-1 px-0.5 scrollbar-hide snap-x">
									{productImages.map((img, idx) => (
											<button
													key={idx}
													onClick={() => setCurrentImageIndex(idx)}
													className={`w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 rounded-lg md:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 relative snap-start ${
															idx === currentImageIndex
																	? 'border-premium-red shadow-md scale-95 md:scale-100'
																	: 'border-transparent hover:border-premium-red/30'
													}`}
											>
												{isVideo(img) ? (
														<>
															<Image
																	src={videoThumbnailUrls[img] || '/placeholder.svg'}
																	alt={`${product.name} video thumbnail ${idx + 1}`}
																	fill
																	sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
																	className="object-cover"
															/>
															<div className="absolute inset-0 flex items-center justify-center bg-black/30">
																<div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
																	<Play className="w-4 h-4 text-white fill-white"/>
																</div>
															</div>
														</>
												) : (
														<Image
																src={img}
																alt={`${product.name} thumbnail ${idx + 1}`}
																fill
																sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
																className="object-cover"
														/>
												)}
											</button>
									))}
								</div>
							</Reveal>
							
							{/* Product Info */}
							<Reveal
									x={20}
									delay={0.1}
									className="flex flex-col relative"
							>
								{/* Decorative Background Pattern */}
								<div className="absolute top-0 right-0 w-48 h-48 opacity-[0.03] pointer-events-none -z-10 rotate-12 overflow-hidden">
									<TrongDongBadge className="w-full h-full text-premium-red" />
								</div>

								{/* Tag & Category */}
								<div className="flex flex-wrap items-center gap-1.5 md:gap-3 mb-4">
									<span className="tag-product text-[9px] xs:text-[10px] md:text-xs uppercase tracking-wider bg-premium-red/10 border-premium-red/20 !text-premium-red !shadow-none py-1 px-2 md:px-3">
										{product.category}
									</span>
									{product.isBestSeller && (
										<span className="tag-product text-[9px] xs:text-[10px] md:text-xs uppercase tracking-wider bg-festive-gold/10 border-festive-gold/30 !text-premium-red !shadow-none font-bold py-1 px-2 md:px-3">
											✨ Bán chạy
										</span>
									)}
								</div>
								
								{/* Name & Price */}
								<h1 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
									{product.name}
								</h1>
								
								<div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-8">
									<p className="text-xl xs:text-2xl md:text-3xl lg:text-4xl font-extrabold text-premium-red">
										{formatPrice(selectedPrice)}
									</p>
									{product.basePrice > selectedPrice && (
										<p className="text-sm md:text-lg lg:text-xl text-muted-foreground line-through opacity-60">
											{formatPrice(product.basePrice)}
										</p>
									)}
								</div>
								
								{/* Short Description */}
								<div className="text-md prose prose-md max-w-none text-muted-foreground mb-8 leading-relaxed">
									<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
										{product.shortDescription || product.description.slice(0, 160)}
									</ReactMarkdown>
								</div>
								
								{/* Weight Options Selector */}
								{product.weightOptions && product.weightOptions.length > 0 && (
										<div className="mb-8">
											<div className="flex items-center gap-2 mb-4">
												<Scale className="w-4 h-4 text-premium-red"/>
												<span className="text-foreground font-bold text-xs md:text-sm uppercase tracking-wider">Chọn khối lượng:</span>
											</div>
											<div className="flex flex-wrap gap-2 md:gap-3">
												{product.weightOptions.map((option) => (
														<button
																key={option.id}
																onClick={() => handleWeightChange(option.weight, option.price)}
																className={`px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border-2 transition-all font-bold flex flex-col items-start gap-0.5 min-w-[80px] md:min-w-[100px] ${
																		selectedWeight === option.weight
																				? 'border-premium-red bg-premium-red/5 text-premium-red shadow-md shadow-premium-red/5'
																				: 'border-border hover:border-premium-red/30 text-muted-foreground hover:text-premium-red'
																}`}
														>
															<span className="text-xs md:text-sm">{option.weight}</span>
															<span className={`text-[10px] md:text-xs ${selectedWeight === option.weight ? 'text-premium-red/70' : 'text-muted-foreground/60'}`}>
																{formatPrice(option.price)}
															</span>
														</button>
												))}
											</div>
										</div>
								)}
								
								{/* Actions: Quantity & Add to Cart */}
								<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mb-10">
									{/* Quantity Selector */}
									<div className="flex items-center justify-between border-2 border-border rounded-xl md:rounded-2xl p-1.5 bg-white/50 backdrop-blur-sm sm:min-w-[140px] h-[52px] md:h-[58px]">
										<button
												onClick={() => setQuantity(Math.max(1, quantity - 1))}
												className="w-10 h-10 flex items-center justify-center hover:bg-premium-red/10 rounded-lg md:rounded-xl transition-colors text-premium-red"
												aria-label="Giảm"
										>
											<Minus className="w-4 h-4 md:w-5 h-5"/>
										</button>
										<span className="flex-1 text-center font-bold  text-md">{quantity}</span>
										<button
												onClick={() => setQuantity(quantity + 1)}
												className="w-10 h-10 flex items-center justify-center hover:bg-premium-red/10 rounded-lg md:rounded-xl transition-colors text-premium-red"
												aria-label="Tăng"
										>
											<Plus className="w-4 h-4 md:w-5 h-5"/>
										</button>
									</div>

									{/* Add to Cart Button */}
									<button
											onClick={handleAddToCart}
											className="flex-1 btn-primary flex items-center justify-center gap-2 md:gap-3 !py-3 md:!py-4 !rounded-xl md:!rounded-2xl bg-premium-red hover:bg-premium-red-light text-white font-bold shadow-lg shadow-premium-red/20 group h-[52px] md:h-[58px] text-md"
									>
										<ShoppingBag className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform"/>
										THÊM VÀO GIỎ HÀNG
									</button>
								</div>
								
								{/* Trust Badges - Premium Grid */}
								<div className="mt-auto pt-8 border-t border-premium-red/10">
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
										<div className="flex flex-col gap-2 group/badge">
											<div className="flex items-center gap-2.5">
												<div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-premium-red/5 flex items-center justify-center group-hover/badge:bg-premium-red group-hover/badge:text-white transition-all">
													<Shield className="w-4 h-4 md:w-5 md:h-5 text-premium-red group-hover/badge:text-white"/>
												</div>
												<span className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-tight leading-none">An toàn <br/> thực phẩm</span>
											</div>
											<p className="text-[10px] md:text-[11px] text-muted-foreground leading-relaxed">Chính gốc Điện Biên, nguyên liệu tự nhiên.</p>
										</div>
										<div className="flex flex-col gap-2 group/badge">
											<div className="flex items-center gap-2.5">
												<div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-premium-red/5 flex items-center justify-center group-hover/badge:bg-premium-red group-hover/badge:text-white transition-all">
													<RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-premium-red group-hover/badge:text-white"/>
												</div>
												<span className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-tight leading-none">Hoàn trả <br/> miễn phí</span>
											</div>
											<p className="text-[10px] md:text-[11px] text-muted-foreground leading-relaxed">Đổi SP mới không phí nếu lỗi vận chuyển.</p>
										</div>
										<div className="flex flex-col gap-2 group/badge col-span-2 sm:col-span-1">
											<div className="flex items-center gap-2.5">
												<div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-premium-red/5 flex items-center justify-center group-hover/badge:bg-premium-red group-hover/badge:text-white transition-all">
													<Truck className="w-4 h-4 md:w-5 md:h-5 text-premium-red group-hover/badge:text-white"/>
												</div>
												<span className="text-[10px] md:text-xs font-bold text-foreground uppercase tracking-tight leading-none">Giao nhận <br/> toàn quốc</span>
											</div>
											<p className="text-[10px] md:text-[11px] text-muted-foreground leading-relaxed">Giao tận tay toàn quốc – Hỏa tốc tại HN.</p>
										</div>
									</div>
								</div>
							</Reveal>
						</div>
						
						{/* Product Details with Icons */}
						<div className="mt-12 md:mt-16">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{/* Origin */}
								{product.origin && (
										<Reveal
												y={20}
												delay={0.1}
												className="card-premium p-6 md:p-8 bg-card/50 backdrop-blur-sm border-premium-red/10 hover:border-premium-red/30 transition-all duration-500 relative overflow-hidden group/info"
										>
											<div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-[0.03] group-hover/info:opacity-[0.08] transition-opacity duration-500">
												<TrongDongBadge className="w-full h-full text-premium-red" />
											</div>
											<div className="flex items-center gap-3 md:gap-4 mb-4">
												<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-premium-red/10 flex items-center justify-center text-premium-red group-hover/info:bg-premium-red group-hover/info:text-white transition-all">
													<MapPin className="w-5 h-5 md:w-6 md:h-6"/>
												</div>
												<h4 className="font-heading font-bold text-foreground text-lg md:text-xl">Nguồn gốc</h4>
											</div>
											<div className="text-sm prose prose-md max-w-none text-muted-foreground leading-relaxed">
												<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
													{product.origin || ''}
												</ReactMarkdown>
											</div>
										</Reveal>
								)}
								
								{/* Storage */}
								{product.storageInfo && (
										<Reveal
												y={20}
												delay={0.2}
												className="card-premium p-6 md:p-8 bg-card/50 backdrop-blur-sm border-premium-red/10 hover:border-premium-red/30 transition-all duration-500 relative overflow-hidden group/info"
										>
											<div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-[0.03] group-hover/info:opacity-[0.08] transition-opacity duration-500">
												<TrongDongBadge className="w-full h-full text-premium-red" />
											</div>
											<div className="flex items-center gap-3 md:gap-4 mb-4">
												<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-premium-red/10 flex items-center justify-center text-premium-red group-hover/info:bg-premium-red group-hover/info:text-white transition-all">
													<ShieldCheck className="w-5 h-5 md:w-6 md:h-6"/>
												</div>
												<h4 className="font-heading font-bold text-foreground text-lg md:text-xl">Bảo quản</h4>
											</div>
											<div className="text-sm prose prose-md max-w-none text-muted-foreground leading-relaxed">
												<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
													{product.storageInfo || ''}
												</ReactMarkdown>
											</div>
										</Reveal>
								)}
								
								{/* Cooking Tips */}
								{product.cookingTips && (
										<Reveal
												y={20}
												delay={0.3}
												className="card-premium p-6 md:p-8 bg-card/50 backdrop-blur-sm border-premium-red/10 hover:border-premium-red/30 transition-all duration-500 relative overflow-hidden group/info"
										>
											<div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-[0.03] group-hover/info:opacity-[0.08] transition-opacity duration-500">
												<TrongDongBadge className="w-full h-full text-premium-red" />
											</div>
											<div className="flex items-center gap-3 md:gap-4 mb-4">
												<div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-premium-red/10 flex items-center justify-center text-premium-red group-hover/info:bg-premium-red group-hover/info:text-white transition-all">
													<ChefHat className="w-5 h-5 md:w-6 md:h-6"/>
												</div>
												<h4 className="font-heading font-bold text-foreground text-lg md:text-xl">Chế biến</h4>
											</div>
											<div className="text-sm prose prose-md max-w-none text-muted-foreground leading-relaxed">
												<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
													{product.cookingTips || ''}
												</ReactMarkdown>
											</div>
										</Reveal>
								)}
							</div>
						</div>
						
						{/* Blog-style Product Description */}
						{product.blogIntro && product.blogSections.length > 0 && (
								<Reveal
										y={30}
								className="mt-16 md:mt-24 relative pt-16 pb-16 overflow-hidden px-4 md:px-6"
								>
									{/* Background Decorations for Blog Section */}
									<div className="absolute inset-0 bg-gradient-to-b from-premium-red/5 via-transparent to-festive-gold/5 pointer-events-none rounded-3xl" />
									<div className="absolute top-1/4 -left-20 w-80 h-80 bg-premium-red/5 blur-[120px] rounded-full pointer-events-none" />
									<div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-festive-gold/10 blur-[120px] rounded-full pointer-events-none" />
									
									<div className="relative z-10">
										<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
											<div className="flex items-center gap-5">
												<div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-premium-red/10 to-festive-gold/10 flex items-center justify-center border border-premium-red/20 shadow-sm relative group">
													<div className="absolute inset-0 bg-festive-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
													<BookOpen className="w-6 h-6 md:w-7 md:h-7 text-premium-red relative z-10"/>
												</div>
												<div>
													<Reveal
															y={10}
															className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
													>
														<span>✨ Câu chuyện sản phẩm ✨ </span>
													</Reveal>
													<h2 className="text-2xl md:text-5xl font-heading font-bold text-foreground relative pb-4">
														Tinh hoa <span className="text-premium-red">ẩm thực</span> Tây Bắc
														<Reveal
															width="80%"
															delay={0.5}
															duration={0.8}
															className="h-1.5 bg-gradient-to-r from-premium-red/20 via-festive-gold/30 to-premium-red/20 absolute bottom-0 left-0 rounded-full"
														>
															<span className="sr-only">decorative line</span>
														</Reveal>
													</h2>
												</div>
											</div>
											<p className="text-muted-foreground text-md max-w-md italic border-l-2 border-premium-red/20 pl-4">
												Tìm hiểu về quy trình tâm huyết để tạo ra món <b className="text-premium-red uppercase">{product.name}</b> chuẩn vị nhất.
											</p>
										</div>
										
										{/* Intro Paragraph */}
										<div className="card-premium p-8 md:p-12 mb-16 bg-white/60 backdrop-blur-md border-premium-red/10 relative overflow-hidden group/intro shadow-xl rounded-3xl">
											<div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] pointer-events-none group-hover/intro:opacity-[0.08] group-hover/intro:scale-110 group-hover/intro:text-festive-gold transition-all duration-700">
												<TrongDongBadge className="w-full h-full text-premium-red" />
											</div>
											<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-festive-gold/5 blur-3xl rounded-full pointer-events-none" />
											
											<div className="prose prose-sm md:prose-lg max-w-none text-muted-foreground leading-relaxed relative z-10">
												<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
													{product.blogIntro || ''}
												</ReactMarkdown>
											</div>
										</div>
										
										{/* Blog Sections with Images */}
										<div className="space-y-16 md:space-y-24">
											{product.blogSections.map((section, index) => (
													<Reveal
															key={section.id}
															y={30}
															delay={index * 0.15}
															duration={0.6}
															className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center ${
																	index % 2 === 1 ? 'md:flex-row-reverse' : ''
															}`}
													>
														{/* Image or Video with Premium Styling */}
														<div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
															<div className="relative aspect-[4/3] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white group/section-media ring-1 ring-premium-red/5">
																{section.image && isVideoUrl(section.image) ? (
																		<video
																				src={section.image}
																				controls
																				className="w-full h-full object-cover"
																				poster={section.thumbnail || videoThumbnailUrls[section.image] || productImages[0]}
																		/>
																) : (
																		<Image
																				src={section.image || productImages[0] || '/placeholder.svg'}
																				alt={section.title}
																				fill
																				sizes="(max-width: 768px) 100vw, 50vw"
																				className="object-cover transition-transform duration-1000 group-hover/section-media:scale-110"
																		/>
																)}
																<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/section-media:opacity-100 transition-opacity duration-500 pointer-events-none" />
																
																{/* Step Number Badge - Festive Update */}
																<div
																		className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-premium-red to-premium-red-light text-white rounded-xl md:rounded-2xl flex items-center justify-center font-heading font-bold text-lg md:text-2xl shadow-2xl border-2 border-white/30 z-10 group-hover/section-media:scale-110 group-hover/section-media:rotate-6 transition-all duration-500">
																	{index + 1}
																	<div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-festive-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
																</div>
															</div>
														</div>
														
														{/* Content */}
														<div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
															<div className="flex items-center gap-4">
																<div className="h-[2px] w-8 md:w-12 bg-gradient-to-r from-premium-red to-transparent" />
																<span className="text-premium-red font-bold text-xs md:text-sm uppercase tracking-[0.3em]">Giai đoạn {index + 1}</span>
															</div>
															<h3 className="text-2xl md:text-4xl font-heading font-bold text-foreground group-hover:text-premium-red transition-colors duration-300">
																{section.title}
															</h3>
															<div className="prose prose-sm md:prose-lg max-w-none text-muted-foreground leading-relaxed">
																<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
																	{section.content}
																</ReactMarkdown>
															</div>
															
															{/* Festive Decorative Line */}
															<div className="h-0.5 w-16 bg-premium-red/10 group-hover:w-32 group-hover:bg-festive-gold/40 transition-all duration-500" />
														</div>
													</Reveal>
											))}
										</div>
									</div>
								</Reveal>
						)}
						
						{/* Customer Reviews Section with Pagination */}
						<div className="mt-16 md:mt-24 pb-16 relative overflow-hidden px-4 md:px-6">
							{/* Decorative background for a reviews section */}
							<div className="absolute inset-0 bg-gradient-to-b from-premium-red/5 via-transparent to-transparent pointer-events-none rounded-3xl" />
							<div className="absolute top-1/4 -right-20 w-80 h-80 bg-premium-red/5 blur-[120px] rounded-full pointer-events-none" />
							<div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-festive-gold/10 blur-[120px] rounded-full pointer-events-none" />
							
							<div className="relative z-10">
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-16">
									<div>
										<Reveal
												y={10}
												className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
										>
											✨ Trải Nghiệm Khách Hàng ✨
										</Reveal>
										<h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
											{isWritingReview ? 'Chia sẻ cảm nhận' : `Đánh giá sản phẩm (${allReviews.length})`}
										</h2>
									</div>
									<button 
											className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm border ${
													isWritingReview 
															? 'bg-white text-premium-red border-premium-red/20 hover:bg-premium-red/5' 
															: 'bg-premium-red text-white border-premium-red/10 hover:bg-premium-red-light hover:-translate-y-1'
											}`}
											onClick={() => setIsWritingReview((v) => !v)}
									>
										{isWritingReview ? (
												<>
													<ChevronLeft className="w-4 h-4" />
													Quay lại
												</>
										) : (
												<>
													<Star className="w-4 h-4 fill-white" />
													Viết đánh giá
												</>
										)}
									</button>
								</div>
								
								{isWritingReview ? (
										<Reveal
												y={20}
												as="form"
												onSubmit={submitReview}
												className="card-premium p-8 md:p-10 space-y-8 bg-white/80 backdrop-blur-md border-premium-red/20 relative overflow-hidden group/form shadow-2xl rounded-[2rem]"
										>
											{/* Decorative background for form */}
											<div className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.03] pointer-events-none group-hover/form:opacity-[0.08] transition-opacity duration-700">
												<TrongDongBadge className="w-full h-full text-premium-red" />
											</div>
											<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-festive-gold/5 blur-3xl rounded-full pointer-events-none" />
											
											<div className="relative z-10 grid md:grid-cols-2 gap-8">
												<div className="space-y-6">
													<div className="flex flex-col gap-2.5">
														<label className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
															<span className="w-1.5 h-1.5 rounded-full bg-premium-red" />
															Họ và tên
														</label>
														<input type="text" value={reviewName}
														       onChange={(e) => setReviewName(e.target.value)}
														       className="input-premium bg-white/50 border-premium-red/10 focus:ring-premium-red/20 focus:border-premium-red/30"
														       placeholder="Nhập họ tên của bạn" required/>
													</div>
													<div className="flex flex-col gap-2.5">
														<label className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
															<span className="w-1.5 h-1.5 rounded-full bg-premium-red" />
															Khu vực
														</label>
														<input
																type="text" value={reviewLocation}
																onChange={(e) => setReviewLocation(e.target.value)}
																className="input-premium bg-white/50 border-premium-red/10 focus:ring-premium-red/20 focus:border-premium-red/30"
																placeholder="VD: Hà Nội, TP.HCM"
														/>
													</div>
													<div className="flex flex-col gap-2.5">
														<label className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
															<span className="w-1.5 h-1.5 rounded-full bg-premium-red" />
															Mức độ hài lòng
														</label>
														<div className="flex items-center gap-3">
															{[1, 2, 3, 4, 5].map((r) => (
																	<button
																			type="button"
																			key={r}
																			onClick={() => setReviewRating(r)}
																			className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
																					r <= reviewRating 
																							? 'bg-premium-red/5 border-premium-red/30 shadow-sm' 
																							: 'bg-white/50 border-border hover:border-premium-red/20'
																			}`}
																			aria-label={`Chọn ${r} sao`}
																	>
																		<Star
																				className={`w-6 h-6 transition-all duration-300 ${
																						r <= reviewRating 
																								? 'text-festive-gold fill-festive-gold scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
																								: 'text-muted-foreground/30'
																				}`}/>
																	</button>
															))}
														</div>
													</div>
												</div>

												<div className="flex flex-col gap-2.5">
													<label className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
														<span className="w-1.5 h-1.5 rounded-full bg-premium-red" />
														Nội dung đánh giá
													</label>
													<textarea
															value={reviewContent}
															onChange={(e) => setReviewContent(e.target.value)}
															className="input-premium text-md min-h-[180px] placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-premium-red/20 focus:border-premium-red/30 transition resize-none bg-white/50 border-premium-red/10"
															placeholder="Hãy chia sẻ trải nghiệm thực tế của bạn về sản phẩm này nhé..."
															required
													/>
												</div>
											</div>

											<div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-premium-red/5 relative z-10">
												<button
														type="submit"
														className="w-full sm:w-auto px-10 py-4 bg-premium-red text-white rounded-xl font-bold hover:bg-premium-red-light transition-all duration-300 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
														disabled={submitReviewMutation.isPending}
												>
													{submitReviewMutation.isPending ? (
															<>
																Đang gửi...
															</>
													) : (
															<>
																<Sparkles className="w-5 h-5 text-festive-gold" />
																Gửi đánh giá ngay
															</>
													)}
												</button>
												<button 
														type="button" 
														className="w-full sm:w-auto px-8 py-4 bg-white text-foreground border border-border rounded-xl font-bold hover:bg-secondary transition-all" 
														onClick={() => setIsWritingReview(false)}
												>
													Quay lại
												</button>
												<p className="text-xs text-muted-foreground italic text-center sm:text-left">
													* Đánh giá của bạn sẽ được kiểm duyệt trước khi hiển thị công khai.
												</p>
											</div>
										</Reveal>
								) : (
										<>
											{displayReviews.length > 0 ? (
													<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
														{displayReviews.map((review, index) => (
																<Reveal
																		key={review.id}
																		y={40}
																		delay={index * 0.06}
																		whileHover={{y: -5}}
																		className="bg-card/80 backdrop-blur-sm p-6 md:p-7 rounded-3xl border border-premium-red/10 hover:border-festive-gold/40 hover:shadow-[0_25px_50px_-15px_rgba(212,175,55,0.25)] transition-all duration-500 relative group overflow-hidden flex flex-col h-full"
																>
																	{/* Quote Icon */}
																	<div className="relative z-10">
																		<Quote className="w-8 h-8 text-premium-red/10 group-hover:text-premium-red/20 transition-colors duration-500 mb-4"/>
																	</div>
																	
																	{/* Stars */}
																	<div className="flex gap-1 mb-4 relative z-10">
																		{[...Array(review.rating)].map((_, i) => (
																				<Star key={i} className="w-3.5 h-3.5 fill-festive-gold text-festive-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.3)]"/>
																		))}
																	</div>
																	
																	{/* Content */}
																	<div className="text-foreground leading-relaxed mb-6 text-sm md:text-[15px] italic relative z-10 line-clamp-4 flex-1">
																		<ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
																			{review.content}
																		</ReactMarkdown>
																	</div>
																	
																	{/* Author */}
																	<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-5 border-t border-premium-red/5 relative z-10 mt-auto">
																		<div>
																			<p className="font-bold text-sm text-foreground group-hover:text-premium-red transition-colors duration-300">{review.name}</p>
																			<p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{review.location}</p>
																		</div>
																		<div className="flex items-center gap-2 self-start sm:self-auto">
																			{review.createdAt && (
																					<span className="text-[10px] font-bold text-premium-red/60 bg-premium-red/5 px-3 py-1 rounded-full inline-flex items-center border border-premium-red/10">
																						<Calendar className="w-3 h-3 mr-1.5"/>
																						{new Date(review.createdAt).toLocaleDateString('vi-VN')}
																					</span>
																			)}
																		</div>
																	</div>

																	{/* Festive Decoration Line */}
																	<div className="h-0.5 w-8 bg-premium-red/20 absolute bottom-0 left-0 group-hover:w-full group-hover:bg-festive-gold/40 transition-all duration-700" />
																</Reveal>
														))}
													</div>
											) : (
													<Reveal
															y={0}
															className="text-center py-20 bg-card/40 backdrop-blur-sm rounded-3xl border border-dashed border-premium-red/20"
													>
														<div className="w-20 h-20 bg-premium-red/5 rounded-full flex items-center justify-center mx-auto mb-6">
															<Star className="w-10 h-10 text-premium-red/20" />
														</div>
														<h3 className="text-xl font-bold text-foreground mb-2">Chưa có đánh giá nào</h3>
														<p className="text-muted-foreground mb-8">Hãy là người đầu tiên chia sẻ cảm nhận về sản phẩm này!</p>
														<button
																onClick={() => setIsWritingReview(true)}
																className="btn-primary"
														>
															Viết đánh giá đầu tiên
														</button>
													</Reveal>
											)}
											
											{/* Pagination - Synchronized with Home */}
											{totalReviewPages > 1 && (
													<div className="flex flex-col items-center justify-between gap-6 mt-12 px-2">
														<div className="flex items-center gap-3 w-full sm:w-auto">
															<button
																	onClick={() => handleReviewPageChange(reviewPage - 1)}
																	disabled={reviewPage === 1}
																	className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm ${
																			reviewPage === 1
																					? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
																					: 'bg-white text-premium-red hover:bg-premium-red hover:text-white border border-premium-red/10'
																	}`}
															>
																<ChevronLeft className="w-4 h-4"/>
																Trước
															</button>
															
															<button
																	onClick={() => handleReviewPageChange(reviewPage + 1)}
																	disabled={reviewPage === totalReviewPages}
																	className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm ${
																			reviewPage === totalReviewPages
																					? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
																					: 'bg-white text-premium-red hover:bg-premium-red hover:text-white border border-premium-red/10'
																	}`}
															>
																Sau
																<ChevronRight className="w-4 h-4"/>
															</button>
														</div>
														
														<div className="flex items-center justify-center flex-wrap gap-2">
															{visiblePages.map((p, idx) =>
																	p === '...' ? (
																			<span key={`dots-${idx}`} className="px-2 text-muted-foreground">...</span>
																	) : (
																			<button
																					key={p}
																					onClick={() => handleReviewPageChange(Number(p))}
																					className={`w-10 h-10 inline-flex items-center justify-center rounded-xl transition-all duration-300 font-bold ${
																							p === reviewPage
																									? 'bg-premium-red text-white shadow-lg scale-110'
																									: 'bg-white text-muted-foreground hover:bg-premium-red/10 hover:text-premium-red border border-border/50'
																					}`}
																			>
																				{p}
																			</button>
																	)
															)}
														</div>
													</div>
											)}
										</>
								)}
							</div>
						</div>
					</div>
				</section>
				
				{/* Related Products */}
				{relatedProducts.length > 0 && (
						<section className="section-spacing bg-secondary/30 relative overflow-hidden">
							{/* Decorative Festive Background */}
							<div className="absolute inset-0 bg-gradient-to-b from-transparent via-premium-red/5 to-transparent pointer-events-none" />
							<div className="absolute top-0 right-0 w-80 h-80 bg-festive-gold/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
							<div className="absolute bottom-0 left-0 w-72 h-72 bg-premium-red/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

							{/* Cultural Watermark */}
							<TrongDongWatermark opacity={0.03} className="text-premium-red" />

							<div className="container-main relative z-10">
								{/* Header */}
								<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
									<div>
										<Reveal
												y={10}
												className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
										>
											✨ Có Thể Bạn Sẽ Thích ✨
										</Reveal>
										<h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground relative pb-4">
											Sản phẩm <span className="text-premium-red">liên quan</span>
											<Reveal
													width="60%"
													delay={0.5}
													duration={0.8}
													className="h-1.5 bg-gradient-to-r from-premium-red/20 via-festive-gold/30 to-premium-red/20 absolute bottom-0 left-0 rounded-full"
											>
												<span className="sr-only">decorative line</span>
											</Reveal>
										</h2>
									</div>
											<Link
													href="/san-pham"
													className="text-md inline-flex items-center gap-2 text-premium-red font-bold hover:gap-4 transition-all group py-2 px-4 rounded-xl hover:bg-premium-red/5"
											>
												XEM TẤT CẢ
												<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
											</Link>
										</div>

								<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
									{relatedProducts.map((relatedProduct, index) => (
											<ProductCard key={relatedProduct.id} product={relatedProduct} index={index}/>
									))}
								</div>
							</div>
						</section>
				)}
			</>
	);
}
