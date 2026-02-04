import type {Metadata} from "next";
import {getProducts} from "@/lib/data/products";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
	title: "Cửa hàng Đặc sản Tây Bắc | Thịt trâu gác bếp, Lạp xưởng, Măng khô",
	description:
			"Danh sách đặc sản Tây Bắc Điện Biên chính gốc tại Tiệm Của Bản. Thịt trâu gác bếp, lạp xưởng, măng rừng, ngô sấy. Cam kết chất lượng, giao hàng nhanh.",
	keywords: ["cửa hàng đặc sản", "thịt trâu gác bếp", "lạp xưởng tây bắc", "măng khô điện biên", "nông sản sạch"],
	alternates: {canonical: "/san-pham"},
	openGraph: {
		title: "Cửa hàng Đặc sản Tây Bắc | Tiệm Của Bản",
		description: "Khám phá thế giới đặc sản Tây Bắc chuẩn vị Điện Biên. Giao hàng toàn quốc.",
		url: 'https://tiemcuaban.vn/san-pham',
		type: 'website',
	}
};

export default async function ShopPage() {
	const products = await getProducts();
	return <ShopClient initialProducts={products}/>;
}
