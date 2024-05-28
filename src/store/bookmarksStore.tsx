import { create } from "zustand"

type State = {
	bookmarksList: object[]
}

type Action = {
	setBookmarksList: (bookmarks: object[]) => void
}

export const bookmarksStore = create<State & Action>((set) => ({
	bookmarksList: [],
	setBookmarksList: (bookmarks: object[]) => set({ bookmarksList: bookmarks })
}))
