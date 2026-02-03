import "server-only";

import { createSupabaseServerClient } from "./supabase/server";
import { 
  DBBlogSection, 
  DBProduct, 
  DBProductImage, 
  DBReview,
  DBWeightOption, 
  Product, 
  ProductCategory,
  Review
} from "@/types/database";

const transformReview = (dbReview: DBReview): Review => ({
  id: dbReview.id,
  productId: dbReview.product_id,
  name: dbReview.name,
  location: dbReview.location,
  rating: dbReview.rating,
  content: dbReview.content,
  avatar: dbReview.avatar,
  createdAt: dbReview.created_at,
});

const transformProduct = (
  dbProduct: DBProduct,
  weightOptions: DBWeightOption[],
  blogSections: DBBlogSection[],
  productImages: DBProductImage[]
): Product => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    shortDescription: dbProduct.short_description,
    description: dbProduct.description,
    basePrice: dbProduct.base_price,
    category: dbProduct.category,
    isBestSeller: dbProduct.is_best_seller,
    inStock: dbProduct.in_stock,
    origin: dbProduct.origin,
    storageInfo: dbProduct.storage_info,
    cookingTips: dbProduct.cooking_tips,
    blogIntro: dbProduct.blog_intro,
    images: productImages.length > 0 
      ? productImages.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(img => img.image_url)
      : dbProduct.images,
    galleryImages: productImages
      .filter(img => img.image_type === 'gallery')
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map(img => ({
        id: img.id,
        imageUrl: img.image_url,
        altText: img.alt_text,
        sortOrder: img.sort_order,
      })),
    weightOptions: weightOptions
      .map(wo => ({
        id: wo.id,
        weight: wo.weight,
        price: wo.price,
      }))
      .sort((a, b) => a.price - b.price),
    blogSections: blogSections
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
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

export async function getProducts(category?: ProductCategory | 'TẤT CẢ'): Promise<Product[]> {
  const supabase = createSupabaseServerClient();
  
  let query = supabase.from('products').select('*');
  
  if (category && category !== 'TẤT CẢ') {
    query = query.eq('category', category);
  }
  
  const { data: products, error: productsError } = await query;
  
  if (productsError) throw productsError;
  if (!products || products.length === 0) return [];
  
  const productIds = products.map(p => p.id);
  
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
  
  return products.map(p =>
    transformProduct(
      p as DBProduct,
      weightOptionsByProduct[p.id] || [],
      blogSectionsByProduct[p.id] || [],
      productImagesByProduct[p.id] || []
    )
  );
}

export async function getReviews(limit?: number): Promise<Review[]> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data || []).map(r => transformReview(r as DBReview));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createSupabaseServerClient();
  
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  
  if (productError) throw productError;
  if (!product) return null;
  
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
}

export async function getBestSellers(): Promise<Product[]> {
  const supabase = createSupabaseServerClient();
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_best_seller', true)
    .limit(4);
    
  if (error) throw error;
  if (!products || products.length === 0) return [];
  
  const productIds = products.map(p => p.id);
  
  const [weightOptionsRes, productImagesRes] = await Promise.all([
    supabase.from('product_weight_options').select('*').in('product_id', productIds),
    supabase.from('product_images').select('*').in('product_id', productIds),
  ]);
  
  if (weightOptionsRes.error) throw weightOptionsRes.error;
  if (productImagesRes.error) throw productImagesRes.error;
  
  const weightOptions = weightOptionsRes.data || [];
  const productImages = productImagesRes.data || [];
  
  const weightOptionsByProduct = weightOptions.reduce((acc, wo) => {
    if (!acc[wo.product_id]) acc[wo.product_id] = [];
    acc[wo.product_id].push(wo);
    return acc;
  }, {} as Record<string, DBWeightOption[]>);
  
  const productImagesByProduct = productImages.reduce((acc, img) => {
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
}
