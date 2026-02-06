import {Leaf, Package, RefreshCw, Truck} from 'lucide-react';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';
import MotionViewport from '@/components/MotionViewport';
import Reveal from '@/components/Reveal';

const features = [
	{
		icon: Leaf,
		title: 'Nguồn gốc rõ ràng',
		description: 'Cam kết mang đến những sản phẩm nông sản an toàn và giàu dinh dưỡng. Đảm bảo nguồn gốc rõ ràng, đầy đủ giấy tờ kiểm định An Toàn Thực Phẩm.',
	},
	{
		icon: Package,
		title: 'Bao bì bảo vệ hương vị',
		description: 'Đóng gói cẩn thận, hút chân không, giữ nguyên hương vị đặc trưng. Thông tin sản phẩm rõ ràng, minh bạch.',
	},
	{
		icon: Truck,
		title: 'Giao hàng nhanh chóng',
		description: 'Dịch vụ giao hàng nhanh toàn quốc, ship mọi miền. Giao tận tay, an toàn.',
	},
	{
		icon: RefreshCw,
		title: 'Đổi trả dễ dàng',
		description: 'Chính sách hoàn tiền, nhận sản phẩm mới không phát sinh chi phí nếu đơn hàng bị hỏng, không đảm bảo chất lượng, ẩm mốc do vận chuyển.',
	},
];

export default function WhyChooseUs() {
	return (
		<MotionViewport className="section-spacing relative overflow-hidden">
			{/* Decorative Festive Gradient Overlay */}
			<div
					className="absolute inset-0 bg-gradient-to-br from-premium-red/5 via-transparent to-festive-gold/5 pointer-events-none"/>
			
			{/* Festive Blossom Decorations (Abstract) */}
			<div
					className="absolute top-0 left-0 w-64 h-64 bg-premium-red/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
			<div
					className="absolute bottom-0 right-0 w-80 h-80 bg-festive-gold/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"/>
			
			{/* Trống Đồng watermark */}
			<TrongDongWatermark opacity={0.03} className="text-premium-red"/>
			
			<div className="container-main relative z-10">
				{/* Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<Reveal
							className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
					>
						✨ Cam Kết Chất Lượng ✨
					</Reveal>
					<Reveal
							delay={0.1}
							className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 relative inline-block pb-6"
					>
						Tại Sao Chọn Chúng Tôi?
						<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
							<Reveal
									delay={0.5}
									duration={0.8}
									className="h-1.5 bg-gradient-to-r from-premium-red/20 via-festive-gold/30 to-premium-red/20 rounded-full"
									style={{ width: '60%' }}
							>
								<span className="sr-only">decorative line</span>
							</Reveal>
						</div>
					</Reveal>
				</div>
				
				<div className="relative">
					<div className="flex gap-6 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth scrollbar-hide lg:overflow-visible lg:pb-0">
						{features.map((feature, index) => (
								<Reveal
										key={feature.title}
										delay={0.1 + index * 0.05}
										className="snap-center shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-auto lg:flex-1"
								>
									<div className="relative h-full overflow-hidden rounded-[1.75rem] border border-premium-red/15 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-festive-gold/50 hover:shadow-medium group">
										<div className="absolute inset-0 pointer-events-none">
											<div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-festive-gold/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
											<div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-premium-red/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
										</div>
										
										<div className="relative">
											<div className="flex items-center justify-between gap-4">
												<div className="h-12 w-12 rounded-2xl bg-premium-red/10 border border-premium-red/15 flex items-center justify-center transition-colors duration-500 group-hover:bg-premium-red">
													<feature.icon className="h-6 w-6 text-premium-red transition-colors duration-500 group-hover:text-white"/>
												</div>
												<span className="text-xs font-bold uppercase tracking-[0.2em] text-premium-red/50 group-hover:text-premium-red transition-colors">
													0{index + 1}
												</span>
											</div>
											
											<h4 className="mt-5 text-xl font-heading font-bold text-foreground">
												{feature.title}
											</h4>
											<p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
												{feature.description}
											</p>
											
											<div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-premium-red/30 via-festive-gold/40 to-premium-red/30 transition-all duration-500 group-hover:w-24"/>
										</div>
									</div>
								</Reveal>
						))}
					</div>
				</div>
			</div>
		</MotionViewport>
	);
}
