export const modalVisibility = {
	editBookmarkModal: false,
	confirmDeleteModal: false,
	editFolderModal: false,
}

export const modalVisibilityReducer = (state, action) => {
	switch (action.type) {
		case "displayEditBookmarkModal":
			return {
				...state,
				editBookmarkModal: true,
			}
		case "hideEditBookmarkModal":
			return {
				...state,
				editBookmarkModal: false,
			}
		case "displayEditFolderModal":
			return {
				...state,
				editFolderModal: true,
			}
		case "hideEditFolderModal":
			return {
				...state,
				editFolderModal: false,
			}
		case "displayConfirmDeleteModal":
			return {
				...state,
				confirmDeleteModal: true,
			}
		case "hideConfirmDeleteModal":
			return {
				...state,
				confirmDeleteModal: false,
			}
		default:
			return state
	}
}

export default modalVisibilityReducer
