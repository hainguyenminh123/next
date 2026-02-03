import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Thanh toán | Tiệm Của Bản",
	description: "Hoàn tất đơn hàng đặc sản Tây Bắc của bạn. Thanh toán an toàn, giao hàng nhanh chóng.",
	robots: { index: false, follow: false },
};

export default function Layout({children}: { children: React.ReactNode }) {
	return <>{children}</>;
}
