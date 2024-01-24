// These functions are used to sign in the user depending of the provider
"use server"
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const signInWithGoogle = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { error, data } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
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
    const {error, data} = await client.auth.signInWithOAuth({
        provider: "github",
        options: {
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
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            }
        }
    });
}

export const signInWithEmail = async (email: string, password: string, client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
    });

    if (data) {
        console.log(data);
        if (data?.session) {
            redirect('/')
        }
    }
    if (error) console.error(error);
}
