import { createClient } from "@/app/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

const getAllBookmarks = async () => {
    const supabase: SupabaseClient = createClient();
    const {data} = await supabase.auth.getSession()

    const response = await fetch("/api/bookmarks", {
        // @ts-ignore
        headers: {
            "Authorization": data.session?.access_token
        }
    });
    const json = await response.json()
    return json;
}

export default getAllBookmarks;
