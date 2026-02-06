import {faqs} from '@/data/faqs';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from '@/components/ui/accordion';
import {HelpCircle, MessageCircle} from 'lucide-react';
import {TrongDongBadge} from '@/components/TrongDongPattern';
import MotionViewport from '@/components/MotionViewport';
import Reveal from '@/components/Reveal';

export default function FAQSection() {
	return (
			<section className="pt-12 pb-24 bg-secondary/30 relative overflow-hidden">
				{/* Decorative Festive Overlay */}
				<div
						className="absolute inset-0 bg-gradient-to-t from-festive-gold/5 via-transparent to-transparent pointer-events-none"/>
				<div
						className="absolute top-0 right-0 w-80 h-80 bg-festive-gold/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none"/>
				<div
						className="absolute bottom-0 left-0 w-72 h-72 bg-festive-gold/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"/>
				
				<div className="container-main relative z-10">
					<div className="grid lg:grid-cols-12 gap-12 items-start">
						{/* Left Content */}
						<div className="lg:col-span-5 lg:sticky lg:top-32">
							<Reveal
									className="inline-block px-4 py-1.5 rounded-full bg-premium-red/10 text-premium-red text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-premium-red/20 backdrop-blur-sm"
							>
								✨ Giải Đáp Thắc Mắc ✨
							</Reveal>
							<Reveal
									delay={0.1}
									className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 mb-6 relative pb-6"
							>
								Bạn cần biết gì?
								<Reveal
										delay={0.5}
										duration={0.8}
										className="h-1.5 bg-gradient-to-r from-premium-red/20 via-festive-gold/30 to-premium-red/20 absolute bottom-0 left-0 rounded-full"
										style={{width: '60%'}}
								>
									<span className="sr-only">decorative line</span>
								</Reveal>
							</Reveal>
							<Reveal
									delay={0.2}
									className="text-sm font-light text-muted-foreground mb-8 leading-relaxed"
							>
								Giải đáp nhanh những thắc mắc phổ biến về sản phẩm và dịch vụ của chúng tôi.
								Đừng ngần ngại liên hệ nếu bạn cần thêm thông tin nhé!
							</Reveal>
							
							<div className="flex flex-col gap-4">
								<Reveal
										delay={0.3}
										className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-premium-red/10 group hover:border-premium-red/30 transition-all duration-300 shadow-sm">
									<div
											className="w-12 h-12 rounded-xl bg-premium-red/10 flex items-center justify-center group-hover:bg-premium-red group-hover:text-white transition-all duration-300">
										<HelpCircle className="w-6 h-6"/>
									</div>
									<div>
										<h4 className="font-bold text-foreground">Hỗ trợ 24/7</h4>
										<p className="text-sm font-light text-muted-foreground">Luôn sẵn sàng lắng nghe bạn</p>
									</div>
								</Reveal>
								<Reveal
										delay={0.4}
										className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-premium-red/10 group hover:border-premium-red/30 transition-all duration-300 shadow-sm">
									<div
											className="w-12 h-12 rounded-xl bg-premium-red/10 flex items-center justify-center group-hover:bg-premium-red group-hover:text-white transition-all duration-300">
										<MessageCircle className="w-6 h-6"/>
									</div>
									<div>
										<h4 className="font-bold text-foreground">Zalo / Hotline</h4>
										<p className="text-sm font-light text-muted-foreground">0339 420 806</p>
									</div>
								</Reveal>
							</div>
						</div>
						
						{/* FAQ List */}
						<div className="lg:col-span-7">
							<Accordion type="single" collapsible className="space-y-4">
								{faqs.map((faq, index) => (
										<Reveal
												key={faq.id}
												delay={index * 0.1}
										>
											<AccordionItem
													value={faq.id}
													className="bg-card/80 backdrop-blur-sm rounded-2xl border border-premium-red/10 px-6 data-[state=open]:border-festive-gold/40 data-[state=open]:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.15)] transition-all duration-500 overflow-hidden group"
											>
												<AccordionTrigger
														className="text-left text-lg font-bold text-foreground hover:no-underline py-6 group-hover:text-premium-red transition-colors">
													<div className="flex items-center gap-4">
													<span
															className="flex-shrink-0 w-8 h-8 rounded-full bg-premium-red/5 flex items-center justify-center text-xs text-premium-red border border-premium-red/10 group-data-[state=open]:bg-premium-red group-data-[state=open]:text-white transition-all">
														{index + 1 < 10 ? `0${index + 1}` : index + 1}
													</span>
														<span className="text-sm font-medium">
															{faq.question}
														</span>
													</div>
												</AccordionTrigger>
												<AccordionContent
														className="text-muted-foreground font-light text-md pb-6 leading-relaxed relative">
													<div className="pl-12">
														{faq.answer}
													</div>
													{/* Decorative Trống Đồng in Open State */}
													<div
															className="absolute -bottom-4 -right-4 w-20 h-20 opacity-0 group-data-[state=open]:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
														<TrongDongBadge className="w-full h-full text-premium-red"/>
													</div>
												</AccordionContent>
											</AccordionItem>
										</Reveal>
								))}
							</Accordion>
						</div>
					</div>
				</div>
			</section>
	);
}
