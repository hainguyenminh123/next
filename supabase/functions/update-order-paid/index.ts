import {serve} from "https://deno.land/std@0.224.0/http/server.ts";
import {createClient} from "https://esm.sh/@supabase/supabase-js@2.49.1";

type Payload = {
	orderNumber?: string;
};

serve(async (req) => {
	if (req.method !== "POST") {
		return new Response(JSON.stringify({error: "Method not allowed"}), {status: 405});
	}
	
	let payload: Payload = {};
	try {
		payload = await req.json();
	} catch {
		return new Response(JSON.stringify({error: "Invalid payload"}), {status: 400});
	}
	
	const orderNumber = payload.orderNumber?.trim();
	if (!orderNumber) {
		return new Response(JSON.stringify({error: "Missing order number"}), {status: 400});
	}
	
	const supabaseUrl = Deno.env.get("SUPABASE_URL");
	const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
	if (!supabaseUrl || !serviceKey) {
		return new Response(JSON.stringify({error: "Server misconfigured"}), {status: 500});
	}
	
	const supabase = createClient(supabaseUrl, serviceKey, {
		auth: {persistSession: false},
	});
	
	const {error} = await supabase
		.from("orders")
		.update({is_paid: true, paid_at: new Date().toISOString()})
		.eq("order_number", orderNumber);
	
	if (error) {
		console.error("Update order paid failed:", error);
		return new Response(JSON.stringify({error: "Failed to update order"}), {status: 500});
	}
	
	return new Response(JSON.stringify({ok: true}));
});
