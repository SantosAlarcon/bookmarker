import type { UserMetadata } from "@supabase/supabase-js"
import { createClient } from "./supabase/client"

// This function retrieves user metadata if logged
const getUserMetadata = async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    const metadata: UserMetadata | undefined = data.user?.user_metadata

    return metadata
}

export default getUserMetadata
