import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {Product} from '@/types/database';
import MotionViewport from '@/components/MotionViewport';
import Reveal from '@/components/Reveal';

interface FeaturedProductsProps {
	initialProducts?: Product[];
}

export default function FeaturedProducts({initialProducts}: FeaturedProductsProps) {
	const featuredProducts = initialProducts || [];
	
	return (
		<MotionViewport className="section-spacing bg-background relative overflow-hidden">
			<div className="container-main relative z-10">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
					<div>
						<Reveal
							className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
						>
							✨ Sản Phẩm Nổi Bật ✨
						</Reveal>
						<Reveal
							delay={0.1}
							className="text-5xl font-heading font-bold text-foreground mt-2 relative pb-4"
						>
							Chuẩn Vị Tây Bắc
							<Reveal
								delay={0.5}
								duration={0.8}
								className="h-1.5 bg-gradient-to-r from-premium-red/20 via-festive-gold/30 to-premium-red/20 absolute bottom-0 left-0 rounded-full"
								style={{ width: '80%' }}
							>
								<span className="sr-only">decorative line</span>
							</Reveal>
						</Reveal>
					</div>
					<Reveal delay={0.2}>
						<Link
							href="/san-pham"
							className="text-md inline-flex items-center gap-2 text-premium-red font-bold hover:gap-4 transition-all group py-2 px-4 rounded-xl hover:bg-premium-red/5"
						>
							XEM TẤT CẢ
							<ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
						</Link>
					</Reveal>
				</div>
				
				{/* Products Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
					{featuredProducts.map((product, index) => (
						<ProductCard key={product.id} product={product} index={index}/>
					))}
				</div>
			</div>
		</MotionViewport>
	);
}
