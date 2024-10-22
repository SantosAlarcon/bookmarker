"use server"

import { createClient } from "./server";

export const loginWithEmail = async (email: string, password: string) => {
    const supabase = await createClient();
	const {error} = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error();
    }
};
