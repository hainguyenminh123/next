"use client";

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {Loader2, Star, Trash2} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {format} from 'date-fns';
import {vi} from 'date-fns/locale';
import {useState} from 'react';
import {motion} from "framer-motion";

interface Review {
	id: string;
	name: string;
	content: string;
	rating: number;
	location: string | null;
	is_approved: boolean;
	created_at: string;
	product_id: string | null;
}

export default function AdminReviewsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
	const queryClient = useQueryClient();
	const {toast} = useToast();
	
	const {data: reviews, isLoading} = useQuery({
		queryKey: ['admin-reviews'],
		queryFn: async () => {
			const {data, error} = await supabase
					.from('reviews')
					.select('*')
					.order('created_at', {ascending: false});
			
			if (error) throw error;
			return data as Review[];
		},
	});
	
	const deleteReviewMutation = useMutation({
		mutationFn: async (reviewId: string) => {
			const {error} = await supabase
					.from('reviews')
					.delete()
					.eq('id', reviewId);
			
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-reviews']});
			toast({title: 'Đã xóa đánh giá'});
		},
		onError: () => {
			toast({title: 'Lỗi xóa', variant: 'destructive'});
		},
	});
	
	if (isLoading) {
		return (
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="w-8 h-8 animate-spin text-primary"/>
				</div>
		);
	}
	
	const allReviews = reviews || [];
	const totalItems = allReviews.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const paginatedReviews = allReviews.slice(
			(currentPage - 1) * pageSize,
			currentPage * pageSize
	);
	
	const toggleExpand = (id: string) => {
		setExpandedReviews(prev => ({ ...prev, [id]: !prev[id] }));
	};
	
	return (
			<div className="p-8">
				<div className="mb-8">
					<h1 className="text-3xl font-heading font-bold text-foreground">
						Quản lý đánh giá
					</h1>
					<p className="text-muted-foreground mt-1">
						Tổng cộng {allReviews.length} đánh giá
					</p>
				</div>
				
				<div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow className="bg-muted/50 border-b-2 border-border/50">
									<TableHead className="font-bold text-foreground h-12">Khách hàng</TableHead>
									<TableHead className="font-bold text-foreground h-12">Nội dung</TableHead>
									<TableHead className="font-bold text-foreground h-12">Đánh giá</TableHead>
									<TableHead className="font-bold text-foreground h-12">Ngày</TableHead>
									<TableHead className="font-bold text-foreground h-12 text-right">Thao tác</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedReviews.map((review, index) => (
										<motion.tr key={review.id} initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{delay: index * 0.03}} className="group border-b border-border/50 hover:bg-muted/20 transition-all duration-200">
											<TableCell className="py-4">
												<div className="flex flex-col gap-0.5">
													<p className="font-semibold text-foreground leading-tight">{review.name}</p>
													{review.location && <p className="text-xs text-muted-foreground">{review.location}</p>}
												</div>
											</TableCell>
											<TableCell className="max-w-md py-4">
												<div className="relative">
													<p className={`text-sm text-foreground/80 ${expandedReviews[review.id] ? "" : "line-clamp-2"}`}>{review.content}</p>
													{review.content.length > 100 && (
															<button onClick={() => toggleExpand(review.id)} className="text-primary text-xs font-semibold mt-1 hover:underline focus:outline-none">{expandedReviews[review.id] ? "Thu gọn" : "Xem thêm"}</button>
													)}
												</div>
											</TableCell>
											<TableCell className="py-4">
												<div className="flex items-center gap-0.5">
													{Array.from({length: 5}).map((_, i) => (
															<Star key={i} className={`w-3.5 h-3.5 ${ i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted fill-muted" }`} />
													))}
												</div>
											</TableCell>
											<TableCell className="py-4 text-muted-foreground whitespace-nowrap text-sm">
												{format(new Date(review.created_at), 'dd/MM/yyyy', {locale: vi})}
											</TableCell>
											<TableCell className="py-4 text-right">
												<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => { if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) { deleteReviewMutation.mutate(review.id); } }} >
													<Trash2 className="w-4 h-4"/>
												</Button>
											</TableCell>
										</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>
					
					{totalItems > 0 && (
							<div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20">
								<div className="flex items-center gap-4">
									<span className="text-sm text-muted-foreground whitespace-nowrap">Hiển thị</span>
									<Select value={pageSize.toString()} onValueChange={(v) => { setPageSize(Number(v)); setCurrentPage(1); }}>
										<SelectTrigger className="w-[80px] h-9"><SelectValue/></SelectTrigger>
										<SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent>
									</Select>
									<span className="text-sm text-muted-foreground whitespace-nowrap">mỗi trang (Tổng {totalItems})</span>
								</div>
								<div className="flex items-center gap-2">
									<Pagination>
										<PaginationContent>
											<PaginationItem><PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} /></PaginationItem>
											{Array.from({length: totalPages}, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1).map((p, i, arr) => {
														const elements = [];
														if (i > 0 && p - arr[i - 1] > 1) { elements.push(<PaginationItem key={`ellipsis-${p}`}><span className="px-2">...</span></PaginationItem>); }
														elements.push(<PaginationItem key={p}><PaginationLink isActive={currentPage === p} onClick={() => setCurrentPage(p)} className="cursor-pointer">{p}</PaginationLink></PaginationItem>);
														return elements;
													})}
											<PaginationItem><PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} /></PaginationItem>
										</PaginationContent>
									</Pagination>
								</div>
							</div>
					)}
				</div>
			</div>
	);
}
