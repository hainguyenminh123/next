export type ProductCategory = 'Đặc sản khô' | 'THỊT GÁC BẾP' | 'NÔNG SẢN';
export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface DBProduct {
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
	created_at: string;
	updated_at: string;
}

export interface DBWeightOption {
	id: string;
	product_id: string;
	weight: string;
	price: number;
	created_at: string;
}

export interface DBBlogSection {
	id: string;
	product_id: string;
	title: string;
	content: string;
	image: string | null;
	thumbnail?: string | null;
	sort_order: number;
	created_at: string;
}

export interface DBProductImage {
	id: string;
	product_id: string;
	image_url: string;
	image_type: 'gallery' | 'blog';
	alt_text: string | null;
	sort_order: number;
	blog_section_id: string | null;
	created_at: string;
}

export interface ProductImage {
	id: string;
	imageUrl: string;
	altText: string | null;
	sortOrder: number;
}

export interface DBReview {
	id: string;
	product_id: string | null;
	name: string;
	location: string | null;
	rating: number;
	content: string;
	avatar: string | null;
	is_approved: boolean;
	created_at: string;
}

export interface DBOrder {
	id: string;
	order_number: string;
	customer_name: string;
	customer_phone: string;
	customer_email: string | null;
	shipping_address: string;
	shipping_province: string;
	note: string | null;
	subtotal: number;
	shipping_fee: number;
	total: number;
	status: OrderStatus;
	created_at: string;
	updated_at: string;
}

export interface DBOrderItem {
	id: string;
	order_id: string;
	product_id: string | null;
	product_name: string;
	product_image: string | null;
	weight: string;
	price: number;
	quantity: number;
	created_at: string;
}

export interface DBContact {
	id: string;
	name: string;
	email: string;
	phone: string | null;
	subject: string | null;
	message: string;
	is_read: boolean;
	created_at: string;
}

export interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	shortDescription: string | null;
	category: ProductCategory;
	basePrice: number;
	salePrice?: number | null;
	image?: string | null;
	images: string[];
	productImages?: {
		id: string;
		productId: string;
		url: string;
		isMain: boolean;
		sortOrder: number;
	}[];
	galleryImages: ProductImage[];
	inStock: boolean;
	stockStatus?: string | null;
	unit?: string | null;
	isBestSeller: boolean | true;
	isFeatured?: boolean | true;
	rating?: number | null;
	reviewCount?: number | null;
	origin: string | null;
	storageInfo: string | null;
	cookingTips: string | null;
	blogIntro: string | null;
	weightOptions: WeightOption[];
	blogSections: BlogSection[];
	createdAt: string;
	updatedAt: string;
}

export interface WeightOption {
	id: string;
	weight: string;
	price: number;
}

export interface BlogSection {
	id: string;
	title: string;
	content: string;
	image: string | null;
	thumbnail: string | null;
	sortOrder: number;
}

export interface Review {
	id: string;
	productId: string | null;
	name: string;
	location: string | null;
	rating: number;
	content: string;
	avatar: string | null;
	createdAt: string;
}

// Insert types
export interface CreateOrderInput {
	customer_name: string;
	customer_phone: string;
	customer_email?: string;
	shipping_address: string;
	shipping_province: string;
	note?: string;
	subtotal: number;
	shipping_fee: number;
	total: number;
}

export interface CreateOrderItemInput {
	order_id: string;
	product_id?: string;
	product_name: string;
	product_image?: string;
	weight: string;
	price: number;
	quantity: number;
}

export interface CreateReviewInput {
	product_id?: string;
	name: string;
	location?: string;
	rating: number;
	content: string;
}

export interface CreateContactInput {
	name: string;
	email: string;
	phone?: string;
	subject?: string;
	message: string;
}
