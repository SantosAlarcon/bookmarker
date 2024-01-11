import { create } from "zustand"
import zukeeper from "zukeeper"

type State = {
	bookmarksList: object[]
}

type Action = {	
	setBookmarksList: (bookmarks: object[]) => void
}

export const bookmarksStore = create<State & Action>(zukeeper(((set) => ({
    bookmarksList: [],
    setBookmarksList: (bookmarks: object[]) => set({ bookmarksList: bookmarks })
}))))

