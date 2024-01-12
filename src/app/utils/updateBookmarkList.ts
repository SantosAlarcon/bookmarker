import { bookmarksStore } from "@/store/bookmarksStore"

export const updateBookmarkList = async () => {
	const updateBookmarksList = bookmarksStore.getState().setBookmarksList

	const bookmarkList = await fetch("/api/bookmarks")
	const response = await bookmarkList.json()
	updateBookmarksList(response)
}
