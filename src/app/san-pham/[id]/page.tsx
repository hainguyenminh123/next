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
		title: product.name,
		description,
		alternates: {canonical: `/san-pham/${product.slug}`},
		openGraph: {
			title: product.name,
			description,
			type: 'article',
			url: `https://tiemcuaban.vn/san-pham/${product.slug}`,
			images: product.images?.length ? [
				{
					url: product.images[0],
					width: 800,
					height: 800,
					alt: product.name,
				}
			] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: product.name,
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
		<>
			<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Product",
							"name": product.name,
							"image": product.images,
							"description": product.shortDescription || product.description,
							"sku": product.id,
							"brand": {
								"@type": "Brand",
								"name": "Tiệm Của Bản"
							},
							"offers": {
								"@type": "Offer",
								"url": `https://tiemcuaban.vn/san-pham/${product.slug}`,
								"priceCurrency": "VND",
								"price": product.basePrice,
								"availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
								"itemCondition": "https://schema.org/NewCondition"
							},
							"aggregateRating": productReviews.length > 0 ? {
								"@type": "AggregateRating",
								"ratingValue": productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length,
								"reviewCount": productReviews.length
							} : undefined
						})
					}}
			/>
			<ProductDetailClient 
				product={product} 
				relatedProducts={relatedProducts} 
				initialReviews={productReviews}
			/>
		</>
	);
}
