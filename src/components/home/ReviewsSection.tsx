import {Review} from '@/types/database';
import MotionViewport from '@/components/MotionViewport';
import Reveal from '@/components/Reveal';
import ReviewsSectionClient from './ReviewsSectionClient';

interface ReviewsSectionProps {
	initialReviews?: Review[];
}

export default function ReviewsSection({initialReviews}: ReviewsSectionProps) {
	const allReviews = initialReviews || [];
	
	if (allReviews.length === 0) return null;
	
	return (
		<section className="pt-24 pb-12 bg-secondary/30 relative overflow-hidden">
			{/* Decorative Festive Overlay */}
			<div
					className="absolute inset-0 bg-gradient-to-b from-premium-red/5 via-transparent to-transparent pointer-events-none"/>
			<div
					className="absolute top-1/2 left-0 w-72 h-72 bg-premium-red/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
			<div
					className="absolute bottom-0 right-0 w-80 h-80 bg-festive-gold/5 blur-[150px] rounded-full translate-x-1/3 translate-y-1/2 pointer-events-none"/>
			
			<div className="container-main relative z-10">
				
				{/* Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<Reveal
							className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
					>
						✨ Ý Kiến Khách Hàng ✨
					</Reveal>
					<Reveal
							delay={0.1}
							className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 relative inline-block pb-6"
					>
						Đánh giá từ cộng đồng
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
				
				<ReviewsSectionClient allReviews={allReviews} />
			</div>
		</section>
	);
}
