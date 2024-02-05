import { createClient } from "@/app/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

const deleteFolder = async (id: string) => {
    const supabase: SupabaseClient = createClient();
    const {data} = await supabase.auth.getSession()

    await fetch(`/api/bookmarks/folders/${id}`, {
        method: "DELETE",
        // @ts-ignore
        headers: {
            "Authorization": data.session?.access_token,
            "content-type": "application/json"
        },
    })
}

export default deleteFolder;
