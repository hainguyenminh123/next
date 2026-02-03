import {Award, Heart, Leaf, Sparkles, Star, Users} from 'lucide-react';
import Layout from "@/components/Layout";
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';
import Counter from '@/components/about/Counter';
import Reveal from '@/components/Reveal';
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Về Tiệm Của Bản | Câu chuyện đặc sản Tây Bắc Điện Biên",
	description: "Câu chuyện Tiệm Của Bản: kết nối hộ dân vùng cao Điện Biên, Sơn La, Lào Cai; đặc sản chuẩn vị; giao hàng toàn quốc.",
	keywords: "Tiệm Của Bản, đặc sản Tây Bắc, đặc sản Điện Biên, câu chuyện thương hiệu, nguồn gốc vùng cao",
	alternates: {canonical: "/gioi-thieu"},
};

const values = [
	{
		icon: Leaf,
		title: 'Tự nhiên, Nguyên bản',
		description: 'Tất cả sản phẩm đều 100% tự nhiên, không chất bảo quản, không phụ gia công nghiệp.',
		color: 'text-green-600',
		bgColor: 'bg-green-50'
	},
	{
		icon: Users,
		title: 'Đồng hành cùng bà con',
		description: 'Mua trực tiếp từ hộ dân, HTX vùng cao với giá công bằng, hỗ trợ sinh kế bền vững.',
		color: 'text-blue-600',
		bgColor: 'bg-blue-50'
	},
	{
		icon: Heart,
		title: 'Tận tâm từng đơn hàng',
		description: 'Mỗi đơn hàng được đóng gói cẩn thận, tư vấn nhiệt tình, giao tận tay.',
		color: 'text-premium-red',
		bgColor: 'bg-premium-red/10'
	},
	{
		icon: Award,
		title: 'Cam kết chất lượng',
		description: 'Đổi trả 100% nếu sản phẩm không đúng mô tả hoặc bị lỗi do vận chuyển.',
		color: 'text-festive-gold',
		bgColor: 'bg-festive-gold/10'
	},
];

export default function AboutPage() {
	const breadcrumbs = [
		{label: 'Trang chủ', href: '/'},
		{label: 'Giới thiệu', href: '/gioi-thieu'},
	];
	
	return (
			<Layout
					breadcrumbs={breadcrumbs}
			>
				{/* Hero */}
				<section className="relative overflow-hidden bg-premium-red text-white">
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.25),transparent_55%)]"/>
						<div
								className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_60%)]"/>
						<div
								className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(120deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_16px)]"/>
					</div>
					
					<div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-festive-gold/20 blur-[30px]"/>
					<div className="absolute -bottom-20 right-10 h-80 w-80 rounded-full bg-white/10 blur-[40px]"/>
					<div className="absolute left-10 top-10 h-24 w-24 rounded-full border border-white/25"/>
					<div className="absolute right-12 top-16 h-16 w-16 rounded-full border border-white/25"/>
					<div
							className="absolute left-1/2 top-0 h-12 w-48 -translate-x-1/2 rounded-b-3xl bg-festive-gold/30 blur-[1px]"/>
					
					<TrongDongWatermark opacity={0.08} className="text-festive-gold"/>
					
					<div className="container-main relative z-10 py-20 md:py-28 text-left">
						<div className="max-w-4xl">
							<Reveal
									y={10}
									className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-festive-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 border border-white/25"
							>
								<Sparkles size={14}/>
								Về chúng mình
							</Reveal>
							
							<Reveal
									y={24}
									duration={0.8}
									className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.02] mb-6"
							>
								<h1>
									Kết nối hương vị
									<span
											className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-festive-gold to-white">Tây Bắc với mọi nhà</span>
								</h1>
							</Reveal>
							
							<Reveal
									y={16}
									delay={0.2}
									duration={0.8}
									className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed"
							>
								<p>
									Tiệm Của Bản kể lại phong vị vùng cao bằng những thức quà nguyên bản, sạch và rõ nguồn gốc,
									để mỗi bữa cơm gia đình thêm ấm áp mà vẫn trọn vẹn bản sắc núi rừng.
								</p>
							</Reveal>
							
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<span
										className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/30 text-white/90">Nguồn gốc rõ ràng</span>
								<span
										className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/30 text-white/90">Chuẩn vị vùng cao</span>
								<span
										className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/30 text-white/90">Trọn vẹn niềm tin</span>
							</div>
						</div>
						
						<div className="mt-12 grid gap-4 md:grid-cols-3">
							<div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4">
								<p className="text-xs uppercase tracking-[0.3em] text-festive-gold font-bold mb-2">Bản sắc</p>
								<p className="text-white/80 text-sm leading-relaxed">Mỗi món quà mang câu chuyện vùng cao và tay nghề
									truyền thống.</p>
							</div>
							<div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4">
								<p className="text-xs uppercase tracking-[0.3em] text-festive-gold font-bold mb-2">Tươi sạch</p>
								<p className="text-white/80 text-sm leading-relaxed">Lựa chọn kỹ, đóng gói chỉn chu để giữ hương vị bền
									lâu.</p>
							</div>
							<div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-4">
								<p className="text-xs uppercase tracking-[0.3em] text-festive-gold font-bold mb-2">Gắn kết</p>
								<p className="text-white/80 text-sm leading-relaxed">Kết nối hộ dân vùng cao với bữa cơm ấm cúng mọi gia
									đình.</p>
							</div>
						</div>
					</div>
				</section>
				
				{/* Story */}
				<section className="section-spacing relative">
					<div
							className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 -skew-x-12 translate-x-1/2 pointer-events-none"/>
					
					<div className="container-main relative z-10">
						<div className="grid lg:grid-cols-2 gap-16 items-center">
							<Reveal
									x={-30}
									duration={0.8}
							>
								<div className="flex items-center gap-3 mb-4">
									<div className="h-px w-8 bg-premium-red"/>
									<span className="text-sm font-bold text-premium-red uppercase tracking-widest">
                   Khởi nguồn
                 </span>
								</div>
								<h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
									Từ nhịp sống vùng cao đến <span className="text-premium-red italic">mâm cơm gia đình</span>
								</h2>
								<div className="text-md space-y-6 text-muted-foreground leading-relaxed">
									<p>
										Tiệm Của Bản được hình thành từ những chuyến đi thực tế lên vùng cao Điện Biên.
										Ở đó, chúng mình gặp gỡ bà con, thưởng thức những món đặc sản mang hương vị núi rừng
										nguyên bản – thứ mà khó có thể tìm thấy ở nơi nào khác.
									</p>
									<p className="border-l-4 border-festive-gold/30 pl-6 py-2 italic bg-festive-gold/5 rounded-r-xl">
										"Chúng mình không chỉ bán đặc sản, chúng mình kể câu chuyện về văn hóa và lòng hiếu khách của người
										dân Tây Bắc thông qua từng hương vị."
									</p>
									<p>
										Mỗi sản phẩm đều được chọn lọc kỹ lưỡng, làm việc trực tiếp với các hộ dân và HTX địa phương,
										kiểm soát chất lượng ngay từ đầu để đảm bảo mỗi món quà khi đến tay bạn đều xứng đáng với niềm tin
										đã gửi gắm.
									</p>
								</div>
							</Reveal>
							
							<Reveal
									y={0}
									scale={0.9}
									duration={0.8}
									className="grid grid-cols-2 gap-6"
							>
								{[
									{label: 'Đơn hàng/tháng', value: '500+', icon: Sparkles, color: 'text-premium-red'},
									{label: 'Nguồn gốc', value: 'Điện Biên', icon: Star, color: 'text-festive-gold'},
									{label: 'Đối tác hộ dân', value: '20+', icon: Users, color: 'text-accent'},
									{label: 'Hài lòng', value: '99%', icon: Heart, color: 'text-red-500'},
								].map((stat, idx) => (
										<div key={idx}
										     className="card-premium p-8 text-center group hover:border-festive-gold/30 transition-all duration-500">
											<stat.icon
													className={`w-8 h-8 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}/>
											<div className="text-4xl font-bold text-foreground mb-1 font-heading">
												<Counter value={stat.value}/>
											</div>
											<p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
										</div>
								))}
							</Reveal>
						</div>
					</div>
				</section>
				
				{/* Values */}
				<section className="section-spacing relative overflow-hidden bg-white">
					<div
							className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none"/>
					<TrongDongWatermark opacity={0.02} className="text-premium-red"/>
					
					{/* Decorative circles */}
					<div
							className="absolute top-1/4 -right-20 w-80 h-80 bg-festive-gold/5 blur-[100px] rounded-full pointer-events-none"/>
					<div
							className="absolute bottom-1/4 -left-20 w-80 h-80 bg-premium-red/5 blur-[100px] rounded-full pointer-events-none"/>
					
					<div className="container-main relative z-10">
						<div className="text-center max-w-2xl mx-auto mb-20">
							<Reveal
									y={10}
									className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-premium-red/5 text-premium-red text-xs font-bold uppercase tracking-wider mb-4 border border-premium-red/10"
							>
								<Sparkles size={12}/>
								Giá trị cốt lõi
							</Reveal>
							<h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
								Điều chúng tôi trân quý
							</h2>
							<div className="flex items-center justify-center gap-3 mt-6">
								<div className="h-px w-8 bg-festive-gold/40"/>
								<div className="h-1.5 w-1.5 rounded-full bg-premium-red"/>
								<div className="h-px w-8 bg-festive-gold/40"/>
							</div>
						</div>
						
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{values.map((value, index) => (
									<Reveal
											key={value.title}
											y={30}
											delay={index * 0.1}
											duration={0.6}
											className="bg-white p-8 rounded-[2rem] border border-border/60 hover:border-festive-gold/30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.15)] transition-all duration-500 relative group overflow-hidden"
									>
										<div
												className="absolute -top-6 -right-6 w-24 h-24 opacity-0 group-hover:opacity-[0.05] transition-all duration-700 rotate-12 group-hover:rotate-0">
											<TrongDongBadge className="w-full h-full text-premium-red"/>
										</div>
										
										<div
												className={`w-16 h-16 rounded-2xl ${value.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
											<value.icon className={`w-8 h-8 ${value.color}`}/>
										</div>
										<h3 className="text-xl font-bold text-foreground mb-3 font-heading group-hover:text-premium-red transition-colors">{value.title}</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
										
										<div
												className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-premium-red to-festive-gold group-hover:w-full transition-all duration-500"/>
									</Reveal>
							))}
						</div>
					</div>
				</section>
				
				{/* CTA */}
				<section
						className="section-spacing relative overflow-hidden bg-premium-red py-24 border-t-4 border-festive-gold/20">
					<TrongDongWatermark opacity={0.08} className="text-white"/>
					<div
							className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)] opacity-50"/>
					
					<div className="container-main text-center relative z-10">
						<Reveal
								y={20}
						>
							<h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
								Mang hương vị Tây Bắc <br className="hidden md:block"/> vào không gian bếp Việt
							</h2>
						</Reveal>
						<Reveal
								y={20}
								delay={0.1}
						>
							<p className="text-white/90 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-light">
								Khám phá ngay bộ sưu tập đặc sản Điện Biên chuẩn vị, được chọn lọc kỹ lưỡng từ đôi bàn tay của bà con
								vùng
								cao.
							</p>
						</Reveal>
						<Reveal
								y={20}
								delay={0.2}
						>
							<a
									href="/san-pham"
									className="inline-flex items-center gap-3 bg-white text-premium-red px-10 py-5 rounded-2xl font-bold
                      transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.6)] hover:-translate-y-1 text-lg group border-2 border-transparent hover:border-festive-gold/30"
							>
								Khám phá sản phẩm
								<Sparkles className="w-5 h-5 animate-pulse group-hover:rotate-12 transition-transform"/>
							</a>
						</Reveal>
					</div>
				</section>
			</Layout>
	);
}
