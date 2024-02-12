import { bookmarksStore } from "@/store/bookmarksStore"
import getAllBookmarks from "./supabase/bookmarks/getAllBookmarks"
import { createClient } from "./supabase/client"

export const updateBookmarkList = async () => {
    const updateBookmarksList = bookmarksStore.getState().setBookmarksList
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const bookmarkList = await getAllBookmarks(user?.id);
    updateBookmarksList(bookmarkList);
}
