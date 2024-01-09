"use client"

import React, { createContext } from "react"

const modalVisibility = {
	editBookmarkModal: false,
	confirmDeleteModal: false,
	editFolderModal: false,
}

export const ModalVisibilityContext = createContext(modalVisibility);

const ModalVisibilityProvider = ({ children }) => {
	return (
		<ModalVisibilityContext.Provider value={modalVisibility}>
			{children}
		</ModalVisibilityContext.Provider>
	)
}

export default ModalVisibilityProvider;
