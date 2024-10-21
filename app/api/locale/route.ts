import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const cookieList = cookies();
    return new Response(cookieList.get("NEXT_LOCALE")?.value)
}
