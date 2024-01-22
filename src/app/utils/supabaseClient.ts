import { SupabaseClient, createClient } from "@supabase/supabase-js"

const supabaseClient: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
)

// Register this immediately after calling createClient!
// Because signInWithOAuth causes a redirect, you need to fetch the
// provider tokens from the callback.

supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem("oauth_provider_token", session.provider_token)
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem(
      "oauth_provider_refresh_token",
      session.provider_refresh_token
    )
  }

  if (event === "SIGNED_OUT") {
    window.localStorage.removeItem("oauth_provider_token")
    window.localStorage.removeItem("oauth_provider_refresh_token")
    console.log("Logged out")
  }
})

export default supabaseClient
