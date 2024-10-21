import type { Provider } from "@supabase/supabase-js";
import supabaseClient from "./supabaseClient";
import { redirect } from "next/navigation";

export const loginWithOAuth = async (provider: Provider) => {
    const origin = await fetch("/api/origin");

    const {data, error} = await supabaseClient.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/api/auth/callback`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (data.url) {
	redirect(data.url);
    }
};
