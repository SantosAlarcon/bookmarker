import { createClient } from "@/app/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

const deleteBookmark = async (id: string) => {
    const supabase: SupabaseClient = createClient();
    const {data} = await supabase.auth.getSession()

    const body = {
        id: id
    }
    await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
        // @ts-ignore
        headers: {
            "Authorization": data.session?.access_token,
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export default deleteBookmark;
