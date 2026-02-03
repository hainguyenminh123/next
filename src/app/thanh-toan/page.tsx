"use client";

import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {motion} from 'framer-motion';
import {
	ChevronRight,
	CreditCard,
	MapPin,
	Minus,
	Plus,
	ShoppingBag,
	Sparkles,
	StickyNote,
	Trash2,
	Truck,
	User
} from 'lucide-react';
import {useCart} from '@/store/cart';
import {formatPrice} from '@/hooks/useProducts';
import {toast} from 'sonner';
import {supabase} from '@/integrations/supabase/client';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CheckoutPage() {
	const router = useRouter();
	const {items, getTotalPrice, updateQuantity, removeItem, clearCart} = useCart();
	const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		note: '',
	});
	
	const totalPrice = getTotalPrice();
	const grandTotal = totalPrice;
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
	};
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim()) {
			toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
			return;
		}
		
		const phoneClean = formData.phone.replace(/\s/g, '');
		if (!/^[0-9]{10,11}$/.test(phoneClean)) {
			toast.error('Số điện thoại không hợp lệ (10-11 số)');
			return;
		}
		
		if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			toast.error('Email không hợp lệ');
			return;
		}
		
		if (items.length === 0) {
			toast.error('Giỏ hàng trống');
			return;
		}
		
		setIsSubmitting(true);
		
		try {
			const orderItems = items.map(item => ({
				product_id: item.id,
				weight: item.selectedWeight,
				quantity: item.quantity,
			}));
			
			const {data, error} = await supabase.functions.invoke('create-order', {
				body: {
					customer_name: formData.name.trim(),
					customer_phone: phoneClean,
					customer_email: formData.email.trim() || undefined,
					shipping_address: formData.address.trim(),
					shipping_province: formData.city.trim(),
					note: formData.note.trim() || undefined,
					items: orderItems,
				},
			});
			
			if (error) throw new Error(error.message || 'Có lỗi xảy ra');
			if (data?.error) throw new Error(data.error);
			
			toast.success(`Đặt hàng thành công! Mã đơn: ${data.order?.order_number || ''}`);
			clearCart();
			router.push('/');
		} catch (error) {
			console.error('Order submission error:', error);
			toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra, vui lòng thử lại');
		} finally {
			setIsSubmitting(false);
		}
	};
	
	if (items.length === 0) {
		return (
			<div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden bg-secondary/10">
				<div className="absolute inset-0 z-0">
					<div className="absolute top-20 left-10 w-64 h-64 bg-premium-red/5 blur-[100px] rounded-full animate-pulse"/>
					<div className="absolute bottom-20 right-10 w-64 h-64 bg-festive-gold/5 blur-[100px] rounded-full animate-pulse" style={{animationDelay: '1s'}}/>
					<TrongDongWatermark opacity={0.03} className="text-premium-red"/>
				</div>
				
				<motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="text-center relative z-10 px-4">
					<div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-premium-red/10 group">
						<ShoppingBag className="w-12 h-12 text-premium-red group-hover:scale-110 transition-transform"/>
					</div>
					<h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Giỏ hàng đang trống</h1>
					<p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
						Có vẻ như bạn chưa chọn được món quà Tết nào. Hãy khám phá những thức quà Tây Bắc đặc sắc của chúng tôi nhé!
					</p>
					<Link href="/san-pham" className="inline-flex items-center gap-3 bg-premium-red text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(185,28,28,0.4)] hover:-translate-y-1 text-lg group">
						Khám phá sản phẩm
						<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
					</Link>
				</motion.div>
			</div>
		);
	}
	
	return (
		<>
			{/* Hero & Breadcrumb */}
			<section className="relative pt-32 pb-16 md:pt-48 md:pb-28 overflow-hidden bg-white">
				<div className="absolute inset-0 z-0">
					<div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"/>
					<div className="absolute inset-0 bg-gradient-to-r from-premium-red/5 via-transparent to-festive-gold/5"/>
				</div>
				
				<div className="absolute top-1/4 -left-20 w-80 h-80 bg-premium-red/10 blur-[100px] rounded-full animate-pulse"/>
				<div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-festive-gold/15 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '2s'}}/>
				
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.015] pointer-events-none">
					<TrongDongWatermark className="text-premium-red"/>
				</div>
				
				<div className="container-main relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premium-red/5 text-premium-red text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-premium-red/10 backdrop-blur-sm shadow-sm">
							<Sparkles size={14} className="animate-pulse"/>
							Mùa Xuân Gắn Kết
							<Sparkles size={14} className="animate-pulse"/>
						</motion.div>
						
						<motion.h1 initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, ease: "easeOut"}} className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-8 leading-tight">
							Hoàn tất <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-red via-accent to-festive-gold">đơn hàng</span>
						</motion.h1>
						
						<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}} className="flex items-center justify-center gap-3 text-sm font-medium">
							<Link href="/" className="text-muted-foreground hover:text-premium-red transition-all flex items-center gap-1 group">
								<span className="w-0 h-0.5 bg-premium-red group-hover:w-3 transition-all"></span>
								Trang chủ
							</Link>
							<ChevronRight className="w-4 h-4 text-muted-foreground/30"/>
							<Link href="/san-pham" className="text-muted-foreground hover:text-premium-red transition-all flex items-center gap-1 group">
								Sản phẩm
							</Link>
							<ChevronRight className="w-4 h-4 text-muted-foreground/30"/>
							<span className="text-premium-red font-bold flex items-center gap-2">
								<div className="w-1.5 h-1.5 rounded-full bg-premium-red animate-pulse"/>
								Thanh toán
							</span>
						</motion.div>
					</div>
				</div>
			</section>
			
			{/* Main Content */}
			<section className="py-12 md:py-20 bg-white relative">
				<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none"/>
				<div className="container-main relative z-10">
					<form onSubmit={handleSubmit}>
						<div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
							<div className="lg:col-span-2 space-y-10">
								<motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="card-premium p-8 relative overflow-hidden bg-white shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border-none">
									<div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] -mr-8 -mt-8 rotate-12">
										<TrongDongBadge className="w-full h-full text-premium-red"/>
									</div>
									<div className="flex items-center gap-4 mb-8">
										<div className="w-12 h-12 rounded-2xl bg-premium-red/10 flex items-center justify-center text-premium-red shadow-sm border border-premium-red/10">
											<User size={24}/>
										</div>
										<h3 className="text-2xl font-heading font-bold text-foreground">Thông tin nhận hàng</h3>
									</div>
									<div className="grid md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">Họ tên <span className="text-premium-red">*</span></label>
											<input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium" placeholder="Nguyễn Văn A" required />
										</div>
										<div className="space-y-2">
											<label className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">Số điện thoại <span className="text-premium-red">*</span></label>
											<input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium" placeholder="09xx xxx xxx" required />
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">Email (Điền hoặc bỏ qua)</label>
											<input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium" placeholder="email@example.com" />
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">Địa chỉ chi tiết <span className="text-premium-red">*</span></label>
											<input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium" placeholder="Số nhà, tên đường, phường/xã..." required />
										</div>
										<div className="md:col-span-2 space-y-2">
											<label className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">Tỉnh/Thành phố <span className="text-premium-red">*</span></label>
											<input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium" placeholder="Hà Nội, Điện Biên..." required />
										</div>
									</div>
								</motion.div>
								
								<motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="card-premium p-8 relative overflow-hidden bg-white shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border-none">
									<div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.02] -mr-8 -mb-8 rotate-45">
										<TrongDongBadge className="w-full h-full text-premium-red"/>
									</div>
									<div className="flex items-center gap-4 mb-8">
										<div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-sm border border-accent/10">
											<CreditCard size={24}/>
										</div>
										<h3 className="text-2xl font-heading font-bold text-foreground">Phương thức thanh toán</h3>
									</div>
									<div className="grid md:grid-cols-2 gap-4">
										<label className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-300 relative group ${paymentMethod === 'cod' ? 'border-premium-red bg-premium-red/5' : 'border-secondary hover:border-premium-red/30 bg-white'}`}>
											<input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
											<div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'bg-premium-red text-white' : 'bg-secondary text-muted-foreground group-hover:text-premium-red'}`}><Truck size={24}/></div>
											<div className="flex-1">
												<p className={`font-bold transition-colors ${paymentMethod === 'cod' ? 'text-premium-red' : 'text-foreground'}`}>Thanh toán khi nhận (COD)</p>
												<p className="text-xs text-muted-foreground mt-0.5">Tiền mặt khi nhận hàng</p>
											</div>
										</label>
										<label className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-300 relative group ${paymentMethod === 'bank' ? 'border-premium-red bg-premium-red/5' : 'border-secondary hover:border-premium-red/30 bg-white'}`}>
											<input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="sr-only" />
											<div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'bank' ? 'bg-premium-red text-white' : 'bg-secondary text-muted-foreground group-hover:text-premium-red'}`}><CreditCard size={24}/></div>
											<div className="flex-1">
												<p className={`font-bold transition-colors ${paymentMethod === 'bank' ? 'text-premium-red' : 'text-foreground'}`}>Chuyển khoản Ngân hàng</p>
												<p className="text-xs text-muted-foreground mt-0.5">Thanh toán qua STK shop</p>
											</div>
										</label>
									</div>
								</motion.div>
								
								<motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="card-premium p-8 relative overflow-hidden bg-white shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border-none">
									<div className="flex items-center gap-4 mb-8">
										<div className="w-12 h-12 rounded-2xl bg-festive-gold/10 flex items-center justify-center text-festive-gold shadow-sm border border-festive-gold/10">
											<StickyNote size={24}/>
										</div>
										<h3 className="text-2xl font-heading font-bold text-foreground">Ghi chú đơn hàng</h3>
									</div>
									<div className="space-y-2">
										<label className="text-xs font-bold text-foreground/60 uppercase tracking-[0.1em] ml-1">Yêu cầu đặc biệt</label>
										<textarea name="note" value={formData.note} onChange={handleInputChange} rows={4} className="w-full bg-secondary/30 border-2 border-transparent focus:border-premium-red/20 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all duration-300 placeholder:text-muted-foreground/50 font-medium resize-none" placeholder="Ghi chú về thời gian nhận, số điện thoại phụ, hoặc lời nhắn tặng quà..." />
									</div>
								</motion.div>
							</div>
							
							<div className="lg:col-span-1">
								<div className="sticky top-28 space-y-6">
									<motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="card-premium p-8 relative overflow-hidden bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-none ring-1 ring-premium-red/5">
										<div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] -mr-6 -mt-6">
											<TrongDongBadge className="w-full h-full text-premium-red"/>
										</div>
										<h3 className="text-xl font-heading font-bold text-foreground mb-8 flex items-center gap-3 pb-4 border-b border-secondary">
											Đơn hàng của bạn
											<span className="bg-premium-red text-white text-[10px] px-2.5 py-1 rounded-full">{items.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm</span>
										</h3>
										<div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
											{items.map((item) => (
												<div key={`${item.id}-${item.selectedWeight}`} className="flex gap-4 group">
													<div className="w-20 h-20 rounded-2xl overflow-hidden bg-secondary flex-shrink-0 border border-secondary shadow-sm relative">
														<Image src={item.image || '/placeholder.svg'} alt={item.name} fill sizes="80px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
													</div>
													<div className="flex-1 min-w-0">
														<div className="flex justify-between items-start gap-2">
															<p className="font-bold text-foreground text-sm line-clamp-2 leading-snug">{item.name}</p>
															<button type="button" onClick={() => removeItem(item.id, item.selectedWeight)} className="p-1.5 text-muted-foreground/40 hover:text-premium-red transition-colors bg-secondary/50 rounded-lg"><Trash2 className="w-3.5 h-3.5"/></button>
														</div>
														<p className="text-xs font-bold text-premium-red mt-1">
															{formatPrice(item.selectedPrice)} <span className="text-muted-foreground/60 font-medium mx-1">•</span> {item.selectedWeight}
														</p>
														<div className="flex items-center gap-3 mt-3">
															<div className="flex items-center border border-secondary rounded-lg bg-secondary/30">
																<button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedWeight)} className="p-1.5 hover:bg-white rounded-l-lg transition-colors text-muted-foreground" disabled={item.quantity <= 1}><Minus className="w-3 h-3"/></button>
																<span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
																<button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedWeight)} className="p-1.5 hover:bg-white rounded-r-lg transition-colors text-muted-foreground"><Plus className="w-3 h-3"/></button>
															</div>
															<p className="text-xs font-bold text-foreground ml-auto">{formatPrice(item.selectedPrice * item.quantity)}</p>
														</div>
													</div>
												</div>
											))}
										</div>
										<div className="border-t border-secondary pt-6 space-y-4">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground font-medium">Tạm tính</span>
												<span className="text-foreground font-bold">{formatPrice(totalPrice)}</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground font-medium">Phí vận chuyển</span>
												<span className="text-green-600 font-bold italic">Miễn phí</span>
											</div>
											<div className="flex justify-between pt-6 border-t-2 border-premium-red/10 border-dashed">
												<span className="font-heading font-bold text-foreground text-lg">Tổng cộng</span>
												<div className="text-right">
													<span className="font-bold text-2xl text-premium-red block leading-none">{formatPrice(grandTotal)}</span>
													<span className="text-[10px] text-muted-foreground font-medium">(Đã bao gồm VAT)</span>
												</div>
											</div>
										</div>
										<button type="submit" className="w-full mt-8 bg-premium-red text-white py-5 rounded-2xl font-bold transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(185,28,28,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group overflow-hidden relative shadow-lg shadow-premium-red/20" disabled={isSubmitting}>
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>
											{isSubmitting ? (
												<span className="flex items-center justify-center gap-2"><LoadingSpinner size="sm"/>ĐANG XỬ LÝ...</span>
											) : (
												<><CreditCard className="w-5 h-5 group-hover:rotate-12 transition-transform"/>ĐẶT HÀNG NGAY</>
											)}
										</button>
										<div className="mt-6 flex items-center justify-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
											<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
											<p className="text-[11px] font-bold text-green-700 uppercase tracking-wider">Thanh toán an toàn 100%</p>
										</div>
										<p className="text-[10px] text-muted-foreground text-center mt-6 leading-relaxed">
											Bằng việc đặt hàng, bạn đồng ý với <Link href="/chinh-sach" className="text-premium-red hover:underline font-bold">điều khoản dịch vụ</Link> và chính sách bảo mật của Tiệm Của Bản.
										</p>
									</motion.div>
									<div className="grid grid-cols-2 gap-4">
										<div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-secondary flex flex-col items-center text-center gap-2">
											<Truck size={20} className="text-premium-red"/>
											<p className="text-[10px] font-bold text-foreground uppercase tracking-tighter">Giao nhanh toàn quốc</p>
										</div>
										<div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-secondary flex flex-col items-center text-center gap-2">
											<MapPin size={20} className="text-premium-red"/>
											<p className="text-[10px] font-bold text-foreground uppercase tracking-tighter">Kiểm hàng rồi trả tiền</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
