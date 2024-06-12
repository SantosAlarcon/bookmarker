import { bookmarksStore } from "@/store/bookmarksStore";
import getRootBookmarks from "./supabase/bookmarks/getRootBookmarks";
import { getRootFolders } from "./supabase/folders/getRootFolders";
import { getSession } from "./supabase/getSession";
import { updateFolderList } from "./updateFolderList";
import getAllBookmarks from "./supabase/bookmarks/getAllBookmarks";
import { getAllFolders } from "./supabase/folders/getAllFolders";

export const updateBookmarkList = async () => {
	const updateBookmarksList = bookmarksStore.getState().setBookmarksList;
	const updateAllBookmarksList = bookmarksStore.getState().setAllBookmarksList;
	const session = await getSession();

	// Get the folders and bookmarks that don't belong to any parent
	// @ts-ignore
	const [rootFolders, rootBookmarks] = await Promise.all([getRootFolders(session?.user.id), getRootBookmarks(session?.user.id)]);
	const [allFolders, allBookmarks] = await Promise.all([getAllFolders(session?.user.id), getAllBookmarks(session?.user.id)]);

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
