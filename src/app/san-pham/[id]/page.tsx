import {notFound} from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import {getProductBySlug, getProducts, getReviews} from "@/lib/api";
import type {Metadata} from "next";

export async function generateMetadata({
	                                       params,
                                       }: {
	params: { id: string };
}): Promise<Metadata> {
	const product = await getProductBySlug(params.id);
	if (!product) return {title: "Sản phẩm không tồn tại | Tiệm Của Bản"};
	
	const description =
			product.shortDescription ||
			(product.description ? product.description.slice(0, 140) : "");
	
	return {
		title: `${product.name} | Tiệm Của Bản`,
		description,
		alternates: {canonical: `/san-pham/${product.slug}`},
		openGraph: {
			title: `${product.name} | Tiệm Của Bản`,
			description,
			images: product.images?.length ? [product.images[0]] : undefined,
		},
	};
}

export default async function ProductDetailPage({
	                                                params,
                                                }: {
	params: { id: string };
}) {
	const product = await getProductBySlug(params.id);
	if (!product) return notFound();
	
	const [all, initialReviews] = await Promise.all([
		getProducts(product.category),
		getReviews()
	]);
	
	const relatedProducts = all.filter((p) => p.id !== product.id).slice(0, 4);
	const productReviews = initialReviews.filter(r => r.productId === product.id);
	
	return (
		<ProductDetailClient 
			product={product} 
			relatedProducts={relatedProducts} 
			initialReviews={productReviews}
		/>
	);
}
