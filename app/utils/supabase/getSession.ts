import { createClient } from "./server";

export const getSession = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error(error.message);
    }

    return data.session;
};
