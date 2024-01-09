import { create } from "zustand"

type ModalState = {
  deleteConfirmModal: boolean
  editFolderModal: boolean
  editBookmarkModal: boolean
  editFolderData: {
    title: string
    description: string
  }
  editBookmarkData: {
    title: string
    url: string
  }
}

type Action = {
  showDeleteConfirmModal: (
    deleteConfirmModal: ModalState["deleteConfirmModal"]
  ) => void
  hideDeleteConfirmModal: (
    deleteConfirmModal: ModalState["deleteConfirmModal"]
  ) => void
  showEditBookmarkModal: (
    editBookmarkModal: ModalState["editBookmarkModal"]
  ) => void
  hideEditBookmarkModal: (
    editBookmarkModal: ModalState["editBookmarkModal"]
  ) => void
  showEditFolderModal: (editFolderModal: ModalState["editFolderModal"]) => void
  hideEditFolderModal: (editFolderModal: ModalState["editFolderModal"]) => void
  modifyEditFolderData: (title: string, description: string) => void
  modifyEditBookmarkData: (title: string, url: string) => void
}

export const modalStore = create<ModalState & Action>((set) => ({
  deleteConfirmModal: false,
  editFolderModal: false,
  editBookmarkModal: false,
  editFolderData: {
    title: "",
    description: "",
  },
  editBookmarkData: {
    title: "",
    url: "",
  },
  showDeleteConfirmModal: () => set({ deleteConfirmModal: true }),
  hideDeleteConfirmModal: () => set({ deleteConfirmModal: false }),
  showEditBookmarkModal: () => set({ editBookmarkModal: true }),
  hideEditBookmarkModal: () => set({ editBookmarkModal: false }),
  showEditFolderModal: () => set({ editFolderModal: true }),
  hideEditFolderModal: () => set({ editFolderModal: false }),
  modifyEditFolderData: (title, description) =>
    set({ editFolderData: { title: title, description: description } }),
  modifyEditBookmarkData: (title, url) =>
    set({ editBookmarkData: { title: title, url: url } }),
}))
