import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { getSession } from "@/app/utils/supabase/getSession";
import type { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./next-i18next.config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient<Database>({ req, res });

    // Refresh session if expired - required for Server Components
    //await supabase.auth.getSession()

    //const session = await getSession()
    //const {data: {session}} = await supabase.auth.getSession();

    if (
        req.nextUrl.pathname.startsWith("/_next") ||
        req.nextUrl.pathname.includes("/api/") ||
        req.nextUrl.pathname.includes("/api/auth/") ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return NextResponse.next();
    }

    // If there is no session, redirect to the login page
    /*if (!session?.user) {
        return NextResponse.rewrite(new URL(`/${req.nextUrl.locale}/auth/login`, req.url))
    } */

    return i18nRouter(req, i18nConfig);
}

// Ensure the middleware is only called for relevant paths.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
        "/auth/login",
        "/auth/register",
        "/api/auth/callback",
        "/reset-password",
        "/profile",
        "/prueba2",
    ],
};
