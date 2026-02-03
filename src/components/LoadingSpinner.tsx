import {motion} from 'framer-motion';
import {TrongDongBadge} from './TrongDongPattern';

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
	withText?: boolean;
	text?: string;
}

export default function LoadingSpinner({
	                                       size = 'md',
	                                       className = '',
	                                       withText = false,
	                                       text = 'Đang tải...'
                                       }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: 'w-8 h-8',
		md: 'w-12 h-12',
		lg: 'w-20 h-20',
		xl: 'w-32 h-32'
	};
	
	return (
			<div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
				<div className={`relative ${sizeClasses[size]}`}>
					{/* Glow Effect */}
					<motion.div
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.3, 0.6, 0.3],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="absolute inset-0 bg-premium-red/20 blur-2xl rounded-full"
					/>
					
					{/* Outer Rotating Ring */}
					<motion.div
							animate={{rotate: 360}}
							transition={{
								duration: 8,
								repeat: Infinity,
								ease: "linear",
							}}
							className="absolute inset-0 border-2 border-dashed border-festive-gold/30 rounded-full"
					/>
					
					{/* Inner Rotating Ring (Counter-clockwise) */}
					<motion.div
							animate={{rotate: -360}}
							transition={{
								duration: 12,
								repeat: Infinity,
								ease: "linear",
							}}
							className="absolute inset-2 border border-premium-red/20 rounded-full"
					/>
					
					{/* Main Cultural Icon */}
					<motion.div
							animate={{rotate: 360}}
							transition={{
								duration: 15,
								repeat: Infinity,
								ease: "linear",
							}}
							className="absolute inset-0 flex items-center justify-center"
					>
						<TrongDongBadge className="w-full h-full text-premium-red"/>
					</motion.div>
					
					{/* Decorative Sparkles */}
					<motion.div
							animate={{
								opacity: [0, 1, 0],
								scale: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								delay: 0.5,
							}}
							className="absolute -top-2 -right-2 text-festive-gold"
					>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
						</svg>
					</motion.div>
				</div>
				
				{withText && (
						<motion.p
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								className="text-sm font-bold text-premium-red uppercase tracking-[0.3em] animate-pulse"
						>
							{text}
						</motion.p>
				)}
			</div>
	);
}
