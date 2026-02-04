"use client";

import {useState} from 'react';
import Image from 'next/image';
import {AnimatePresence, motion, HTMLMotionProps} from 'framer-motion';
import {Image as ImageIcon, Play, Video, X, Star} from 'lucide-react';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import Reveal from '@/components/Reveal';
import {TrongDongBadge, TrongDongWatermark} from '@/components/TrongDongPattern';

interface GalleryCardProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
}

function GalleryCard({children, ...props}: GalleryCardProps) {
	return (
			<motion.div
					layout
					whileHover={{y: -10}}
					{...props}
			>
				{children}
			</motion.div>
	);
}

interface GalleryItem {
	id: string;
	type: 'image' | 'video';
	src: string;
	thumbnail?: string;
	title: string;
	description?: string;
}

interface GalleryClientProps {
	items: GalleryItem[];
}

interface LightboxProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
}

function Lightbox({children, ...props}: LightboxProps) {
	return (
			<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					{...props}
			>
				{children}
			</motion.div>
	);
}

interface LightboxContentProps extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
}

function LightboxContent({children, ...props}: LightboxContentProps) {
	return (
			<motion.div
					initial={{scale: 0.9, opacity: 0, y: 20}}
					animate={{scale: 1, opacity: 1, y: 0}}
					exit={{scale: 0.9, opacity: 0, y: 20}}
					{...props}
			>
				{children}
			</motion.div>
	);
}

export default function GalleryClient({items}: GalleryClientProps) {
	const [filter, setFilter] = useState('all');
	const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
	
	const filteredItems = filter === 'all'
			? items
			: items.filter(item => item.type === filter);
	
	const imageCount = items.filter(i => i.type === 'image').length;
	const videoCount = items.filter(i => i.type === 'video').length;
	
	return (
			<div className="space-y-12 relative">
				<Reveal className="flex justify-center pt-16">
					<Tabs defaultValue="all" className="w-full max-w-xl" onValueChange={setFilter}>
						<TabsList
								className="grid w-full grid-cols-3 p-1.5 bg-secondary/50 rounded-[2rem] border border-border/50 backdrop-blur-sm h-auto">
							<TabsTrigger
									value="all"
									className="rounded-[1.5rem] py-3 text-sm font-bold data-[state=active]:bg-premium-red data-[state=active]:text-white transition-all duration-300"
							>
								Tất cả ({items.length})
							</TabsTrigger>
							<TabsTrigger
									value="image"
									className="rounded-[1.5rem] py-3 text-sm font-bold gap-2 data-[state=active]:bg-premium-red data-[state=active]:text-white transition-all duration-300"
							>
								<ImageIcon className="w-4 h-4 hidden md:block"/>
								Ảnh ({imageCount})
							</TabsTrigger>
							<TabsTrigger
									value="video"
									className="rounded-[1.5rem] py-3 text-sm font-bold gap-2 data-[state=active]:bg-premium-red data-[state=active]:text-white transition-all duration-300"
							>
								<Video className="w-4 h-4 hidden md:block"/>
								Video ({videoCount})
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</Reveal>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<AnimatePresence mode="popLayout">
						{filteredItems.map((item, index) => (
								<Reveal
										key={item.id}
										y={30}
										delay={index * 0.05}
										className="h-full"
								>
									<GalleryCard
											className="group cursor-pointer aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_-15px_rgba(185,28,28,0.25)] transition-all duration-500 border border-premium-red/5"
											onClick={() => setSelectedItem(item)}
									>
										<div
												className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
											<div className="absolute top-4 right-4 w-20 h-20 opacity-[0.05] rotate-12">
												<TrongDongBadge className="w-full h-full text-white"/>
											</div>
										</div>
										
										<div className="relative w-full h-full">
											<Image
													src={item.thumbnail || item.src}
													alt={item.title}
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													className="object-cover transition-transform duration-1000 group-hover:scale-110"
											/>
											
											<div
													className="absolute inset-0 bg-gradient-to-t from-premium-red/90 via-premium-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"/>
											
											{item.type === 'video' && (
													<div
															className="absolute inset-0 flex items-center justify-center z-20 transition-transform duration-500 group-hover:scale-110">
														<div
																className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:bg-premium-red group-hover:text-white transition-all duration-300">
															<Play className="w-7 h-7 text-premium-red group-hover:text-white ml-1 fill-current"/>
														</div>
													</div>
											)}
											
											<div
													className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
												<div className="flex items-center gap-2 mb-2">
													<Star size={14} className="text-festive-gold fill-festive-gold"/>
													<h3 className="text-white font-heading font-bold text-xl line-clamp-1">
														{item.title}
													</h3>
												</div>
												{item.description && (
														<p className="text-white/80 text-sm font-medium line-clamp-2">
															{item.description}
														</p>
												)}
											</div>
										</div>
										
										<div className="absolute top-4 left-4 z-20">
                  <span
		                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-premium-red text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {item.type === 'image' ? <ImageIcon className="w-3 h-3"/> : <Video className="w-3 h-3"/>}
	                  {item.type === 'image' ? 'Hình ảnh' : 'Video'}
                  </span>
										</div>
									</GalleryCard>
								</Reveal>
						))}
					</AnimatePresence>
				</div>
				
				<AnimatePresence>
					{selectedItem && (
							<Lightbox
									className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
									onClick={() => setSelectedItem(null)}
							>
								{/* Decorative Background for Lightbox */}
								<div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
									<TrongDongWatermark className="text-white scale-150"/>
								</div>
								
								<button
										onClick={() => setSelectedItem(null)}
										className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-premium-red text-white rounded-2xl transition-all duration-300 border border-white/10 group shadow-xl"
								>
									<X size={24} className="group-hover:scale-110 transition-transform"/>
								</button>
								
								<LightboxContent
										className="max-w-6xl w-full max-h-[95vh] flex flex-col relative z-50 bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
										onClick={(e) => e.stopPropagation()}
								>
									<div className="w-full flex-1 flex items-center justify-center overflow-hidden bg-black relative">
										{selectedItem.type === 'image' ? (
												<div className="relative w-full h-full">
													<Image
															src={selectedItem.src}
															alt={selectedItem.title}
															fill
															sizes="100vw"
															className="object-contain"
													/>
												</div>
										) : (
												<div className="aspect-video w-full flex items-center justify-center bg-black">
													{selectedItem.src.includes('youtube.com') || selectedItem.src.includes('vimeo.com') ? (
															<iframe
																	src={selectedItem.src}
																	title={selectedItem.title}
																	className="w-full h-full"
																	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
																	allowFullScreen
															/>
													) : (
															<video
																	src={selectedItem.src}
																	controls
																	autoPlay
																	className="max-w-full max-h-full"
															/>
													)}
												</div>
										)}
									</div>
									
									<div
											className="w-full p-8 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
										<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
											<div className="max-w-3xl">
												<div className="flex items-center gap-3 mb-3">
													<div
															className="px-3 py-1 rounded-full bg-premium-red text-[10px] font-bold uppercase tracking-widest">
														{selectedItem.type === 'image' ? 'Hình ảnh' : 'Video'}
													</div>
													<div className="flex items-center gap-1.5 text-festive-gold">
														<Star size={14} className="fill-festive-gold"/>
														<span className="text-xs font-bold uppercase tracking-widest">Tiệm Của Bản</span>
													</div>
												</div>
												<h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">
													{selectedItem.title}
												</h2>
												{selectedItem.description && (
														<p className="text-white/80 text-lg leading-relaxed font-light">
															{selectedItem.description}
														</p>
												)}
											</div>
											
											<div className="flex-shrink-0 hidden md:block">
												<div className="w-24 h-24 opacity-10 rotate-12">
													<TrongDongBadge className="w-full h-full text-white"/>
												</div>
											</div>
										</div>
									</div>
								</LightboxContent>
							</Lightbox>
					)}
				</AnimatePresence>
			</div>
	);
}
