import { create } from "zustand";
import { devtools } from "zustand/middleware";

const isDev = process.env.NODE_ENV === "development";

type State = {
    bookmarksList: object[];
    allBookmarksList: object[];
    fetched: boolean;
};

type Action = {
    setBookmarksList: (bookmarks: object[]) => void;
    setAllBookmarksList: (bookmarks: object[]) => void;
    setFetched: (fetched: boolean) => void;
};

export const bookmarksStore = create<State & Action>(
    // @ts-ignore
    devtools(
        (set) => ({
            fetched: false,
            bookmarksList: [],
            allBookmarksList: [],
            setBookmarksList: (bookmarks: object[]) =>
                set({ bookmarksList: bookmarks }),
            setAllBookmarksList: (bookmarks: object[]) =>
                set({ allBookmarksList: bookmarks }),
            setFetched: (fetched: boolean) => set({ fetched: fetched }),
        }),
        {
            name: "Bookmark List",
            anonymousActionType: "bookmark-list-update",
            enabled: isDev,
        },
    ),
);
