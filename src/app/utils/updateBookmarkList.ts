import { bookmarksStore } from "@/store/bookmarksStore"
import { getSession } from "./supabase/getSession";
import { getRootFolders } from "./supabase/folders/getRootFolders";
import getRootBookmarks from "./supabase/bookmarks/getRootBookmarks";
import { updateFolderList } from "./updateFolderList";

export const updateBookmarkList = async () => {
    const updateBookmarksList = bookmarksStore.getState().setBookmarksList
    const session = await getSession();

    // @ts-ignore
    const [rootFolders, rootBookmarks] = await Promise.all([getRootFolders(session?.user.id), getRootBookmarks(session?.user.id)])
    updateBookmarksList([...rootFolders, ...rootBookmarks])
    // @ts-ignore
    // Also updates de folder list of its store. It is useful when listing the updated list of folders.
    await updateFolderList(session?.user.id)
}
