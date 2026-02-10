import Layout from "@/components/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BestSellers from "@/components/home/BestSellers";
import ReviewsSection from "@/components/home/ReviewsSection";
import FAQSection from "@/components/home/FAQSection";
import {faqs} from "@/data/faqs";
import {getProducts, getReviews} from "@/lib/api";

export default async function Page() {
	const products = await getProducts();
	const reviews = await getReviews();
	const featuredProducts = products.slice(0, 4);
	const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);
	
	const faqsForSchema = faqs.map((faq) => ({
		question: faq.question,
		answer: faq.answer,
	}));
	
	return (
			<Layout
					title="Tiệm Của Bản | Đặc sản Tây Bắc Điện Biên chuẩn vị – Thịt trâu gác bếp, lạp xưởng, măng khô"
					description="Mua đặc sản Tây Bắc Điện Biên chính gốc: thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy. Chọn lọc từ hộ dân vùng cao. Giao nhanh toàn quốc."
					keywords="đặc sản Tây Bắc, đặc sản Điện Biên, thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy, quà tặng Tây Bắc, mua đặc sản online, đặc sản vùng cao"
					canonicalUrl="/"
					faqs={faqsForSchema}
			>
				<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "WebSite",
								"name": "Tiệm Của Bản",
								"url": "https://tiemcuaban.com",
								"potentialAction": {
									"@type": "SearchAction",
									"target": "https://tiemcuaban.com/san-pham?q={search_term_string}",
									"query-input": "required name=search_term_string"
								}
							})
						}}
				/>
				<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "Store",
								"name": "Tiệm Của Bản",
								"image": "https://tiemcuaban.com/og-image.png",
								"@id": "https://tiemcuaban.com",
								"url": "https://tiemcuaban.com",
								"telephone": "0877309894",
								"priceRange": "$$",
								"address": {
									"@type": "PostalAddress",
									"streetAddress": "29 Đức Diễn",
									"addressLocality": "Bắc Từ Liêm",
									"addressRegion": "Hà Nội",
									"postalCode": "100000",
									"addressCountry": "VN"
								},
								"geo": {
									"@type": "GeoCoordinates",
									"latitude": 21.0427,
									"longitude": 105.7486
								}
							})
						}}
				/>
				<h1 className="sr-only">Tiệm Của Bản - Đặc sản Tây Bắc Điện Biên chuẩn vị</h1>
				<HeroSlider/>
				<FeaturedProducts initialProducts={featuredProducts}/>
				<WhyChooseUs/>
				<BestSellers initialProducts={bestSellers}/>
				<ReviewsSection initialReviews={reviews}/>
				<FAQSection/>
			</Layout>
	);
}
