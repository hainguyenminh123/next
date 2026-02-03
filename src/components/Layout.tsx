import {ReactNode} from "react";

interface BreadcrumbItem {
	name: string;
	url: string;
}

interface ProductSEO {
	name: string;
	description: string;
	image: string;
	price: number;
	currency?: string;
	availability?: "InStock" | "OutOfStock" | "PreOrder";
	sku?: string;
	brand?: string;
	category?: string;
	reviewCount?: number;
	ratingValue?: number;
}

interface FAQItem {
	question: string;
	answer: string;
}

interface LayoutProps {
	children: ReactNode;
	title?: string;
	description?: string;
	keywords?: string;
	canonicalUrl?: string;
	ogImage?: string;
	ogType?: "website" | "article" | "product";
	breadcrumbs?: BreadcrumbItem[];
	product?: ProductSEO;
	faqs?: FAQItem[];
	noindex?: boolean;
}

export default function Layout({children}: LayoutProps) {
	return <>{children}</>;
}
