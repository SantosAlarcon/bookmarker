import { create } from "zustand"

type ModalState = {
    deleteConfirmModal: boolean
    editFolderModal: boolean
    editBookmarkModal: boolean
    newBookmarkModal: boolean
    newFolderModal: boolean
    editFolderData: {
        id: string
        title: string
        description: string
        favicon: string | null
    }
    editBookmarkData: {
        id: string
        title: string
        url: string
        parentFolder: string | null
    }
    deleteProps: {
        id: string
        title: string
        type: "bookmark" | "folder"
    }
}

type Action = {
    showNewBookmarkModal: () => void
    hideNewBookmarkModal: () => void
    showNewFolderModal: () => void
    hideNewFolderModal: () => void
    showDeleteConfirmModal: () => void
    hideDeleteConfirmModal: () => void
    showEditBookmarkModal: () => void
    hideEditBookmarkModal: () => void
    showEditFolderModal: () => void
    hideEditFolderModal: () => void
    modifyEditFolderData: (
        id: string,
        title: string,
        description: string,
    ) => void
    modifyEditBookmarkData: (
        id: string,
        title: string,
        url: string,
        parentFolder: string | null
    ) => void
    setDeleteProps: (id: string, title: string, type: "bookmark" | "folder") => void
}

// @ts-ignore
export const modalStore = create<ModalState & Action>((set: Function) => ({
    deleteConfirmModal: false,
    editFolderModal: false,
    editBookmarkModal: false,
    newBookmarkModal: false,
    newFolderModal: false,
    editFolderData: {
        id: "",
        title: "",
        description: "",
        favicon: "",
    },
    editBookmarkData: {
        id: "",
        title: "",
        url: "",
        parentFolder: null,
    },
    deleteProps: {
        id: "",
        title: "",
        type: ""
    },
    showNewBookmarkModal: () => set({ newBookmarkModal: true }),
    hideNewBookmarkModal: () => set({ newBookmarkModal: false }),
    showNewFolderModal: () => set({ newFolderModal: true }),
    hideNewFolderModal: () => set({ newFolderModal: false }),
    showDeleteConfirmModal: () => set({ deleteConfirmModal: true }),
    hideDeleteConfirmModal: () => set({ deleteConfirmModal: false }),
    showEditBookmarkModal: () => set({ editBookmarkModal: true }),
    hideEditBookmarkModal: () => set({ editBookmarkModal: false }),
    showEditFolderModal: () => set({ editFolderModal: true }),
    hideEditFolderModal: () => set({ editFolderModal: false }),
    modifyEditFolderData: (
        id: string,
        title: string,
        description: string,
    ) =>
        set({
            editFolderData: {
                id: id,
                title: title,
                description: description,
            },
        }),
    modifyEditBookmarkData: (
        id: string,
        title: string,
        url: string,
        parentFolder: string | null
    ) =>
        set({
            editBookmarkData: {
                id: id,
                title: title,
                url: url,
                parentFolder: parentFolder,
            },
        }),
    setDeleteProps: (id: string, title: string, type: "bookmark" | "folder") =>
        set({ deleteProps: { id: id, title: title, type: type } }),
}))
