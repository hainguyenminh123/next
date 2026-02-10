import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";

const createSupabaseInvokeClient = () => {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !anonKey) {
		throw new Error("Missing Supabase client configuration");
	}
	
	return createClient(url, anonKey, {
		auth: {persistSession: false},
	});
};

export async function POST(request: Request) {
	console.log("SePay IPN received a POST request");
	try {
		const payload = await request.json();
		console.log("SePay IPN payload:", JSON.stringify(payload, null, 2));
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
		console.log(orderInvoice);
		const supabase = createSupabaseInvokeClient();
		const {data, error} = await supabase.rpc("update_order_paid", {
			order_number: orderInvoice,
		});
		
		if (error || data?.error) {
			console.error("SePay IPN update error:", error || data?.error);
			return NextResponse.json({error: "Failed to update order"}, {status: 500});
		}
		
		return NextResponse.json({ok: true});
	} catch (error) {
		console.error("SePay IPN handler error:", error);
		return NextResponse.json({error: "Invalid payload"}, {status: 400});
	}
}
