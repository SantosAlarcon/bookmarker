import { create } from "zustand"

type State = {
	bookmarksList: object[]
}

type Action = {
	setBookmarksList: (bookmarks: object[]) => void
}

export const bookmarksStore = create<State & Action>((set: Function) => ({
	bookmarksList: [],
	setBookmarksList: (bookmarks: object[]) => set({ bookmarksList: bookmarks })
}))

// @ts-ignore
const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
	name: "Bookmarks",
})

connection?.init(bookmarksStore.getState())

bookmarksStore.subscribe((state: State & Action) => {
	connection?.send("State", JSON.stringify(state));
})
