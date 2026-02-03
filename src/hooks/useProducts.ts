import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import type {
	DBBlogSection,
	DBProduct,
	DBProductImage,
	DBWeightOption,
	Product,
	ProductCategory
} from '@/types/database';

// Transform DB product to frontend Product
const transformProduct = (
		dbProduct: DBProduct,
		weightOptions: DBWeightOption[],
		blogSections: DBBlogSection[],
		productImages: DBProductImage[] = []
): Product => {
	// Get all image URLs from product_images table
	const images = productImages
			.sort((a, b) => a.sort_order - b.sort_order)
			.map(img => img.image_url);
	
	// Filter gallery images and sort by sort_order
	const galleryImages = productImages
			.filter(img => img.image_type === 'gallery')
			.sort((a, b) => a.sort_order - b.sort_order)
			.map(img => ({
				id: img.id,
				imageUrl: img.image_url,
				altText: img.alt_text,
				sortOrder: img.sort_order,
			}));
	
	return {
		id: dbProduct.id,
		name: dbProduct.name,
		slug: dbProduct.slug,
		description: dbProduct.description,
		shortDescription: dbProduct.short_description,
		category: dbProduct.category,
		basePrice: dbProduct.base_price,
		images: images.length > 0 ? images : dbProduct.images,
		galleryImages,
		inStock: dbProduct.in_stock,
		isBestSeller: dbProduct.is_best_seller,
		origin: dbProduct.origin,
		storageInfo: dbProduct.storage_info,
		cookingTips: dbProduct.cooking_tips,
		blogIntro: dbProduct.blog_intro,
		weightOptions: weightOptions.map(wo => ({
			id: wo.id,
			weight: wo.weight,
			price: wo.price,
		})),
		blogSections: blogSections
				.sort((a, b) => a.sort_order - b.sort_order)
				.map(bs => ({
					id: bs.id,
					title: bs.title,
					content: bs.content,
					image: bs.image,
					thumbnail: bs.thumbnail ?? null,
					sortOrder: bs.sort_order,
				})),
		createdAt: dbProduct.created_at,
		updatedAt: dbProduct.updated_at,
	};
};

// Fetch all products with related data
export const useProducts = (category?: ProductCategory | 'TẤT CẢ') => {
	return useQuery({
		queryKey: ['products', category],
		queryFn: async (): Promise<Product[]> => {
			// Fetch products
			let query = supabase.from('products').select('*');
			
			if (category && category !== 'TẤT CẢ') {
				query = query.eq('category', category);
			}
			
			const {data: products, error: productsError} = await query;
			
			if (productsError) throw productsError;
			if (!products || products.length === 0) return [];
			
			const productIds = products.map(p => p.id);
			
			// Fetch weight options, blog sections, and product images in parallel
			const [weightOptionsRes, blogSectionsRes, productImagesRes] = await Promise.all([
				supabase.from('product_weight_options').select('*').in('product_id', productIds),
				supabase.from('product_blog_sections').select('*').in('product_id', productIds),
				supabase.from('product_images').select('*').in('product_id', productIds),
			]);
			
			if (weightOptionsRes.error) throw weightOptionsRes.error;
			if (blogSectionsRes.error) throw blogSectionsRes.error;
			if (productImagesRes.error) throw productImagesRes.error;
			
			const weightOptions = weightOptionsRes.data || [];
			const blogSections = blogSectionsRes.data || [];
			const productImages = productImagesRes.data || [];
			
			// Group by product_id
			const weightOptionsByProduct = weightOptions.reduce((acc, wo) => {
				if (!acc[wo.product_id]) acc[wo.product_id] = [];
				acc[wo.product_id].push(wo);
				return acc;
			}, {} as Record<string, DBWeightOption[]>);
			
			const blogSectionsByProduct = blogSections.reduce((acc, bs) => {
				if (!acc[bs.product_id]) acc[bs.product_id] = [];
				acc[bs.product_id].push(bs);
				return acc;
			}, {} as Record<string, DBBlogSection[]>);
			
			const productImagesByProduct = productImages.reduce((acc, img) => {
				if (!acc[img.product_id]) acc[img.product_id] = [];
				acc[img.product_id].push(img as DBProductImage);
				return acc;
			}, {} as Record<string, DBProductImage[]>);
			
			// Transform products
			return products.map(p =>
					transformProduct(
							p as DBProduct,
							weightOptionsByProduct[p.id] || [],
							blogSectionsByProduct[p.id] || [],
							productImagesByProduct[p.id] || []
					)
			);
		},
	});
};

// Fetch single product by slug
export const useProduct = (slug: string) => {
	return useQuery({
		queryKey: ['product', slug],
		queryFn: async (): Promise<Product | null> => {
			const {data: product, error: productError} = await supabase
					.from('products')
					.select('*')
					.eq('slug', slug)
					.maybeSingle();
			
			if (productError) throw productError;
			if (!product) return null;
			
			// Fetch weight options, blog sections, and product images
			const [weightOptionsRes, blogSectionsRes, productImagesRes] = await Promise.all([
				supabase.from('product_weight_options').select('*').eq('product_id', product.id),
				supabase.from('product_blog_sections').select('*').eq('product_id', product.id),
				supabase.from('product_images').select('*').eq('product_id', product.id),
			]);
			
			if (weightOptionsRes.error) throw weightOptionsRes.error;
			if (blogSectionsRes.error) throw blogSectionsRes.error;
			if (productImagesRes.error) throw productImagesRes.error;
			
			return transformProduct(
					product as DBProduct,
					weightOptionsRes.data || [],
					blogSectionsRes.data || [],
					(productImagesRes.data || []) as DBProductImage[]
			);
		},
		enabled: !!slug,
	});
};

// Fetch best seller products
export const useBestSellers = () => {
	return useQuery({
		queryKey: ['products', 'best-sellers'],
		queryFn: async (): Promise<Product[]> => {
			const {data: products, error} = await supabase
					.from('products')
					.select('*')
					.eq('is_best_seller', true)
					.limit(4);
			
			if (error) throw error;
			if (!products || products.length === 0) return [];
			
			const productIds = products.map(p => p.id);
			
			const {data: weightOptions} = await supabase
					.from('product_weight_options')
					.select('*')
					.in('product_id', productIds);
			
			const {data: productImages} = await supabase
					.from('product_images')
					.select('*')
					.in('product_id', productIds);
			
			const weightOptionsByProduct = (weightOptions || []).reduce((acc, wo) => {
				if (!acc[wo.product_id]) acc[wo.product_id] = [];
				acc[wo.product_id].push(wo);
				return acc;
			}, {} as Record<string, DBWeightOption[]>);
			
			const productImagesByProduct = (productImages || []).reduce((acc, img) => {
				if (!acc[img.product_id]) acc[img.product_id] = [];
				acc[img.product_id].push(img as DBProductImage);
				return acc;
			}, {} as Record<string, DBProductImage[]>);
			
			return products.map(p =>
					transformProduct(
							p as DBProduct,
							weightOptionsByProduct[p.id] || [],
							[],
							productImagesByProduct[p.id] || []
					)
			);
		},
	});
};

// Format price helper
export const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

// Categories
export const categories = ['TẤT CẢ', 'THỊT GÁC BẾP', 'NÔNG SẢN'] as const;
