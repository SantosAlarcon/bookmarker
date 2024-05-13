import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()

	// Create a Supabase client configured to use cookies
	const supabase = createMiddlewareClient<Database>({ req, res })

	// Refresh session if expired - required for Server Components
	//await supabase.auth.getSession()
    
	if (
		req.nextUrl.pathname.startsWith("/_next") ||
		req.nextUrl.pathname.includes("/api/") ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return
	}

	/*if (req.nextUrl.locale === "__default") {
	  const locale = req.cookies.get("NEXT_LOCALE")?.value || "en"
  
	  return NextResponse.redirect(
		new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
	  )
	}*/

	return res
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
	],
}
