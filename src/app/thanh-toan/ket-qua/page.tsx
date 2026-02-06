import Link from "next/link";
import {CheckCircle2, XCircle, AlertTriangle} from "lucide-react";

type ResultStatus = "success" | "error" | "cancel";

const getStatusConfig = (status: ResultStatus | undefined) => {
	switch (status) {
		case "success":
			return {
				title: "Thanh toán thành công",
				description: "Cảm ơn bạn. Đơn hàng của bạn đang được xử lý.",
				icon: CheckCircle2,
				accent: "text-green-600",
			};
		case "error":
			return {
				title: "Thanh toán thất bại",
				description: "Giao dịch không thành công. Vui lòng thử lại. Hoặc liên hệ để kiểm tra",
				icon: XCircle,
				accent: "text-red-600",
			};
		case "cancel":
		default:
			return {
				title: "Đã hủy thanh toán",
				description: "Bạn đã hủy giao dịch. Có thể thử lại bất cứ lúc nào.",
				icon: AlertTriangle,
				accent: "text-amber-600",
			};
	}
};

export default function PaymentResultPage({
	searchParams,
}: {
	searchParams: {status?: ResultStatus; order_invoice_number?: string};
}) {
	const status = searchParams?.status;
	const orderNumber = searchParams?.order_invoice_number;
	const config = getStatusConfig(status);
	const Icon = config.icon;
	
	return (
			<main className="min-h-[70vh] flex items-center justify-center bg-secondary/20">
				<div className="w-full max-w-2xl mx-auto bg-white rounded-[2rem] p-10 shadow-xl border border-premium-red/10 text-center">
					<Icon className={`w-16 h-16 mx-auto ${config.accent}`}/>
					<h1 className="text-3xl md:text-4xl font-heading font-bold mt-6">{config.title}</h1>
					<p className="text-muted-foreground mt-3">{config.description}</p>
					{orderNumber && (
							<div className="mt-4 text-sm font-bold text-premium-red">
								Mã đơn: {orderNumber}
							</div>
					)}
					
					<div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
								href="/san-pham"
								className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-premium-red text-white font-bold hover:bg-premium-red-light transition-all"
						>
							Tiếp tục mua hàng
						</Link>
						<Link
								href="/"
								className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-premium-red/20 text-premium-red font-bold hover:border-premium-red/40 transition-all"
						>
							Về trang chủ
						</Link>
					</div>
				</div>
			</main>
	);
}
