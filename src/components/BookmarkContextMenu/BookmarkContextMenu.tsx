"use client"
import Image from "next/image"
import React, { useReducer } from "react"
import { Menu, Item, ItemParams, contextMenu } from "react-contexify"
import "react-contexify/ReactContexify.css"
import modalVisibilityReducer, {
	modalVisibility,
} from "@/reducers/modalReducer"

interface ItemProps {
	key: string
}

type ItemData = any

const BookmarkContextMenu = () => {
	const [state, dispatch] = useReducer(modalVisibilityReducer, modalVisibility)

	const handleItemClick = ({
		id,
		event,
		props,
		data,
		triggerEvent,
	}: ItemParams<ItemProps, ItemData>) => {
		switch (id) {
			case "edit":
				dispatch({ type: "displayEditBookmarkModal" })
				break
			case "remove":
				dispatch({ type: "displayConfirmDeleteModal" })
				break
		}
	}

	return (
		<>
			<Menu id="bookmarkMenu" animation="fade">
				<Item id="edit" onClick={handleItemClick}>
					<Image src="/edit-icon.svg" width={16} height={16} alt="Edit icon" />
					&nbsp;&nbsp;Edit
				</Item>
				<Item id="remove" onClick={handleItemClick}>
					<Image
						src="/trash-icon.svg"
						width={16}
						height={16}
						alt="Remove icon"
					/>
					&nbsp;&nbsp;Remove
				</Item>
			</Menu>
		</>
	)
}

export default BookmarkContextMenu

/* Function that displays the bookmark context menu. */
export const displayBookmarkMenu = (
	event: React.MouseEvent,
	id: string,
	props: any
) => {
	event.preventDefault()
	contextMenu.show({
		id,
		event,
		props: props.children,
	})
}
