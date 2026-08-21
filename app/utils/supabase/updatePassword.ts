"use server";

import { createClient } from "./server";

export const updatePassword = async (password: string) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
        throw new Error(error.message);
    }
};
