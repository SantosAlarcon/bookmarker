import { type BookmarkItem } from "@/types/types"

type BookmarkAction = {
	createBookmark: () => void
	deleteBookmark: (id: string) => void
	updateBookmark: (id: string, newBookmark: BookmarkItem) => void
}

export const bookmarkStore = store((set) => {
	return {
		createBookmark: () => { },
		deleteBookmark: (id: string) => { },
		updateBookmark: (id: string, newBookmark: BookmarkItem) => { },
	}
})
