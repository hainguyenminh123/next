"use client";

import {useState} from "react";
import {Phone} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {TrongDongBadge} from "@/components/TrongDongPattern";
import {SiZalo} from "react-icons/si";

export default function FloatingContact() {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen((value) => !value);

	return (
			<div className="fixed bottom-8 right-8 z-50">
				<AnimatePresence>
					{open && (
							<motion.div
									initial={{opacity: 0, y: 12}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0, y: 12}}
									transition={{duration: 0.2}}
									className="mb-3 flex w-12 flex-col items-center gap-3"
							>
								<a
										href="https://zalo.me/0339420806"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Chat Zalo"
										className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0068ff] text-white shadow-lg transition hover:brightness-110"
								>
									<SiZalo className="h-5 w-5"/>
								</a>
								<a
										href="https://m.me/1017044824819432"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Open Messenger chat"
										className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-lg transition hover:brightness-110"
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
										<path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.454 5.505 3.774 7.196V22l3.47-1.907a10.86 10.86 0 0 0 2.756.357c5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.023 12.428-2.618-2.787-5.108 2.787 5.6-5.93 2.618 2.787 5.108-2.787-5.6 5.93z"/>
									</svg>
								</a>
								<a
										href="tel:0339420806"
										aria-label="Call hotline"
										className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-lg transition hover:brightness-110"
								>
									<Phone className="h-5 w-5"/>
								</a>
							</motion.div>
					)}
				</AnimatePresence>
				<motion.button
						type="button"
						onClick={toggleOpen}
						aria-label="Toggle contact options"
						aria-expanded={open}
						whileHover={{scale: 1.1, y: -5}}
						whileTap={{scale: 0.9}}
						className="relative flex items-center justify-center rounded-full bg-premium-red text-white shadow-2xl
               border border-festive-gold/30 hover:border-festive-gold transition-all duration-300
               focus:outline-none focus:ring-2 focus:ring-festive-gold group overflow-hidden p-4"
				>
					<div
							className="absolute inset-0 bg-festive-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div
							className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-300 scale-150 group-hover:rotate-45 transition-transform duration-700">
						<TrongDongBadge className="w-full h-full text-festive-gold"/>
					</div>
					<div className="relative z-10">
						<Phone className="h-6 w-6 group-hover:translate-y-[-2px] transition-transform duration-300"/>
					</div>
					<div
							className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full animate-pulse group-hover:scale-150"></div>
				</motion.button>
			</div>
	);
}
