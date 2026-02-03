import {Leaf, Package, RefreshCw, Truck} from 'lucide-react';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';
import MotionViewport from '@/components/MotionViewport';
import Reveal from '@/components/Reveal';
import WhyChooseUsClient from './WhyChooseUsClient';

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
		<section className="section-spacing">
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
									style={{ width: '80%' }}
							>
								<span className="sr-only">decorative line</span>
							</Reveal>
						</div>
					</Reveal>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<WhyChooseUsClient
							key={feature.title}
							icon={<feature.icon className="w-8 h-8 text-premium-red relative z-10 group-hover:text-festive-gold transition-colors duration-300" />}
							title={feature.title}
							description={feature.description}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
