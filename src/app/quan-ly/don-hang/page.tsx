"use client";

import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {Calendar, Eye, FileText, MapPin, Package, Phone, ShoppingCart} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import {useToast} from '@/hooks/use-toast';
import {formatPrice} from '@/hooks/useProducts';
import {format} from 'date-fns';
import {vi} from 'date-fns/locale';
import {motion} from 'framer-motion';

type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

interface Order {
	id: string;
	order_number: string;
	customer_name: string;
	customer_phone: string;
	customer_email: string | null;
	shipping_address: string;
	shipping_province: string;
	subtotal: number;
	shipping_fee: number;
	total: number;
	status: OrderStatus;
	note: string | null;
	created_at: string;
}

interface OrderItem {
	id: string;
	product_name: string;
	weight: string;
	quantity: number;
	price: number;
	product_image: string | null;
}

const statusLabels: Record<OrderStatus, string> = {
	pending: 'Chờ xác nhận',
	confirmed: 'Đã xác nhận',
	shipping: 'Đang giao',
	delivered: 'Đã giao',
	cancelled: 'Đã hủy',
};

const statusColors: Record<OrderStatus, string> = {
	pending: 'bg-amber-100 text-amber-700 border-amber-200',
	confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
	shipping: 'bg-violet-100 text-violet-700 border-violet-200',
	delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
	cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function AdminOrdersPage() {
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const queryClient = useQueryClient();
	const {toast} = useToast();
	
	const {data: orders, isLoading} = useQuery({
		queryKey: ['admin-orders'],
		queryFn: async () => {
			const {data, error} = await supabase
					.from('orders')
					.select('*')
					.order('created_at', {ascending: false});
			
			if (error) throw error;
			return data as Order[];
		},
	});
	
	const updateStatusMutation = useMutation({
		mutationFn: async ({orderId, status}: { orderId: string; status: OrderStatus }) => {
			const {error} = await supabase.from('orders').update({status}).eq('id', orderId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-orders']});
			toast({title: 'Đã cập nhật trạng thái đơn hàng'});
		},
		onError: () => {
			toast({title: 'Lỗi cập nhật', variant: 'destructive'});
		},
	});
	
	const handleViewDetails = async (order: Order) => {
		setSelectedOrder(order);
		setOrderItems([]);
		const {data, error} = await supabase
				.from('order_items')
				.select('*')
				.eq('order_id', order.id);
		
		if (!error && data) {
			setOrderItems(data as OrderItem[]);
		}
		setDetailsOpen(true);
	};
	
	if (isLoading) {
		return (
				<div className="flex items-center justify-center h-screen">
					<LoadingSpinner size="lg" withText text="Đang tải danh sách đơn hàng..."/>
				</div>
		);
	}
	
	const pendingCount = orders?.filter((o) => o.status === 'pending').length || 0;
	
	const totalItems = orders?.length || 0;
	const totalPages = Math.ceil(totalItems / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedOrders = orders?.slice(startIndex, endIndex) || [];
	
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};
	
	const handlePageSizeChange = (size: string) => {
		setPageSize(Number(size));
		setCurrentPage(1);
	};
	
	return (
			<div className="p-4 lg:p-8 space-y-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
							Quản lý đơn hàng
						</h1>
						<p className="text-muted-foreground mt-1 text-md">
							{orders?.length || 0} đơn hàng
							{pendingCount > 0 && (
									<span className="ml-2 text-amber-600 font-medium">
                • {pendingCount} chờ xử lý
              </span>
							)}
						</p>
					</div>
				</div>
				
				<div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
					{(['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'] as OrderStatus[]).map(
							(status, index) => {
								const count = orders?.filter((o) => o.status === status).length || 0;
								return (
										<motion.div
												key={status}
												initial={{opacity: 0, y: 10}}
												animate={{opacity: 1, y: 0}}
												transition={{delay: index * 0.05}}
												className="bg-card rounded-2xl border border-border/50 p-5 shadow-sm hover:shadow-md transition-all duration-300"
										>
											<div className="flex flex-col gap-3">
												<Badge
														variant="outline"
														className={`${statusColors[status]} border-none w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider`}
												>
													{statusLabels[status]}
												</Badge>
												<p className="text-3xl font-bold text-foreground tracking-tight">{count}</p>
											</div>
										</motion.div>
								);
							}
					)}
				</div>
				
				<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
				>
					<div className="overflow-x-auto">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow className="bg-muted/50 border-b-2 border-border/50">
									<TableHead className="font-bold text-foreground h-12">Mã đơn</TableHead>
									<TableHead className="font-bold text-foreground h-12">Khách hàng</TableHead>
									<TableHead className="font-bold text-foreground h-12">Tổng tiền</TableHead>
									<TableHead className="font-bold text-foreground h-12">Trạng thái</TableHead>
									<TableHead className="font-bold text-foreground h-12">Ngày đặt</TableHead>
									<TableHead className="font-bold text-foreground h-12 text-right">Thao tác</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedOrders.map((order, index) => (
										<motion.tr
												key={order.id}
												initial={{opacity: 0, x: -10}}
												animate={{opacity: 1, x: 0}}
												transition={{delay: index * 0.03}}
												className="group border-b border-border/50 hover:bg-muted/20 transition-all duration-200"
										>
											<TableCell className="py-4">
                    <span
		                    className="font-mono font-bold text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                      #{order.order_number}
                    </span>
											</TableCell>
											<TableCell className="py-4">
												<div className="flex flex-col gap-0.5">
													<p className="font-semibold text-foreground leading-tight">
														{order.customer_name}
													</p>
													<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
														<Phone className="w-3 h-3"/>
														{order.customer_phone}
													</div>
												</div>
											</TableCell>
											<TableCell className="py-4 font-bold text-foreground">
												{formatPrice(order.total)}
											</TableCell>
											<TableCell className="py-4">
												<Select
														value={order.status}
														onValueChange={(value: OrderStatus) =>
																updateStatusMutation.mutate({
																	orderId: order.id,
																	status: value,
																})
														}
												>
													<SelectTrigger
															className="w-[150px] h-9 bg-background/50 border-border/50 hover:border-primary/30 transition-colors">
														<div className="flex items-center gap-2">
															<div
																	className={`w-2 h-2 rounded-full ${statusColors[order.status].split(' ')[0].replace('bg-', 'bg-')}`}/>
															<span className="text-xs font-medium">{statusLabels[order.status]}</span>
														</div>
													</SelectTrigger>
													<SelectContent>
														{Object.entries(statusLabels).map(([value, label]) => (
																<SelectItem key={value} value={value} className="focus:bg-primary/5">
																	<div className="flex items-center gap-2">
																		<Badge
																				variant="outline"
																				className={`${statusColors[value as OrderStatus]} border-none px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-wider`}
																		>
																			{label}
																		</Badge>
																	</div>
																</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TableCell>
											<TableCell className="py-4 text-muted-foreground">
												<div className="flex flex-col gap-0.5">
													<div className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
														<Calendar className="w-3.5 h-3.5"/>
														{format(new Date(order.created_at), 'dd/MM/yyyy', {locale: vi})}
													</div>
													<p className="text-[11px] ml-5 italic">
														{format(new Date(order.created_at), 'HH:mm', {locale: vi})}
													</p>
												</div>
											</TableCell>
											<TableCell className="py-4 text-right">
												<Button
														variant="outline"
														size="sm"
														onClick={() => handleViewDetails(order)}
														className="h-8 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
												>
													<Eye className="w-3.5 h-3.5 mr-1.5"/>
													Chi tiết
												</Button>
											</TableCell>
										</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>
					
					{totalItems > 0 && (
							<div
									className="px-6 py-4 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20">
								<div className="flex items-center gap-4">
									<span className="text-sm text-muted-foreground whitespace-nowrap">Hiển thị</span>
									<Select
											value={pageSize.toString()}
											onValueChange={handlePageSizeChange}
									>
										<SelectTrigger className="w-[80px] h-9">
											<SelectValue/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="10">10</SelectItem>
											<SelectItem value="20">20</SelectItem>
											<SelectItem value="50">50</SelectItem>
										</SelectContent>
									</Select>
									<span className="text-sm text-muted-foreground whitespace-nowrap">
                mỗi trang (Tổng {totalItems})
              </span>
								</div>
								
								<div className="flex items-center gap-2">
									<Pagination>
										<PaginationContent>
											<PaginationItem>
												<PaginationPrevious
														onClick={() => handlePageChange(currentPage - 1)}
														disabled={currentPage === 1}
														className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
												/>
											</PaginationItem>
											
											{Array.from({length: totalPages}, (_, i) => i + 1)
													.filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
													.map((p, i, arr) => {
														const elements = [];
														if (i > 0 && p - arr[i - 1] > 1) {
															elements.push(
																	<PaginationItem key={`ellipsis-${p}`}>
																		<span className="px-2">...</span>
																	</PaginationItem>
															);
														}
														elements.push(
																<PaginationItem key={p}>
																	<PaginationLink
																			isActive={currentPage === p}
																			onClick={() => handlePageChange(p)}
																			className="cursor-pointer"
																	>
																		{p}
																	</PaginationLink>
																</PaginationItem>
														);
														return elements;
													})}
											
											<PaginationItem>
												<PaginationNext
														onClick={() => handlePageChange(currentPage + 1)}
														disabled={currentPage === totalPages}
														className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								</div>
							</div>
					)}
				</motion.div>
				
				<Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle className="flex items-center justify-between gap-2 text-xl font-bold">
								<div className="flex items-center gap-2">
									<Package className="w-6 h-6 text-primary"/>
									<span>Chi tiết đơn hàng</span>
									<span className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-sm font-mono">
                  #{selectedOrder?.order_number}
                </span>
								</div>
								{selectedOrder && (
										<Badge
												variant="outline"
												className={`${statusColors[selectedOrder.status]} border-none px-3 py-1 text-xs font-bold uppercase tracking-wider`}
										>
											{statusLabels[selectedOrder.status]}
										</Badge>
								)}
							</DialogTitle>
							<DialogDescription>
								Thông tin chi tiết về khách hàng, địa chỉ giao hàng và danh sách sản phẩm.
							</DialogDescription>
						</DialogHeader>
						
						{selectedOrder && (
								<div className="space-y-8 py-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="bg-muted/30 rounded-2xl p-5 space-y-3 border border-border/50 shadow-sm">
											<h4 className="font-bold text-foreground flex items-center gap-2 text-md">
												<Phone className="w-4 h-4 text-primary"/>
												Thông tin khách hàng
											</h4>
											<div className="space-y-1">
												<p className="font-semibold text-lg">{selectedOrder.customer_name}</p>
												<div className="flex items-center gap-2 text-muted-foreground">
													<Phone className="w-3.5 h-3.5"/>
													<span className="text-sm">{selectedOrder.customer_phone}</span>
												</div>
												{selectedOrder.customer_email && (
														<div className="flex items-center gap-2 text-muted-foreground">
															<FileText className="w-3.5 h-3.5"/>
															<span className="text-sm">{selectedOrder.customer_email}</span>
														</div>
												)}
											</div>
										</div>
										<div className="bg-muted/30 rounded-2xl p-5 space-y-3 border border-border/50 shadow-sm">
											<h4 className="font-bold text-foreground flex items-center gap-2 text-md">
												<MapPin className="w-4 h-4 text-primary"/>
												Địa chỉ giao hàng
											</h4>
											<div className="space-y-1">
												<p className="text-sm font-medium leading-relaxed">{selectedOrder.shipping_address}</p>
												<p className="text-xs text-muted-foreground uppercase font-bold tracking-wider pt-1">{selectedOrder.shipping_province}</p>
											</div>
										</div>
									</div>
									
									{selectedOrder.note && (
											<div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-5 shadow-sm">
												<h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2 text-md">
													<FileText className="w-4 h-4"/>
													Ghi chú từ khách hàng
												</h4>
												<p className="text-sm text-amber-700 leading-relaxed italic">&quot;{selectedOrder.note}&quot;</p>
											</div>
									)}
									
									<div className="space-y-4">
										<h4 className="font-bold text-foreground flex items-center gap-2 text-md px-1">
											<ShoppingCart className="w-4 h-4 text-primary"/>
											Danh sách sản phẩm
										</h4>
										<div className="space-y-3">
											{orderItems.map((item) => (
													<div
															key={item.id}
															className="flex justify-between items-center p-4 bg-background border border-border/50 rounded-2xl hover:border-primary/20 transition-all duration-300 shadow-sm group"
													>
														<div className="flex items-center gap-4">
															{item.product_image && (
																	<div className="relative overflow-hidden rounded-xl w-16 h-16">
																		<Image
																				src={item.product_image}
																				alt=""
																				fill
																				sizes="64px"
																				className="object-cover group-hover:scale-110 transition-transform duration-500"
																		/>
																	</div>
															)}
															<div>
																<p className="font-bold text-foreground">{item.product_name}</p>
																<div className="flex items-center gap-2 text-sm text-muted-foreground">
																	<span
																			className="bg-muted px-2 py-0.5 rounded text-xs font-medium">{item.weight}</span>
																	<span>×</span>
																	<span className="font-bold text-foreground/80">{item.quantity}</span>
																</div>
															</div>
														</div>
														<p className="font-bold text-lg text-primary">{formatPrice(item.price * item.quantity)}</p>
													</div>
											))}
										</div>
									</div>
									
									<div className="bg-muted/50 rounded-2xl p-6 space-y-4 border border-border shadow-inner">
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground font-medium">Tạm tính</span>
											<span className="font-bold">{formatPrice(selectedOrder.subtotal)}</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground font-medium">Phí vận chuyển</span>
											<span className="font-bold text-emerald-600">
                    {selectedOrder.shipping_fee === 0
		                    ? 'Miễn phí'
		                    : formatPrice(selectedOrder.shipping_fee)}
                  </span>
										</div>
										<div className="border-t border-border/50 pt-4 flex justify-between items-center">
											<span className="font-black text-xl text-foreground">Tổng thanh toán</span>
											<span className="font-black text-2xl text-primary tracking-tight">
                    {formatPrice(selectedOrder.total)}
                  </span>
										</div>
									</div>
								</div>
						)}
					</DialogContent>
				</Dialog>
			</div>
	);
}
