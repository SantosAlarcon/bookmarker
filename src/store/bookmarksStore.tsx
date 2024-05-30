import { create } from "zustand"
import { devtools } from "zustand/middleware"

type State = {
	bookmarksList: object[]
}

type Action = {
	setBookmarksList: (bookmarks: object[]) => void
}

export const bookmarksStore = create<State & Action>(devtools((set) => ({
	bookmarksList: [],
	setBookmarksList: (bookmarks: object[]) => set({ bookmarksList: bookmarks })
}), {name: "Bookmark List", anonymousActionType: "bookmark-list-update"}))
