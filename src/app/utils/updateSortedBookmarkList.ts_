import { bookmarksStore } from "@/store/bookmarksStore"
import getAllSortedBookmarks from "../lib/bookmarks/getAllSortedBookmarks";

export const updateSortedBookmarkList = async () => {
	const updateBookmarksList = bookmarksStore.getState().setBookmarksList

	const bookmarkList = await getAllSortedBookmarks();
	updateBookmarksList(bookmarkList);
}
