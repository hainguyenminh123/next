import {NextResponse} from "next/server";
import {createSupabaseServerClient} from "@/lib/supabase/server";

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const orderInvoice = payload?.order?.order_invoice_number as string | undefined;
		const notificationType = payload?.notification_type as string | undefined;
		const transactionStatus = payload?.transaction?.transaction_status as string | undefined;
		const orderStatus = payload?.order?.order_status as string | undefined;
		
		if (!orderInvoice) {
			return NextResponse.json({error: "Missing order invoice number"}, {status: 400});
		}
		
		const shouldMarkPaid =
				notificationType === "ORDER_PAID" &&
				transactionStatus === "APPROVED" &&
				orderStatus === "CAPTURED";
		
		if (!shouldMarkPaid) {
			return NextResponse.json({ok: true, ignored: true});
		}
		
		const supabase = createSupabaseServerClient();
		const {error} = await supabase
				.from("orders")
				.update({is_paid: true})
				.eq("order_number", orderInvoice);
		
		if (error) {
			console.error("SePay IPN update error:", error);
			return NextResponse.json({error: "Failed to update order"}, {status: 500});
		}
		
		return NextResponse.json({ok: true});
	} catch (error) {
		console.error("SePay IPN handler error:", error);
		return NextResponse.json({error: "Invalid payload"}, {status: 400});
	}
}
