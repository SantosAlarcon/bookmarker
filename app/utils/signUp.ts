// These functions are used to sign in the user depending of the provider
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const signUpWithGoogle = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    const { error, data } = await client.auth.signUp({
        provider: "google",
        options: {
            // @ts-ignore
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (data) console.log(data);
    if (error) console.error(error);
};

export const signUpWithGitHub = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    // @ts-ignore
    const { error, data } = await client.auth.signUpWithOAuth({
        provider: "github",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (data) console.log(data);
    if (error) console.error(error);
};

export const signUpWithFacebook = async (client: SupabaseClient) => {
    // Call the sign in function to sign in the user
    // @ts-ignore
    await client.auth.signUpWithOAuth({
        provider: "facebook",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });
};

export const signUpWithEmail = async (
    email: string,
    password: string,
    client: SupabaseClient,
) => {
    // Call the sign in function to sign in the user
    // @ts-ignore
    const { data, error } = await client.auth.signUpWithPassword({
        email: email,
        password: password,
    });

    if (data) {
        if (data?.session) {
            redirect("/");
        }
    }
    if (error) console.error(error);
};
