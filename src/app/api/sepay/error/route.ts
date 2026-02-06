import {NextResponse} from "next/server";

const buildRedirect = (request: Request, status: string) => {
	const url = new URL(request.url);
	const redirectUrl = new URL("/thanh-toan/ket-qua", url.origin);
	
	url.searchParams.forEach((value, key) => {
		redirectUrl.searchParams.set(key, value);
	});
	redirectUrl.searchParams.set("status", status);
	
	return NextResponse.redirect(redirectUrl);
};

export async function GET(request: Request) {
	return buildRedirect(request, "error");
}
