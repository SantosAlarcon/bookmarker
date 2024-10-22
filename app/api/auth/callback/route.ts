import { createClient } from "@/app/utils/supabase/server";
import { authStore } from "@/store/authStore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient()
    const url: URL = new URL(request.url);
    const { searchParams, origin } = url;
    const code = searchParams.get("code");

    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";

    if (code) {
        // If the URL has a code, it calls a function that exchanges the code for a new session.
        const {
            data: { session },
            error,
        } = await supabase.auth.exchangeCodeForSession(code);

        // If there is no error, set session in the auth store and redirects to the main page
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/api/auth/auth-code-error`);
}
