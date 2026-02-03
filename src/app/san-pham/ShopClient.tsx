"use client";

import {useMemo, useState} from "react";
import {ChevronDown, LayoutGrid, ListFilter, Search, SlidersHorizontal, X} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type {Product, ProductCategory} from "@/types/database";
import {categories, formatPrice} from "@/hooks/useProducts";
import {TrongDongBadge, TrongDongWatermark} from "@/components/TrongDongPattern";
import Reveal from "@/components/Reveal";
import MotionViewport from "@/components/MotionViewport";
import {motion} from "framer-motion";

type SortOption = "default" | "price-asc" | "price-desc" | "best-seller";

const sortOptions = [
	{value: "default", label: "Mặc định"},
	{value: "price-asc", label: "Giá thấp → cao"},
	{value: "price-desc", label: "Giá cao → thấp"},
	{value: "best-seller", label: "Bán chạy"},
] as const;

export default function ShopClient({initialProducts}: { initialProducts: Product[] }) {
	const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "TẤT CẢ">("TẤT CẢ");
	const [sortBy, setSortBy] = useState<SortOption>("default");
	const [searchQuery, setSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	
	const filteredProducts = useMemo(() => {
		let result = [...initialProducts];
		
		if (selectedCategory !== "TẤT CẢ") {
			result = result.filter((p) => p.category === selectedCategory);
		}
		
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
					(p) =>
							p.name.toLowerCase().includes(q) ||
							(p.shortDescription?.toLowerCase().includes(q) ?? false) ||
							p.category.toLowerCase().includes(q)
			);
		}
		
		switch (sortBy) {
			case "price-asc":
				result.sort((a, b) => a.basePrice - b.basePrice);
				break;
			case "price-desc":
				result.sort((a, b) => b.basePrice - a.basePrice);
				break;
			case "best-seller":
				result.sort((a, b) => (b.isBestSeller ? -1 : 1));
				break;
			default:
				break;
		}
		
		return result;
	}, [initialProducts, searchQuery, selectedCategory, sortBy]);
	
	return (
			<div className="flex flex-col min-h-screen">
				{/* Hero Section */}
				<section className="relative overflow-hidden pt-22 pb-22">
					{/* Festive Background */}
					<div
							className="absolute inset-0 bg-gradient-to-br from-premium-red via-premium-red/95 to-festive-gold/40 pointer-events-none"/>
					<div
							className="absolute top-0 right-0 w-[500px] h-[500px] bg-festive-gold/15 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
					<div
							className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none"/>
					
					{/* Cultural Watermark */}
					<TrongDongWatermark opacity={0.05} className="text-white"/>
					
					<div className="container-main relative z-10 text-center">
						<MotionViewport
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-festive-gold text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-lg"
						>
							✨ TINH HOA TÂY BẮC ✨
						</MotionViewport>
						<MotionViewport
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{delay: 0.1}}
								className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 drop-shadow-xl"
						>
							Cửa Hàng <span className="text-festive-gold">Đặc Sản</span>
						</MotionViewport>
						<MotionViewport
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{delay: 0.2}}
								className="text-white/80 mt-2 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
						>
							Khám phá danh mục đặc sản chuẩn vị Điện Biên,
							được chọn lọc kỹ lưỡng cho bữa cơm Tết trọn vẹn.
						</MotionViewport>
					</div>
				</section>
				
				<section className="section-spacing">
					<div className="container-main">
						{/* Search & Filters Bar */}
						<div className="flex flex-col md:flex-row gap-6 mb-12 p-6 bg-card/50 backdrop-blur-sm rounded-3xl border border-premium-red/10 shadow-sm relative overflow-hidden group">
							{/* Decorative background for filter bar */}
							<div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] -mr-8 -mt-8 pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500">
								<TrongDongBadge className="w-full h-full text-premium-red" />
							</div>

							{/* Search */}
							<div className="relative flex-1 group/search">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-premium-red/40 group-focus-within/search:text-premium-red transition-colors"/>
								<input
										type="text"
										placeholder="Tìm sản phẩm tinh hoa..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-border bg-white/50 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-premium-red/20 focus:border-premium-red/30 transition-all text-sm"
								/>
								{searchQuery && (
										<button
												onClick={() => setSearchQuery('')}
												className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-premium-red transition-colors"
										>
											<X className="w-4 h-4"/>
										</button>
								)}
							</div>
							
							<div className="flex flex-wrap items-center gap-4">
								{/* Sort */}
								<div className="relative flex-1 md:flex-none">
									<ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-premium-red/40 pointer-events-none"/>
									<select
											value={sortBy}
											onChange={(e) => setSortBy(e.target.value as SortOption)}
											className="pl-11 pr-10 py-3.5 rounded-2xl border border-border bg-white/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-premium-red/20 appearance-none min-w-[180px] w-full cursor-pointer hover:border-premium-red/30 transition-all"
									>
										{sortOptions.map((option) => (
												<option key={option.value} value={option.value}>
													Sắp xếp: {option.label}
												</option>
										))}
									</select>
									<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
										<svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								</div>
								
								{/* Mobile Filter Toggle */}
								<button
										onClick={() => setShowFilters(!showFilters)}
										className={`md:hidden flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all ${
												showFilters 
														? 'bg-premium-red text-white shadow-lg shadow-premium-red/20' 
														: 'bg-white border border-border text-foreground hover:border-premium-red/30'
										}`}
								>
									<SlidersHorizontal className="w-4 h-4"/>
									Lọc
								</button>
							</div>
						</div>
						
						<div className="flex flex-col md:flex-row gap-8">
							{/* Sidebar Filters */}
							<aside
									className={`md:w-64 flex-shrink-0 ${
											showFilters ? 'block' : 'hidden md:block'
									}`}
							>
								<div className="sticky top-28 p-6 bg-card/40 backdrop-blur-sm rounded-3xl border border-premium-red/5 relative overflow-hidden group">
									{/* Decorative background for sidebar */}
									<div className="absolute -bottom-8 -left-8 w-24 h-24 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500">
										<TrongDongBadge className="w-full h-full text-premium-red" />
									</div>

									<div className="relative z-10">
										<h3 className="text-lg font-heading font-bold text-foreground mb-6 flex items-center gap-2">
											<div className="w-1.5 h-6 bg-premium-red rounded-full" />
											Danh mục
										</h3>
										<div className="space-y-2">
											{categories.map((category) => (
													<button
															key={category}
															onClick={() => setSelectedCategory(category)}
															className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group/btn ${
																	selectedCategory === category
																			? 'bg-premium-red text-white shadow-lg shadow-premium-red/20'
																			: 'text-muted-foreground hover:bg-premium-red/5 hover:text-premium-red'
															}`}
													>
														{category}
														{selectedCategory === category && (
																<motion.div
																		layoutId="active-cat"
																		className="w-1.5 h-1.5 rounded-full bg-festive-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
																/>
														)}
														{selectedCategory !== category && (
																<div className="w-1.5 h-1.5 rounded-full bg-premium-red/0 group-hover/btn:bg-premium-red/20 transition-all" />
														)}
													</button>
											))}
										</div>

										<div className="mt-10 pt-8 border-t border-premium-red/5">
											<div className="p-4 rounded-2xl bg-premium-red/5 border border-premium-red/10">
												<p className="text-[10px] font-bold text-premium-red/60 uppercase tracking-widest mb-2">Hỗ trợ khách hàng</p>
												<p className="text-xs font-medium text-foreground/80 leading-relaxed mb-3">Cần tư vấn chọn quà Tết chuẩn vị?</p>
												<a href="tel:0339 420 806" className="text-sm font-bold text-premium-red hover:text-premium-red-light transition-colors flex items-center gap-2">
													0339 420 806
												</a>
											</div>
										</div>
									</div>
								</div>
							</aside>
							
							{/* Products Grid */}
							<div className="flex-1">
								{filteredProducts.length === 0 ? (
										<div className="text-center py-16">
											<p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
										</div>
								) : (
										<>
											<div className="flex items-center justify-between mb-8">
												<p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-3">
													<LayoutGrid className="w-4 h-4 text-premium-red/40" />
													Hiển thị <span className="text-premium-red">{filteredProducts.length}</span> sản phẩm
												</p>
												<div className="h-px flex-1 bg-gradient-to-r from-premium-red/10 to-transparent ml-6 hidden sm:block" />
											</div>
											<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
												{filteredProducts.map((product, index) => (
														<ProductCard key={product.id} product={product} index={index}/>
												))}
											</div>
										</>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
	);
}
