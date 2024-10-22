import { bookmarksStore } from "@/store/bookmarksStore";
import getRootBookmarks from "./supabase/bookmarks/getRootBookmarks";
import { getRootFolders } from "./supabase/folders/getRootFolders";
import { updateFolderList } from "./updateFolderList";
import getAllBookmarks from "./supabase/bookmarks/getAllBookmarks";
import { getAllFolders } from "./supabase/folders/getAllFolders";
import { authStore } from "../store/authStore";

// This function fetches all bookmarks and folders from a user associated with the session user ID.
export const updateBookmarkList = async () => {
    const updateBookmarksList = bookmarksStore.getState().setBookmarksList;
    const updateAllBookmarksList = bookmarksStore.getState().setAllBookmarksList;
    const {session} = authStore.getState()

    // const supabase = await createClient();
    // const {
    //     data: { session },
    // } = await supabase.auth.getSession();

    // Get the folders and bookmarks that don't belong to any parent
    const [rootFolders, rootBookmarks] = await Promise.all([
        // @ts-ignore
        getRootFolders(session?.user.id),
        // @ts-ignore
        getRootBookmarks(session?.user.id),
    ]);

    const [allFolders, allBookmarks] = await Promise.all([
        // @ts-ignore
        getAllFolders(session?.user.id),
        // @ts-ignore
        getAllBookmarks(session?.user.id),
    ]);

    // If the above variables are not null, the bookmark list is updated
    if (rootFolders && rootBookmarks) {
        updateBookmarksList([...rootFolders, ...rootBookmarks]);
    }

    if (allFolders && allBookmarks) {
        updateAllBookmarksList([...allFolders, ...allBookmarks]);
    }

    // Also updates de folder list of its store. It is useful when listing the updated list of folders.
    // @ts-ignore
    await updateFolderList(session?.user.id);
};
