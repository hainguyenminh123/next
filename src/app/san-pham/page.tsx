import type {Metadata} from "next";
import {getProducts} from "@/lib/data/products";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
	title: "Sản phẩm | Tiệm Của Bản",
	description:
			"Khám phá đặc sản Tây Bắc Điện Biên: thịt gác bếp, lạp xưởng, nông sản. Giá tốt, giao hàng toàn quốc.",
	alternates: {canonical: "/san-pham"},
};

export default async function ShopPage() {
	const products = await getProducts();
	return <ShopClient initialProducts={products}/>;
}
