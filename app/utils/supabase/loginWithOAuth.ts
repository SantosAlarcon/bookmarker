import type { Provider } from "@supabase/supabase-js";
import supabaseClient from "./supabaseClient";
import { authStore } from "@/app/store/authStore";

let callbackURL: string = "";
const setSession = authStore.getState().setSession;

switch (process.env.NODE_ENV) {
    case "development": {
        callbackURL = "http://localhost:3000/api/auth/callback";
        break;
    }

    case "production": {
        callbackURL = "http://bookmarker-rho.vercel.app/api/auth/callback";
        break;
    }

    default: {
	break;
    }
}

export const loginWithOAuth = async (provider: Provider) => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: callbackURL,
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    setSession(data.session);
};
