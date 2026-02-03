import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Quote, Star} from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface Review {
	id: number;
	name: string;
	rating: number;
	comment: string;
	date: string;
	avatar?: string;
	productId?: number;
}

interface ReviewsPaginatedProps {
	reviews: Review[];
	itemsPerPage?: number;
	title?: string;
	showTitle?: boolean;
}

const ReviewsPaginated = ({
	                          reviews,
	                          itemsPerPage = 6,
	                          title = "Đánh giá từ khách hàng",
	                          showTitle = true,
                          }: ReviewsPaginatedProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	
	const totalPages = Math.ceil(reviews.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);
	
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};
	
	const renderStars = (rating: number) => {
		return Array.from({length: 5}, (_, i) => (
				<Star
						key={i}
						className={`h-4 w-4 ${
								i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
						}`}
				/>
		));
	};
	
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "...", currentPage, "...", totalPages);
			}
		}
		
		return pages;
	};
	
	if (reviews.length === 0) {
		return (
				<div className="text-center py-8 text-muted-foreground">
					Chưa có đánh giá nào.
				</div>
		);
	}
	
	return (
			<div className="space-y-6">
				{showTitle && (
						<h3 className="font-heading text-2xl font-bold text-foreground">
							{title}
						</h3>
				)}
				
				<AnimatePresence mode="wait">
					<motion.div
							key={currentPage}
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -20}}
							transition={{duration: 0.3}}
							className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
					>
						{currentReviews.map((review, index) => (
								<motion.div
										key={review.id}
										initial={{opacity: 0, y: 20}}
										animate={{opacity: 1, y: 0}}
										transition={{delay: index * 0.1}}
										className="group relative bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300"
								>
									{/* Quote icon */}
									<Quote
											className="absolute top-4 right-4 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors"/>
									
									{/* Header */}
									<div className="flex items-center gap-3 mb-4">
										<div
												className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg">
											{review.name.charAt(0).toUpperCase()}
										</div>
										<div className="flex-1">
											<p className="font-heading font-semibold text-foreground">
												{review.name}
											</p>
											<div className="flex items-center gap-1">
												{renderStars(review.rating)}
											</div>
										</div>
									</div>
									
									{/* Comment */}
									<p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">
										&quot;{review.comment}&quot;
									</p>
									
									{/* Date */}
									<p className="text-xs text-muted-foreground/70">{review.date}</p>
								</motion.div>
						))}
					</motion.div>
				</AnimatePresence>
				
				{/* Pagination */}
				{totalPages > 1 && (
						<motion.div
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{delay: 0.3}}
								className="pt-6"
						>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
												onClick={() => handlePageChange(currentPage - 1)}
												disabled={currentPage === 1}
										/>
									</PaginationItem>
									
									{getPageNumbers().map((page, index) =>
											page === "..." ? (
													<PaginationItem key={`ellipsis-${index}`}>
                    <span className="flex h-10 w-10 items-center justify-center text-muted-foreground">
                      ...
                    </span>
													</PaginationItem>
											) : (
													<PaginationItem key={page}>
														<PaginationLink
																isActive={currentPage === page}
																onClick={() => handlePageChange(page as number)}
														>
															{page}
														</PaginationLink>
													</PaginationItem>
											)
									)}
									
									<PaginationItem>
										<PaginationNext
												onClick={() => handlePageChange(currentPage + 1)}
												disabled={currentPage === totalPages}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</motion.div>
				)}
			</div>
	);
};

export default ReviewsPaginated;