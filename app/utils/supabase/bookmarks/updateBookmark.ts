import getFavicon from "@/app/utils/getFavicon";
import { createClient } from "@/app/utils/supabase/client";

interface updateInfo {
    title: string;
    url: string;
    parentFolder: string | null;
}

const updateBookmark = async (id: string, bookmark: updateInfo) => {
    const supabase = createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase
        .from("bookmarks")
        .update({
            bookmark_title: bookmark.title,
            bookmark_url: bookmark.url,
            bookmark_favicon: await getFavicon(bookmark.url),
            bookmark_parentfolder: bookmark.parentFolder,
        })
        .eq("bookmark_id", id)
        .eq("bookmark_user_id", user.id);
    if (error) console.error(error);
};

export default updateBookmark;
