import { createClient } from "./client"

export const getSession = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getSession()

    if (error) {
        throw new Error(error.message)
    }
   
    return data.session;
}
