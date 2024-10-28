"use server";

import { createClient } from "./server";

export const updatePassword = async (email: string, password: string) => {
    const supabase = await createClient();

    await supabase.auth.updateUser({ email, password });
};
