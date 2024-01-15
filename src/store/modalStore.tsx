import { create } from "zustand"
import zukeeper from "zukeeper"

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
		children: []
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
		children: []
	) => void
	modifyEditBookmarkData: (
		id: string,
		title: string,
		url: string,
		parentFolder: string | null
	) => void
	setDeleteProps: (id: string, title: string) => void
}

export const modalStore = create<ModalState & Action>(
	zukeeper((set: Function) => ({
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
			children: [],
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
			favicon: string | null,
			children: []
		) =>
			set({
				editFolderData: {
					id: id,
					title: title,
					description: description,
					favicon: favicon,
					children: children,
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
		setDeleteProps: (id: string, title: string) =>
			set({ deleteProps: { id: id, title: title } }),
	}))
)