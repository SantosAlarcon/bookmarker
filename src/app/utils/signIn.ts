// These functions are used to sign in the user depending of the provider
import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";

let callbackUrl: string = "";

if (process.env.NODE_ENV === "development") {
    callbackUrl = "http://localhost:3000/auth/callback"
} else if (process.env.NODE_ENV === "production") {
    callbackUrl = "http://bookmarker-rho.vercel.app/auth/callback"
}

export const signInWithGoogle = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { error, data } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            }
        }
    });

    if (data) console.log(data);
    if (error) console.error(error);

}

export const signInWithGitHub = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { error, data } = await client.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            }
        }
    });

    if (data) console.log(data);
    if (error) console.error(error);
}

export const signInWithFacebook = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    await client.auth.signInWithOAuth({
        provider: "facebook",
        options: {
            redirectTo: callbackUrl,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            }
        }
    });
}

export const signInWithEmail = async (email: string, password: string, client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
    });

    // If the login credentials are wrong, it shows a toaster with the error
    if (error) {
        toast.error(error.message)
        return false;
    } else {
        toast.success("Login successful!")
        return true
    }
}
