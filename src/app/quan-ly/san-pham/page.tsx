"use client";

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Switch} from '@/components/ui/switch';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import Image from 'next/image';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {ImageIcon, Loader2, Package, Pencil, Plus, Star, Trash2} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {formatPrice} from '@/hooks/useProducts';
import {motion} from 'framer-motion';
import {useState} from 'react';
import ProductFormDialog from '@/components/admin/ProductFormDialog';
import DeleteProductDialog from '@/components/admin/DeleteProductDialog';
import type {ProductCategory} from '@/types/database';

interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	short_description: string | null;
	category: ProductCategory;
	base_price: number;
	in_stock: boolean;
	is_best_seller: boolean;
	images: string[];
	origin: string | null;
	storage_info: string | null;
	cooking_tips: string | null;
	blog_intro: string | null;
	created_at: string;
}

interface WeightOption {
	id: string;
	product_id: string;
	weight: string;
	price: number;
}

export default function AdminProductsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [formOpen, setFormOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [selectedWeightOptions, setSelectedWeightOptions] = useState<WeightOption[]>([]);
	const queryClient = useQueryClient();
	const {toast} = useToast();
	
	const {data: products, isLoading} = useQuery({
		queryKey: ['admin-products'],
		queryFn: async () => {
			const {data: productsData, error: productsError} = await supabase
					.from('products')
					.select('*')
					.order('created_at', {ascending: false});
			
			if (productsError) throw productsError;
			
			const {data: imagesData, error: imagesError} = await supabase
					.from('product_images')
					.select('*');
			
			if (imagesError) throw imagesError;
			
			return productsData.map((product) => {
				const productImages = imagesData
						.filter((img) => img.product_id === product.id)
						.sort((a, b) => a.sort_order - b.sort_order)
						.map((img) => img.image_url);
				
				return {
					...product,
					images: productImages,
				} as Product;
			});
		},
	});
	
	const updateProductMutation = useMutation({
		mutationFn: async ({
			                   productId,
			                   updates,
		                   }: {
			productId: string;
			updates: { in_stock?: boolean; is_best_seller?: boolean };
		}) => {
			const {error} = await supabase.from('products').update(updates).eq('id', productId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-products']});
			toast({title: 'Đã cập nhật sản phẩm'});
		},
		onError: () => {
			toast({title: 'Lỗi cập nhật', variant: 'destructive'});
		},
	});
	
	if (isLoading) {
		return (
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="w-8 h-8 animate-spin text-primary"/>
				</div>
		);
	}
	
	const inStockCount = products?.filter((p) => p.in_stock).length || 0;
	const bestSellerCount = products?.filter((p) => p.is_best_seller).length || 0;
	
	const totalItems = products?.length || 0;
	const totalPages = Math.ceil(totalItems / pageSize);
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const paginatedProducts = products?.slice(startIndex, endIndex) || [];
	
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};
	
	const handlePageSizeChange = (size: string) => {
		setPageSize(Number(size));
		setCurrentPage(1);
	};
	
	const handleAdd = () => {
		setSelectedProduct(null);
		setSelectedWeightOptions([]);
		setFormOpen(true);
	};
	
	const handleEdit = async (product: Product) => {
		const {data: weightOptions} = await supabase
				.from('product_weight_options')
				.select('*')
				.eq('product_id', product.id);
		
		setSelectedProduct(product);
		setSelectedWeightOptions(weightOptions || []);
		setFormOpen(true);
	};
	
	const handleDelete = (product: Product) => {
		setSelectedProduct(product);
		setDeleteOpen(true);
	};
	
	return (
			<div className="p-4 lg:p-8 space-y-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
							Quản lý sản phẩm
						</h1>
						<p className="text-muted-foreground mt-1">
							{products?.length || 0} sản phẩm • {inStockCount} còn hàng •{' '}
							{bestSellerCount} bán chạy
						</p>
					</div>
					<Button onClick={handleAdd} className="gap-2">
						<Plus className="w-4 h-4"/>
						Thêm sản phẩm
					</Button>
				</div>
				
				<div className="grid grid-cols-3 gap-4">
					<motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="bg-card rounded-xl border border-border p-4">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-primary/10"><Package className="w-5 h-5 text-primary"/></div>
							<div>
								<p className="text-2xl font-bold text-foreground">{products?.length || 0}</p>
								<p className="text-md text-muted-foreground">Tổng sản phẩm</p>
							</div>
						</div>
					</motion.div>
					<motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="bg-card rounded-xl border border-border p-4">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-emerald-100"><Package className="w-5 h-5 text-emerald-600"/></div>
							<div>
								<p className="text-2xl font-bold text-foreground">{inStockCount}</p>
								<p className="text-md text-muted-foreground">Còn hàng</p>
							</div>
						</div>
					</motion.div>
					<motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="bg-card rounded-xl border border-border p-4">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-xl bg-amber-100"><Star className="w-5 h-5 text-amber-600"/></div>
							<div>
								<p className="text-2xl font-bold text-foreground">{bestSellerCount}</p>
								<p className="text-md text-muted-foreground">Bán chạy</p>
							</div>
						</div>
					</motion.div>
				</div>
				
				<motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
					<div className="overflow-x-auto">
						<Table className="min-w-[800px]">
							<TableHeader>
								<TableRow className="bg-muted/50 border-b-2 border-border/50">
									<TableHead className="font-bold text-foreground h-12">Sản phẩm</TableHead>
									<TableHead className="font-bold text-foreground h-12">Danh mục</TableHead>
									<TableHead className="font-bold text-foreground h-12">Giá cơ bản</TableHead>
									<TableHead className="font-bold text-foreground h-12 text-center">Còn hàng</TableHead>
									<TableHead className="font-bold text-foreground h-12 text-center">Bán chạy</TableHead>
									<TableHead className="font-bold text-foreground h-12 text-center">Thao tác</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedProducts.map((product, index) => (
										<motion.tr key={product.id} initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{delay: index * 0.03}} className="border-b border-border hover:bg-muted/30 transition-colors">
											<TableCell>
												<div className="flex items-center gap-3">
													{product.images && product.images.length > 0 ? (
															<div className="relative w-14 h-14 overflow-hidden rounded-xl">
																<Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover shadow-sm" />
															</div>
													) : (
															<div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center"><ImageIcon className="w-6 h-6 text-muted-foreground"/></div>
													)}
													<div>
														<p className="font-medium text-foreground">{product.name}</p>
														<p className="text-sm text-muted-foreground font-mono">{product.slug}</p>
													</div>
												</div>
											</TableCell>
											<TableCell><Badge variant="secondary" className="font-medium">{product.category}</Badge></TableCell>
											<TableCell className="font-semibold text-foreground">{formatPrice(product.base_price)}</TableCell>
											<TableCell className="text-center">
												<Switch checked={product.in_stock} onCheckedChange={(checked) => updateProductMutation.mutate({ productId: product.id, updates: {in_stock: checked}, })} />
											</TableCell>
											<TableCell className="text-center">
												<Button variant="ghost" size="sm" className={product.is_best_seller ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50' : 'text-muted-foreground hover:text-amber-500 hover:bg-amber-50'} onClick={() => updateProductMutation.mutate({ productId: product.id, updates: {is_best_seller: !product.is_best_seller}, })} >
													<Star className={`w-5 h-5 ${product.is_best_seller ? 'fill-current' : ''}`} />
												</Button>
											</TableCell>
											<TableCell className="text-center">
												<div className="flex items-center justify-center gap-1">
													<Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEdit(product)}><Pencil className="w-4 h-4"/></Button>
													<Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(product)}><Trash2 className="w-4 h-4"/></Button>
												</div>
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
									<Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
										<SelectTrigger className="w-[80px] h-9"><SelectValue/></SelectTrigger>
										<SelectContent><SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem></SelectContent>
									</Select>
									<span className="text-sm text-muted-foreground whitespace-nowrap">mỗi trang (Tổng {totalItems})</span>
								</div>
								<div className="flex items-center gap-2">
									<Pagination>
										<PaginationContent>
											<PaginationItem><PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} /></PaginationItem>
											{Array.from({length: totalPages}, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1).map((p, i, arr) => {
														const elements = [];
														if (i > 0 && p - arr[i - 1] > 1) { elements.push(<PaginationItem key={`ellipsis-${p}`}><span className="px-2">...</span></PaginationItem>); }
														elements.push(<PaginationItem key={p}><PaginationLink isActive={currentPage === p} onClick={() => handlePageChange(p)} className="cursor-pointer">{p}</PaginationLink></PaginationItem>);
														return elements;
													})}
											<PaginationItem><PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} /></PaginationItem>
										</PaginationContent>
									</Pagination>
								</div>
							</div>
					)}
				</motion.div>
				
				<ProductFormDialog open={formOpen} onOpenChange={setFormOpen} product={selectedProduct} weightOptions={selectedWeightOptions} />
				<DeleteProductDialog open={deleteOpen} onOpenChange={setDeleteOpen} product={selectedProduct} />
			</div>
	);
}
