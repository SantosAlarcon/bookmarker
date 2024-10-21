import { headers } from "next/headers";

export async function GET(request: Request) {
	const headerList = headers();
	const origin = headerList.get("origin") ?? "http://localhost:3000";
	return new Response(origin);
}
