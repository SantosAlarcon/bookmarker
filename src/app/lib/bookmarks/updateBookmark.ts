import getFavicon from "@/app/utils/getFavicon";
import { createClient } from "@/app/utils/supabase/client";
import { BookmarkItem } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";

interface updateInfo {
    title: string,
    url: string,
    parentFolder: string | null
}

const updateBookmark = async (id: string, bookmark: updateInfo) => {
    const supabase: SupabaseClient = createClient();
    const {data} = await supabase.auth.getSession()

    const updatedBookmark: BookmarkItem = {
        id: id,
        title: bookmark.title,
        url: bookmark.url,
        favicon: await getFavicon(bookmark.url),
        parentFolder: bookmark.parentFolder
    }
    await fetch(`/api/bookmarks/${id}`, {
        method: "PUT",
        // @ts-ignore
        headers: {
            "Authorization": data.session?.access_token,
            "Content-type": "application/json"
        },
        body: JSON.stringify(updatedBookmark)
    })
}

export default updateBookmark;
