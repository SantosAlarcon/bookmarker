// These functions are used to sign in the user depending of the provider
import { authStore } from "@/store/authStore";
import type { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";

let callbackUrl: string = "";

// The callback URL is different between development and production environments
switch (process.env.NODE_ENV) {
    case "development": {
        callbackUrl = "http://localhost:3000/auth/callback";
        break;
    }
    case "production": {
        callbackUrl = "https://bookmarker-rho.vercel.app/auth/callback";
        break;
    }
}

export const signInWithGoogle = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    // @ts-ignore
    const {
        error,
        data: { session },
    } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (session) authStore.getState().setSession(session);
    if (error) console.error(error);
};

export const signInWithGitHub = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { error, data } = await client.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (data) console.log(data);
    if (error) console.error(error);
};

export const signInWithFacebook = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    await client.auth.signInWithOAuth({
        provider: "facebook",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });
};

export const signInWithEmail = async (
    email: string,
    password: string,
    client: SupabaseClient,
) => {
    // Call the sign in function to sign in the user
    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
    });

    // If the login credentials are wrong, it shows a toaster with the error
    if (error) {
        toast.error(error.message);
        return false;
    }

    if (data) {
        toast.success("Login successful!");
    }

    return true;
};
