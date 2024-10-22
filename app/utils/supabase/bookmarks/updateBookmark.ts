import getFavicon from "@/app/utils/getFavicon";
import { createClient } from "@/app/utils/supabase/client";
import type { BookmarkItem } from "@/app/types/types";
import type { SupabaseClient } from "@supabase/supabase-js";

interface updateInfo {
    title: string;
    url: string;
    parentFolder: string | null;
}

const updateBookmark = async (id: string, bookmark: updateInfo) => {
    const supabase: SupabaseClient = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const updatedBookmark: BookmarkItem = {
        bookmark_id: id,
        bookmark_title: bookmark.title,
        bookmark_url: bookmark.url,
        bookmark_favicon: await getFavicon(bookmark.url),
        bookmark_parentfolder: bookmark.parentFolder,
        // @ts-ignore
        bookmark_user_id: user?.id,
    };

    const { error } = await supabase
        .from("bookmarks")
        .update(updatedBookmark)
        .eq("bookmark_id", id);
    if (error) console.error(error);
};

export default updateBookmark;
