import { authStore } from "@/store/authStore";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const setSession = authStore.getState().setSession;
    const url: URL = new URL(request.url);
    console.log(url)
    const { searchParams, origin } = url;
    let parsedURL = url.toString();
    const code = searchParams.get("code");

    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";

    if (parsedURL.includes("#")) {
        parsedURL = parsedURL.replace("#", "?");
    }

    if (code) {
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options });
                    },
                },
            },
        );

        const {
            data: { session },
            error,
        } = await supabase.auth.exchangeCodeForSession(code);
	console.log("session", session);

        // If there is no error, set session in the auth store and redirects to the main page
        if (!error) {
            setSession(session);
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/api/auth/auth-code-error`);
}
