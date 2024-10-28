import { type SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseClient: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

// Register this immediately after calling createClient!
// Because signInWithOAuth causes a redirect, you need to fetch the
// provider tokens from the callback.
supabaseClient.auth.onAuthStateChange((event, session) => {
    // console.log("SESSION: ", session)

    // If there is a provider token, it is stored in local storage
    if (session?.provider_token) {
        window.localStorage.setItem(
            "oauth_provider_token",
            session.provider_token,
        );
    }

    // If there is a refresh token, it is stored in local storage
    if (session?.provider_refresh_token) {
        window.localStorage.setItem(
            "oauth_provider_refresh_token",
            session.provider_refresh_token,
        );
    }

    // If user logs out, the provider tokens are removed from local storage and shows a message to the console.
    if (event === "SIGNED_OUT") {
        window.localStorage.removeItem("oauth_provider_token");
        window.localStorage.removeItem("oauth_provider_refresh_token");
        console.log("Logged out");
    }
});

export default supabaseClient;
