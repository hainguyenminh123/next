import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Readex_Pro } from 'next/font/google';

const readexPro = Readex_Pro({
	subsets: ['vietnamese', 'latin'],
	display: 'swap',
	variable: '--font-readex-pro',
});

export const metadata = {
	title: {
		default: "Tiệm Của Bản | Đặc sản Tây Bắc Điện Biên chuẩn vị",
		template: "%s | Tiệm Của Bản"
	},
	description:
			"Mua đặc sản Tây Bắc Điện Biên chính gốc: Thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy giòn. Giao nhanh toàn quốc.",
	keywords: ["đặc sản Tây Bắc", "đặc sản Điện Biên", "thịt trâu gác bếp", "lạp xưởng", "măng khô", "Tiệm Của Bản"],
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://tiemcuaban.vn'),
	openGraph: {
		type: 'website',
		locale: 'vi_VN',
		url: 'https://tiemcuaban.vn',
		siteName: 'Tiệm Của Bản',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Tiệm Của Bản - Đặc sản Tây Bắc chuẩn vị',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Tiệm Của Bản | Đặc sản Tây Bắc Điện Biên chuẩn vị',
		description: 'Mua đặc sản Tây Bắc Điện Biên chính gốc: Thịt trâu gác bếp, lạp xưởng, măng khô. Giao nhanh toàn quốc.',
		images: ['/og-image.jpg'],
	},
	verification: {
		google: 'google-site-verification-id', // Cần thay bằng ID thật nếu có
	},
};

export default function RootLayout({children}: { children: React.ReactNode }) {
	return (
			<html lang="vi" className={readexPro.variable}>
			<body>
			<div className="min-h-screen flex flex-col overflow-x-hidden">
				<Navbar/>
				<main className="flex-1">
					<div style={{height: "var(--navbar-height)"}} className="block"/>
					<ClientProviders>
						{children}
					</ClientProviders>
				</main>
				<Footer/>
				<CartDrawer/>
				<ScrollToTopButton/>
			</div>
			</body>
			</html>
	);
}


