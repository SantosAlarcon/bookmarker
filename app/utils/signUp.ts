// These functions are used to sign in the user depending of the provider
import { SupabaseClient } from "@supabase/supabase-js";

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
