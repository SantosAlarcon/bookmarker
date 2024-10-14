import { create } from "zustand"
import { devtools } from "zustand/middleware"

const isDev = process.env.NODE_ENV === "development"

type State = {
	bookmarksList: object[]
    allBookmarksList: object[]
}

type Action = {
	setBookmarksList: (bookmarks: object[]) => void
	setAllBookmarksList: (bookmarks: object[]) => void
}

// @ts-ignore
export const bookmarksStore = create<State & Action>(devtools((set) => ({
	bookmarksList: [],
    allBookmarksList: [],
	setBookmarksList: (bookmarks: object[]) => set({ bookmarksList: bookmarks }),
	setAllBookmarksList: (bookmarks: object[]) => set({ allBookmarksList: bookmarks })
}), {name: "Bookmark List", anonymousActionType: "bookmark-list-update", enabled: (isDev)}))
