import {NextResponse} from "next/server";
import {SePayPgClient} from "sepay-pg-node";

type InitPayload = {
	orderNumber: string;
	amount: number;
	description?: string;
};

const getBaseUrl = (request: Request) =>
		process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as InitPayload;
		if (!body?.orderNumber || !body?.amount) {
			return NextResponse.json({error: "Missing order data"}, {status: 400});
		}
		
		const merchantId = process.env.SEPAY_MERCHANT_ID;
		const secretKey = process.env.SEPAY_SECRET_KEY;
		if (!merchantId || !secretKey) {
			return NextResponse.json({error: "SePay credentials are not configured"}, {status: 500});
		}
		
		const env = process.env.SEPAY_ENV === "production" ? "production" : "sandbox";
		const client = new SePayPgClient({
			env,
			merchant_id: merchantId,
			secret_key: secretKey,
		});
		
		const baseUrl = getBaseUrl(request);
		const successUrl = `${baseUrl}/api/sepay/success`;
		const errorUrl = `${baseUrl}/api/sepay/error`;
		const cancelUrl = `${baseUrl}/api/sepay/cancel`;
		
		const fields = client.checkout.initOneTimePaymentFields({
			operation: "PURCHASE",
			payment_method: "BANK_TRANSFER",
			order_invoice_number: body.orderNumber,
			order_amount: Math.round(body.amount),
			currency: "VND",
			order_description: body.description || `Thanh toan don hang ${body.orderNumber}`,
			success_url: successUrl,
			error_url: errorUrl,
			cancel_url: cancelUrl,
		});
		
		return NextResponse.json({
			checkoutUrl: client.checkout.initCheckoutUrl(),
			fields,
		});
	} catch (error) {
		console.error("SePay init error:", error);
		return NextResponse.json({error: "Failed to init SePay checkout"}, {status: 500});
	}
}


