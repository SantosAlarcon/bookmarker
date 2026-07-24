import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
	const url: URL = new URL(request.url);
	const { searchParams, origin } = url;
	const code = searchParams.get("code");

	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createClient();
		// If the URL has a code, it calls a function that exchanges the code for a new session.
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		// If there is no error, set session in the auth store and redirects to the main page
		if (!error) {
			//console.error("ERROR:", error);
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/api/auth/auth-code-error`);
}
