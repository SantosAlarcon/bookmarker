import { bookmarksStore } from "@/store/bookmarksStore"
import { getSession } from "./supabase/getSession";
import { getRootFolders } from "./supabase/folders/getRootFolders";
import getRootBookmarks from "./supabase/bookmarks/getRootBookmarks";

export const updateBookmarkList = async () => {
    const updateBookmarksList = bookmarksStore.getState().setBookmarksList
    const session = await getSession();

    // @ts-ignore
    const [rootFolders, rootBookmarks] = await Promise.all([getRootFolders(session?.user.id), getRootBookmarks(session?.user.id)])
    updateBookmarksList([...rootFolders, ...rootBookmarks])
}
