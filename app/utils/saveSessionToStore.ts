import { authStore } from "@/store/authStore"
import type { Session } from "@supabase/supabase-js"

// This function stores session, user and metadata in the auth store
export const saveSessionToStore = (session: Session | null) => {
    authStore().setAuth(session)
}
