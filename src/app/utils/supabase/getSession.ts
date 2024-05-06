import { authStore } from "@/store/authStore";
import { createClient } from "./client"

export const getSession = async () => {
    const supabase = createClient();
    const {setSession} = authStore.getState()

    const { data, error } = await supabase.auth.getSession()

    if (error) {
        throw new Error(error.message)
    }

    setSession(data.session)
   
    return data.session;
}
