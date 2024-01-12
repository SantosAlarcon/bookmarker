"use client"
import Image from "next/image"
import React from "react"
import styles from "./EditButton.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"

interface EditFolderProps {
	children: {
		id: string
		title: string
		description: string
		children: []
	}
}

const EditFolderButton = ({ children }: EditFolderProps) => {
	const showEditFolderDialog = modalStore((state) => state.showEditFolderModal)
	const modifyEditFolderData = modalStore((state) => state.modifyEditFolderData)
	const { id, title, description } = children
	const childLinks = children.children

	const handleClick = () => {
		// @ts-ignore
		modifyEditFolderData(id, title, description, childLinks)
		showEditFolderDialog()
	}

	return (
		<button
			className={styles.edit__button}
			id="edit__folder__button"
			onClick={handleClick}
		>
			<Tooltip anchorSelect="#edit__folder__button" variant="info" content="Edit folder" />
			<Image width={24} height={24} src="/edit-icon.svg" alt="Edit icon" />
		</button>
	)
}

export default EditFolderButton
