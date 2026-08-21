import { bookmarksStore } from "@/store/bookmarksStore";
import { folderStore } from "@/store/folderStore";
import getAllBookmarks from "./supabase/bookmarks/getAllBookmarks";
import { getAllFolders } from "./supabase/folders/getAllFolders";
import { authStore } from "../store/authStore";

// Fetches every folder and bookmark once, then derives the rest client-side.
// Root lists are a subset of the full lists, so nothing else needs fetching.
export const updateBookmarkList = async () => {
    const setBookmarksList = bookmarksStore.getState().setBookmarksList;
    const setAllBookmarksList = bookmarksStore.getState().setAllBookmarksList;
    const setFolderList = folderStore.getState().setFolderList;
    const { session } = authStore.getState();

    const [allFolders, allBookmarks] = await Promise.all([
        // @ts-ignore
        getAllFolders(session?.user.id),
        // @ts-ignore
        getAllBookmarks(session?.user.id),
    ]);

    if (!allFolders || !allBookmarks) {
        return;
    }

    // Root items are the ones without a parent folder
    const rootFolders = allFolders.filter(
        (folder) => !folder.folder_parentfolder,
    );
    const rootBookmarks = allBookmarks.filter(
        (bookmark) => !bookmark.bookmark_parentfolder,
    );

    setBookmarksList([...rootFolders, ...rootBookmarks]);
    setAllBookmarksList([...allFolders, ...allBookmarks]);
    setFolderList(allFolders);
};
