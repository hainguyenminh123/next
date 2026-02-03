import Link from "next/link";

export default function NotFound() {
	return (
		<section className="flex min-h-[60vh] items-center justify-center bg-muted/30">
			<div className="text-center px-6">
				<div
						className="inline-flex items-center gap-2 rounded-full border border-premium-red/20 bg-premium-red/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-premium-red mb-6">
					Không khí Tết
				</div>
				<h1 className="mb-4 text-5xl md:text-6xl font-heading font-black text-premium-red">404</h1>
				<p className="mb-6 text-lg md:text-xl text-muted-foreground">
					Rất tiếc! Chúng tôi không tìm thấy trang bạn yêu cầu.
				</p>
				
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
					<Link
							href="/"
							className="inline-flex items-center justify-center rounded-2xl bg-premium-red px-8 py-3 text-sm font-bold text-white shadow-lg shadow-premium-red/20 transition-all hover:-translate-y-1 hover:bg-premium-red-light"
					>
						Quay về Trang chủ
					</Link>
					<Link
							href="/san-pham"
							className="inline-flex items-center justify-center rounded-2xl border border-festive-gold/30 bg-white px-8 py-3 text-sm font-bold text-premium-red transition-all hover:bg-festive-gold/10"
					>
						Xem đặc sản
					</Link>
				</div>
				
				<div
						className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-premium-red/70">
					<span
							className="rounded-full border border-premium-red/20 bg-premium-red/5 px-3 py-1">Đặc sản Tây Bắc</span>
					<span
							className="rounded-full border border-festive-gold/30 bg-festive-gold/10 px-3 py-1 text-festive-gold">Quà Tết</span>
					<span
							className="rounded-full border border-premium-red/20 bg-premium-red/5 px-3 py-1">Giao hàng toàn quốc</span>
				</div>
			</div>
		</section>
	);
}
