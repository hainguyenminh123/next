import "server-only";

import {createSupabaseServerClient} from "@/lib/supabase/server";
import type {
	DBBlogSection,
	DBProduct,
	DBProductImage,
	DBWeightOption,
	Product,
	ProductCategory,
} from "@/types/database";

function transformProduct(
		dbProduct: DBProduct,
		weightOptions: DBWeightOption[],
		blogSections: DBBlogSection[],
		productImages: DBProductImage[] = []
): Product {
	const images = productImages
			.sort((a, b) => a.sort_order - b.sort_order)
			.map((img) => img.image_url);
	
	const galleryImages = productImages
			.filter((img) => img.image_type === "gallery")
			.sort((a, b) => a.sort_order - b.sort_order)
			.map((img) => ({
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
		weightOptions: weightOptions.map((wo) => ({
			id: wo.id,
			weight: wo.weight,
			price: wo.price,
		})),
		blogSections: blogSections
				.sort((a, b) => a.sort_order - b.sort_order)
				.map((bs) => ({
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
}

export async function getProducts(category?: ProductCategory | "TẤT CẢ") {
	const supabase = createSupabaseServerClient();
	
	let query = supabase.from("products").select("*");
	if (category && category !== "TẤT CẢ") query = query.eq("category", category);
	
	const {data: products, error: productsError} = await query;
	if (productsError) throw productsError;
	if (!products || products.length === 0) return [];
	
	const productIds = products.map((p) => p.id);
	
	const [weightOptionsRes, blogSectionsRes, productImagesRes] = await Promise.all([
		supabase.from("product_weight_options").select("*").in("product_id", productIds),
		supabase.from("product_blog_sections").select("*").in("product_id", productIds),
		supabase.from("product_images").select("*").in("product_id", productIds),
	]);
	
	if (weightOptionsRes.error) throw weightOptionsRes.error;
	if (blogSectionsRes.error) throw blogSectionsRes.error;
	if (productImagesRes.error) throw productImagesRes.error;
	
	const weightOptions = weightOptionsRes.data || [];
	const blogSections = blogSectionsRes.data || [];
	const productImages = (productImagesRes.data || []) as DBProductImage[];
	
	const weightOptionsByProduct: Record<string, DBWeightOption[]> = {};
	for (const wo of weightOptions) (weightOptionsByProduct[wo.product_id] ||= []).push(wo);
	
	const blogSectionsByProduct: Record<string, DBBlogSection[]> = {};
	for (const bs of blogSections) (blogSectionsByProduct[bs.product_id] ||= []).push(bs);
	
	const productImagesByProduct: Record<string, DBProductImage[]> = {};
	for (const img of productImages) (productImagesByProduct[img.product_id] ||= []).push(img);
	
	return products.map((p) =>
			transformProduct(
					p as DBProduct,
					weightOptionsByProduct[p.id] || [],
					blogSectionsByProduct[p.id] || [],
					productImagesByProduct[p.id] || []
			)
	);
}

export async function getProductBySlug(slug: string) {
	const supabase = createSupabaseServerClient();
	
	const {data: product, error: productError} = await supabase
			.from("products")
			.select("*")
			.eq("slug", slug)
			.maybeSingle();
	
	if (productError) throw productError;
	if (!product) return null;
	
	const [weightOptionsRes, blogSectionsRes, productImagesRes] = await Promise.all([
		supabase.from("product_weight_options").select("*").eq("product_id", product.id),
		supabase.from("product_blog_sections").select("*").eq("product_id", product.id),
		supabase.from("product_images").select("*").eq("product_id", product.id),
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
}
