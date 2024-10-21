import { createClient } from "@/app/utils/supabase/server";
import { authStore } from "@/store/authStore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const setSession = authStore.getState().setSession;
    const url: URL = new URL(request.url);
    const { searchParams, origin } = url;
    const code = searchParams.get("code");

    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";

    if (code) {

        const {
            data: { session },
            error,
        } = await createClient().auth.exchangeCodeForSession(code);
        console.log("SESSION: ", session);

        // If there is no error, set session in the auth store and redirects to the main page
        if (!error) {
            setSession(session);
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/api/auth/auth-code-error`);
}
