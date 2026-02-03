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
