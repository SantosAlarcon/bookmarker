"use server";

import type { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export const loginWithOAuth = async (provider: Provider) => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/auth/callback`,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        return console.error(error);
    }

    if (data.url) {
        return redirect(data.url);
    }
};
