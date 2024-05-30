import { bookmarksStore } from "@/store/bookmarksStore";
import getRootBookmarks from "./supabase/bookmarks/getRootBookmarks";
import { getRootFolders } from "./supabase/folders/getRootFolders";
import { getSession } from "./supabase/getSession";
import { updateFolderList } from "./updateFolderList";

export const updateBookmarkList = async () => {
	const updateBookmarksList = bookmarksStore.getState().setBookmarksList;
	const session = await getSession();

	// Get the folders and bookmarks that don't belong to any parent
	// @ts-ignore
	const [rootFolders, rootBookmarks] = await Promise.all([getRootFolders(session?.user.id), getRootBookmarks(session?.user.id)]);
	updateBookmarksList([...rootFolders, ...rootBookmarks]);

	// Also updates de folder list of its store. It is useful when listing the updated list of folders.
	// @ts-ignore
	await updateFolderList(session?.user.id);
};
