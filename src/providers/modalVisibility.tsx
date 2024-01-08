"use client"

import React, { createContext } from "react"

const modalVisibility = {
	editBookmarkModal: false,
	deleteBookmarkModal: false,
	editFolderModal: false,
	deleteFolderModal: false,
}

export const modalVisibilityContext = createContext(null);

export default modalVisibilityProvider({ children }) {
	return (
		<modalVisibilityContext.Provider value={modalVisibility}>
			{children}
		</modalVisibilityContext.Provider>
	)
}
