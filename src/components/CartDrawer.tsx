"use client";

import {AnimatePresence, motion} from 'framer-motion';
import {ArrowRight, CreditCard, Minus, Plus, ShoppingBag, Sparkles, Trash2, X} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {useCart} from '@/store/cart';
import {formatPrice} from '@/hooks/useProducts';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';

export default function CartDrawer() {
	const {items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice} = useCart();
	const totalPrice = getTotalPrice();
	
	return (
			<AnimatePresence>
				{isOpen && (
						<>
							{/* Backdrop */}
							<motion.div
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
									onClick={closeCart}
									className="fixed inset-0 bg-charcoal/60 backdrop-blur-md z-[60]"
							/>
							
							{/* Drawer */}
							<motion.div
									initial={{x: '100%'}}
									animate={{x: 0}}
									exit={{x: '100%'}}
									transition={{type: 'spring', damping: 25, stiffness: 200}}
									className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-premium-red/10"
							>
								{/* Header */}
								<div
										className="relative overflow-hidden flex items-center justify-between p-6 border-b border-premium-red/10 bg-white">
									<div
											className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 rotate-12 pointer-events-none">
										<TrongDongBadge className="w-full h-full text-premium-red"/>
									</div>
									
									<div className="flex items-center gap-4 relative z-10">
										<div
												className="w-12 h-12 rounded-2xl bg-premium-red/10 flex items-center justify-center text-premium-red shadow-sm border border-premium-red/10">
											<ShoppingBag className="w-6 h-6"/>
										</div>
										<div>
											<h2 className="text-xl font-heading font-bold text-foreground leading-tight flex items-center gap-2">
												Giỏ hàng
												<span className="text-sm font-bold bg-premium-red/10 text-premium-red px-2 py-0.5 rounded-full">
													{items.length}
												</span>
											</h2>
											<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
												Sẵn sàng khai xuân
											</p>
										</div>
									</div>
									<button
											onClick={closeCart}
											className="p-2 rounded-xl text-muted-foreground hover:text-premium-red hover:bg-premium-red/10 transition-all relative z-10"
											aria-label="Đóng"
									>
										<X className="w-6 h-6"/>
									</button>
								</div>
								
								{/* Content */}
								<div className="flex-1 overflow-y-auto p-6 relative">
									<TrongDongWatermark opacity={0.015} className="text-premium-red pointer-events-none"/>
									
									{items.length === 0 ? (
											<div className="flex flex-col items-center justify-center h-full text-center py-12 px-6">
												<div
														className="w-24 h-24 bg-secondary/30 rounded-[2.5rem] flex items-center justify-center mb-8 relative group">
													<div
															className="absolute inset-0 bg-premium-red/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
													<ShoppingBag
															className="w-12 h-12 text-muted-foreground/40 relative z-10 group-hover:scale-110 transition-transform duration-500"/>
												</div>
												<h3 className="text-2xl font-heading font-bold text-foreground mb-3">Giỏ hàng trống</h3>
												<p className="text-muted-foreground mb-10 max-w-[240px] leading-relaxed">
													Mùa xuân này hãy để Tiệm Của Bản đồng hành cùng mâm cơm gia đình bạn.
												</p>
												<button
														onClick={closeCart}
														className="btn-primary w-full bg-premium-red text-white py-4 rounded-2xl font-bold shadow-lg shadow-premium-red/20 hover:shadow-premium-red/30 flex items-center justify-center gap-2 group"
												>
													Khám phá sản phẩm
													<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
												</button>
											</div>
									) : (
											<div className="space-y-6">
												{items.map((item, idx) => (
														<motion.div
																initial={{opacity: 0, y: 20}}
																animate={{opacity: 1, y: 0}}
																transition={{delay: idx * 0.1}}
																key={`${item.id}-${item.selectedWeight}`}
																className="flex gap-4 p-4 rounded-2xl bg-white border border-border/60 hover:border-premium-red/20 hover:shadow-lift transition-all group relative overflow-hidden"
														>
															<div
																	className="absolute -bottom-4 -right-4 w-16 h-16 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rotate-12">
																<TrongDongBadge className="w-full h-full text-premium-red"/>
															</div>
															
															{/* Image */}
															<Link
																	href={`/san-pham/${item.slug || item.id}`}
																	onClick={closeCart}
																	className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/50 shadow-sm relative"
															>
																<Image
																		src={item.image || '/placeholder.svg'}
																		alt={item.name}
																		fill
																		sizes="80px"
																		className="object-cover transition-transform duration-500 group-hover:scale-110"
																/>
															</Link>
															
															{/* Details */}
															<div className="flex-1 min-w-0 flex flex-col">
																<div className="flex justify-between items-start gap-2 mb-1">
																	<Link
																			href={`/san-pham/${item.slug || item.id}`}
																			onClick={closeCart}
																			className="font-bold text-foreground hover:text-premium-red transition-colors line-clamp-1 text-md"
																	>
																		{item.name}
																	</Link>
																	<button
																			onClick={() => removeItem(item.id, item.selectedWeight)}
																			className="p-1 text-muted-foreground/40 hover:text-destructive transition-colors"
																			aria-label="Xóa"
																	>
																		<Trash2 className="w-4 h-4"/>
																	</button>
																</div>
																
																<div className="flex items-center gap-2 mb-2">
																	{item.selectedWeight && (
																			<span
																					className="text-[10px] font-bold bg-secondary/50 text-muted-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
																				{item.selectedWeight}
																			</span>
																	)}
																	<p className="text-sm text-premium-red font-bold">
																		{formatPrice(item.selectedPrice)}
																	</p>
																</div>
																
																{/* Quantity */}
																<div className="flex items-center justify-between mt-auto">
																	<div
																			className="flex items-center bg-secondary/30 rounded-xl p-1 border border-border/30">
																		<button
																				onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedWeight)}
																				className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-premium-red transition-all shadow-sm disabled:opacity-30"
																				aria-label="Giảm"
																				disabled={item.quantity <= 1}
																		>
																			<Minus className="w-3 h-3"/>
																		</button>
																		<span className="w-8 text-center text-sm font-bold text-foreground">
																			{item.quantity}
																		</span>
																		<button
																				onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedWeight)}
																				className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-premium-red transition-all shadow-sm"
																				aria-label="Tăng"
																		>
																			<Plus className="w-3 h-3"/>
																		</button>
																	</div>
																	
																	<p className="text-xs font-bold text-muted-foreground/60">
																		Tổng: <span
																			className="text-foreground">{formatPrice(item.selectedPrice * item.quantity)}</span>
																	</p>
																</div>
															</div>
														</motion.div>
												))}
											</div>
									)}
								</div>
								
								{/* Footer */}
								{items.length > 0 && (
										<div className="p-6 border-t border-premium-red/10 bg-white relative overflow-hidden">
											<div
													className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-premium-red/[0.02] to-festive-gold/[0.02] pointer-events-none"/>
											
											<div className="space-y-4 relative z-10">
												<div className="flex items-center justify-between">
													<span className="text-muted-foreground font-medium">Tạm tính:</span>
													<span className="text-2xl font-heading font-black text-premium-red tracking-tight">
														{formatPrice(totalPrice)}
													</span>
												</div>
												
												<div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/30">
													<div
															className="w-8 h-8 rounded-lg bg-premium-red/10 flex items-center justify-center text-premium-red">
														<Sparkles size={16} className="animate-pulse"/>
													</div>
													<p className="text-[11px] text-muted-foreground font-medium leading-tight">
														Phí vận chuyển sẽ được cập nhật chính xác tại bước thanh toán.
													</p>
												</div>
												
												<Link
														href="/thanh-toan"
														onClick={closeCart}
														className="w-full bg-premium-red text-white py-5 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(185,28,28,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 group relative overflow-hidden"
												>
													<div
															className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>
													<CreditCard className="w-5 h-5 group-hover:rotate-12 transition-transform"/>
													THANH TOÁN NGAY
													<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
												</Link>
												
												<p className="text-[10px] text-center text-muted-foreground/60 font-medium flex items-center justify-center gap-1.5 uppercase tracking-tighter">
													<div className="w-1 h-1 rounded-full bg-festive-gold"/>
													Cam kết đặc sản Tây Bắc chính gốc
													<div className="w-1 h-1 rounded-full bg-festive-gold"/>
												</p>
											</div>
										</div>
								)}
							</motion.div>
						</>
				)}
			</AnimatePresence>
	);
}
