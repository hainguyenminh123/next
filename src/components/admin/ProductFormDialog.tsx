import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import Image from 'next/image';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/hooks/use-toast';
import {Loader2, Plus, Trash2, Upload, X} from 'lucide-react';
import type {ProductCategory} from '@/types/database';

const productSchema = z.object({
	name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
	slug: z.string().min(1, 'Slug là bắt buộc'),
	description: z.string().min(1, 'Mô tả là bắt buộc'),
	short_description: z.string().optional(),
	category: z.enum(['Đặc sản khô', 'THỊT GÁC BẾP', 'NÔNG SẢN']),
	base_price: z.number().min(0, 'Giá phải >= 0'),
	in_stock: z.boolean(),
	is_best_seller: z.boolean(),
	origin: z.string().optional(),
	storage_info: z.string().optional(),
	cooking_tips: z.string().optional(),
	blog_intro: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface WeightOption {
	id?: string;
	weight: string;
	price: number;
}

interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	short_description: string | null;
	category: ProductCategory;
	base_price: number;
	images: string[];
	in_stock: boolean;
	is_best_seller: boolean;
	origin: string | null;
	storage_info: string | null;
	cooking_tips: string | null;
	blog_intro: string | null;
}

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	product?: Product | null;
	weightOptions?: WeightOption[];
}

export default function ProductFormDialog({open, onOpenChange, product, weightOptions: initialWeightOptions}: Props) {
	const [images, setImages] = useState<string[]>([]);
	const [uploading, setUploading] = useState(false);
	const [weightOptions, setWeightOptions] = useState<WeightOption[]>([]);
	const queryClient = useQueryClient();
	const {toast} = useToast();
	
	const form = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: '',
			slug: '',
			description: '',
			short_description: '',
			category: 'Đặc sản khô',
			base_price: 0,
			in_stock: true,
			is_best_seller: false,
			origin: '',
			storage_info: '',
			cooking_tips: '',
			blog_intro: '',
		},
	});
	
	useEffect(() => {
		if (product) {
			form.reset({
				name: product.name,
				slug: product.slug,
				description: product.description,
				short_description: product.short_description || '',
				category: product.category,
				base_price: product.base_price,
				in_stock: product.in_stock,
				is_best_seller: product.is_best_seller,
				origin: product.origin || '',
				storage_info: product.storage_info || '',
				cooking_tips: product.cooking_tips || '',
				blog_intro: product.blog_intro || '',
			});
			setImages(product.images || []);
			setWeightOptions(initialWeightOptions || []);
		} else {
			form.reset({
				name: '',
				slug: '',
				description: '',
				short_description: '',
				category: 'Đặc sản khô',
				base_price: 0,
				in_stock: true,
				is_best_seller: false,
				origin: '',
				storage_info: '',
				cooking_tips: '',
				blog_intro: '',
			});
			setImages([]);
			setWeightOptions([]);
		}
	}, [product, initialWeightOptions, form]);
	
	const generateSlug = (name: string) => {
		return name
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/đ/g, 'd')
				.replace(/Đ/g, 'd')
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.replace(/-+/g, '-')
				.trim();
	};
	
	const handleNameChange = (name: string) => {
		form.setValue('name', name);
		if (!product) {
			form.setValue('slug', generateSlug(name));
		}
	};
	
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		
		setUploading(true);
		const newImages: string[] = [];
		
		for (const file of Array.from(files)) {
			const fileExt = file.name.split('.').pop();
			const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
			const filePath = `products/${fileName}`;
			
			const {error: uploadError} = await supabase.storage
					.from('product-images')
					.upload(filePath, file);
			
			if (uploadError) {
				toast({title: 'Lỗi upload ảnh', description: uploadError.message, variant: 'destructive'});
				continue;
			}
			
			const {data: {publicUrl}} = supabase.storage
					.from('product-images')
					.getPublicUrl(filePath);
			
			newImages.push(publicUrl);
		}
		
		setImages([...images, ...newImages]);
		setUploading(false);
		e.target.value = '';
	};
	
	const removeImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
	};
	
	const addWeightOption = () => {
		setWeightOptions([...weightOptions, {weight: '', price: 0}]);
	};
	
	const updateWeightOption = (index: number, field: 'weight' | 'price', value: string | number) => {
		const updated = [...weightOptions];
		updated[index] = {...updated[index], [field]: value};
		setWeightOptions(updated);
	};
	
	const removeWeightOption = (index: number) => {
		setWeightOptions(weightOptions.filter((_, i) => i !== index));
	};
	
	const createMutation = useMutation({
		mutationFn: async (data: ProductFormData) => {
			const productData = {
				name: data.name,
				slug: data.slug,
				description: data.description,
				short_description: data.short_description || null,
				category: data.category,
				base_price: data.base_price,
				in_stock: data.in_stock,
				is_best_seller: data.is_best_seller,
				origin: data.origin || null,
				storage_info: data.storage_info || null,
				cooking_tips: data.cooking_tips || null,
				blog_intro: data.blog_intro || null,
				images: images,
			};
			
			const {data: newProduct, error} = await supabase
					.from('products')
					.insert(productData)
					.select()
					.single();
			
			if (error) throw error;
			
			// Insert weight options
			if (weightOptions.length > 0) {
				const validOptions = weightOptions.filter(wo => wo.weight.trim());
				if (validOptions.length > 0) {
					const {error: woError} = await supabase
							.from('product_weight_options')
							.insert(validOptions.map(wo => ({
								product_id: newProduct.id,
								weight: wo.weight,
								price: wo.price,
							})));
					if (woError) throw woError;
				}
			}
			
			return newProduct;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-products']});
			queryClient.invalidateQueries({queryKey: ['products']});
			toast({title: 'Đã tạo sản phẩm mới'});
			onOpenChange(false);
		},
		onError: (error: any) => {
			toast({title: 'Lỗi tạo sản phẩm', description: error.message, variant: 'destructive'});
		},
	});
	
	const updateMutation = useMutation({
		mutationFn: async (data: ProductFormData) => {
			if (!product) throw new Error('No product to update');
			
			const productData = {
				name: data.name,
				slug: data.slug,
				description: data.description,
				short_description: data.short_description || null,
				category: data.category,
				base_price: data.base_price,
				in_stock: data.in_stock,
				is_best_seller: data.is_best_seller,
				origin: data.origin || null,
				storage_info: data.storage_info || null,
				cooking_tips: data.cooking_tips || null,
				blog_intro: data.blog_intro || null,
				images: images,
			};
			
			const {error} = await supabase
					.from('products')
					.update(productData)
					.eq('id', product.id);
			
			if (error) throw error;
			
			// Delete existing weight options
			await supabase
					.from('product_weight_options')
					.delete()
					.eq('product_id', product.id);
			
			// Insert new weight options
			if (weightOptions.length > 0) {
				const validOptions = weightOptions.filter(wo => wo.weight.trim());
				if (validOptions.length > 0) {
					const {error: woError} = await supabase
							.from('product_weight_options')
							.insert(validOptions.map(wo => ({
								product_id: product.id,
								weight: wo.weight,
								price: wo.price,
							})));
					if (woError) throw woError;
				}
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['admin-products']});
			queryClient.invalidateQueries({queryKey: ['products']});
			toast({title: 'Đã cập nhật sản phẩm'});
			onOpenChange(false);
		},
		onError: (error: any) => {
			toast({title: 'Lỗi cập nhật sản phẩm', description: error.message, variant: 'destructive'});
		},
	});
	
	const onSubmit = (data: ProductFormData) => {
		if (product) {
			updateMutation.mutate(data);
		} else {
			createMutation.mutate(data);
		}
	};
	
	const isPending = createMutation.isPending || updateMutation.isPending;
	
	return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-xl font-heading">
							{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
						</DialogTitle>
					</DialogHeader>
					
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Images */}
							<div className="space-y-3">
								<label className="text-sm font-medium">Hình ảnh sản phẩm</label>
								<div className="flex flex-wrap gap-3">
									{images.map((img, index) => (
											<div key={index} className="relative group w-24 h-24">
												<Image
														src={img}
														alt={`Product ${index + 1}`}
														fill
														sizes="96px"
														className="object-cover rounded-lg border border-border"
												/>
												<button
														type="button"
														onClick={() => removeImage(index)}
														className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
												>
													<X className="w-4 h-4"/>
												</button>
											</div>
									))}
									<label
											className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
										{uploading ? (
												<Loader2 className="w-6 h-6 animate-spin text-muted-foreground"/>
										) : (
												<>
													<Upload className="w-6 h-6 text-muted-foreground"/>
													<span className="text-xs text-muted-foreground mt-1">Upload</span>
												</>
										)}
										<input
												type="file"
												accept="image/*"
												multiple
												onChange={handleImageUpload}
												className="hidden"
												disabled={uploading}
										/>
									</label>
								</div>
							</div>
							
							{/* Basic Info */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
										control={form.control}
										name="name"
										render={({field}) => (
												<FormItem>
													<FormLabel>Tên sản phẩm *</FormLabel>
													<FormControl>
														<Input
																{...field}
																onChange={(e) => handleNameChange(e.target.value)}
																placeholder="VD: Thịt trâu gác bếp"
														/>
													</FormControl>
													<FormMessage/>
												</FormItem>
										)}
								/>
								
								<FormField
										control={form.control}
										name="slug"
										render={({field}) => (
												<FormItem>
													<FormLabel>Slug *</FormLabel>
													<FormControl>
														<Input {...field} placeholder="thit-trau-gac-bep"/>
													</FormControl>
													<FormMessage/>
												</FormItem>
										)}
								/>
							</div>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
										control={form.control}
										name="category"
										render={({field}) => (
												<FormItem>
													<FormLabel>Danh mục *</FormLabel>
													<Select onValueChange={field.onChange} value={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Chọn danh mục"/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="Đặc sản khô">Đặc sản khô</SelectItem>
															<SelectItem value="THỊT GÁC BẾP">Thịt gác bếp</SelectItem>
															<SelectItem value="NÔNG SẢN">Nông sản</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage/>
												</FormItem>
										)}
								/>
								
								<FormField
										control={form.control}
										name="base_price"
										render={({field}) => (
												<FormItem>
													<FormLabel>Giá cơ bản (VNĐ) *</FormLabel>
													<FormControl>
														<Input
																type="number"
																{...field}
																onChange={(e) => field.onChange(Number(e.target.value))}
																placeholder="150000"
														/>
													</FormControl>
													<FormMessage/>
												</FormItem>
										)}
								/>
							</div>
							
							<FormField
									control={form.control}
									name="short_description"
									render={({field}) => (
											<FormItem>
												<FormLabel>Mô tả ngắn</FormLabel>
												<FormControl>
													<Input {...field} placeholder="Mô tả ngắn gọn về sản phẩm"/>
												</FormControl>
												<FormMessage/>
											</FormItem>
									)}
							/>
							
							<FormField
									control={form.control}
									name="description"
									render={({field}) => (
											<FormItem>
												<FormLabel>Mô tả chi tiết *</FormLabel>
												<FormControl>
													<Textarea {...field} rows={4} placeholder="Mô tả đầy đủ về sản phẩm..."/>
												</FormControl>
												<FormMessage/>
											</FormItem>
									)}
							/>
							
							{/* Weight Options */}
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium">Tùy chọn khối lượng & giá</label>
									<Button type="button" variant="outline" size="sm" onClick={addWeightOption}>
										<Plus className="w-4 h-4 mr-1"/> Thêm
									</Button>
								</div>
								{weightOptions.map((wo, index) => (
										<div key={index} className="flex items-center gap-3">
											<Input
													placeholder="VD: 500g"
													value={wo.weight}
													onChange={(e) => updateWeightOption(index, 'weight', e.target.value)}
													className="flex-1"
											/>
											<Input
													type="number"
													placeholder="Giá"
													value={wo.price}
													onChange={(e) => updateWeightOption(index, 'price', Number(e.target.value))}
													className="w-32"
											/>
											<Button
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => removeWeightOption(index)}
													className="text-destructive hover:text-destructive"
											>
												<Trash2 className="w-4 h-4"/>
											</Button>
										</div>
								))}
							</div>
							
							{/* Additional Info */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
										control={form.control}
										name="origin"
										render={({field}) => (
												<FormItem>
													<FormLabel>Xuất xứ</FormLabel>
													<FormControl>
														<Input {...field} placeholder="VD: Điện Biên, Việt Nam"/>
													</FormControl>
													<FormMessage/>
												</FormItem>
										)}
								/>
								
								<FormField
										control={form.control}
										name="storage_info"
										render={({field}) => (
												<FormItem>
													<FormLabel>Hướng dẫn bảo quản</FormLabel>
													<FormControl>
														<Input {...field} placeholder="VD: Bảo quản nơi khô ráo, thoáng mát"/>
													</FormControl>
													<FormMessage/>
												</FormItem>
										)}
								/>
							</div>
							
							<FormField
									control={form.control}
									name="cooking_tips"
									render={({field}) => (
											<FormItem>
												<FormLabel>Mẹo chế biến</FormLabel>
												<FormControl>
													<Textarea {...field} rows={2} placeholder="Hướng dẫn chế biến sản phẩm..."/>
												</FormControl>
												<FormMessage/>
											</FormItem>
									)}
							/>
							
							<FormField
									control={form.control}
									name="blog_intro"
									render={({field}) => (
											<FormItem>
												<FormLabel>Giới thiệu blog</FormLabel>
												<FormControl>
													<Textarea {...field} rows={2} placeholder="Nội dung giới thiệu cho trang chi tiết..."/>
												</FormControl>
												<FormMessage/>
											</FormItem>
									)}
							/>
							
							{/* Toggles */}
							<div className="flex items-center gap-8">
								<FormField
										control={form.control}
										name="in_stock"
										render={({field}) => (
												<FormItem className="flex items-center gap-3">
													<FormControl>
														<Switch checked={field.value} onCheckedChange={field.onChange}/>
													</FormControl>
													<FormLabel className="!mt-0">Còn hàng</FormLabel>
												</FormItem>
										)}
								/>
								
								<FormField
										control={form.control}
										name="is_best_seller"
										render={({field}) => (
												<FormItem className="flex items-center gap-3">
													<FormControl>
														<Switch checked={field.value} onCheckedChange={field.onChange}/>
													</FormControl>
													<FormLabel className="!mt-0">Sản phẩm bán chạy</FormLabel>
												</FormItem>
										)}
								/>
							</div>
							
							{/* Actions */}
							<div className="flex justify-end gap-3 pt-4 border-t">
								<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
									Hủy
								</Button>
								<Button type="submit" disabled={isPending}>
									{isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
									{product ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
	);
}
