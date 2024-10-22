import type { BookmarkFolder } from "@/app/types/types";
import { create } from "zustand";

export type State = {
    folderList: BookmarkFolder[];
};

export type Action = {
    setFolderList: (folderList: BookmarkFolder[]) => void;
};

export const folderStore = create<State & Action>((set: Function) => ({
    folderList: [],
    setFolderList: (folderList: BookmarkFolder[]) =>
        set({ folderList: folderList }),
}));
