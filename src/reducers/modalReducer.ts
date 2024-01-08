export const modalVisibility = {
  editBookmarkModal: false,
  deleteBookmarkModal: false,
  editFolderModal: false,
  deleteFolderModal: false,
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
    case "displayDeleteBookmarkModal":
      return {
        ...state,
        deleteBookmarkModal: true,
      }
    case "hideDeleteBookmarkModal":
      return {
        ...state,
        deleteBookmarkModal: false,
      }
    case "displayDeleteFolderModal":
      return {
        ...state,
        deleteFolderModal: true,
      }
    case "hideDeleteFolderModal":
      return {
        ...state,
        deleteFolderModal: false,
      }
    default: return state;
  }
}

export default modalVisibilityReducer
