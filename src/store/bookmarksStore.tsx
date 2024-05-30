import { create } from "zustand"
import { devtools } from "zustand/middleware"

const isDev = process.env.NODE_ENV === "development"

type State = {
	bookmarksList: object[]
}

type Action = {
	setBookmarksList: (bookmarks: object[]) => void
}

// @ts-ignore
export const bookmarksStore = create<State & Action>(devtools((set) => ({
	bookmarksList: [],
	setBookmarksList: (bookmarks: object[]) => set({ bookmarksList: bookmarks })
}), {name: "Bookmark List", anonymousActionType: "bookmark-list-update", enabled: (isDev)}))
