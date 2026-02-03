"use client";

import {useEffect, useState} from 'react';
import {ArrowUp} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import {TrongDongBadge} from "@/components/TrongDongPattern";

export default function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);
	
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);
	
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	
	return (
			<AnimatePresence>
				{isVisible && (
						<motion.button
								initial={{opacity: 0, scale: 0.5, y: 20}}
								animate={{opacity: 1, scale: 1, y: 0}}
								exit={{opacity: 0, scale: 0.5, y: 20}}
								whileHover={{scale: 1.1, y: -5}}
								whileTap={{scale: 0.9}}
								onClick={scrollToTop}
								className="fixed bottom-8 right-8 z-50 p-4 bg-premium-red text-white rounded-full shadow-2xl
                 border border-festive-gold/30 hover:border-festive-gold transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-festive-gold group overflow-hidden"
								aria-label="Scroll to top"
						>
							{/* Background Glow */}
							<div
									className="absolute inset-0 bg-festive-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							
							{/* Rotating Trống Đồng Background */}
							<div
									className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-300 scale-150 group-hover:rotate-45 transition-transform duration-700">
								<TrongDongBadge className="w-full h-full text-festive-gold"/>
							</div>
							
							{/* Icon */}
							<div className="relative z-10">
								<ArrowUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-300"/>
							</div>
							
							{/* Sparkle effect */}
							<div
									className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full animate-pulse group-hover:scale-150"></div>
						</motion.button>
				)}
			</AnimatePresence>
	);
}
