"use client"
import Image from "next/image"
import React from "react"
import styles from "./EditButton.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import tooltipStyles from "@/app/tooltip.module.scss"

interface EditFolderProps {
	children: {
		folder_id: string
		folder_title: string
		folder_description: string
		children: []
	}
}

const EditFolderButton = ({ children }: EditFolderProps) => {
	const showEditFolderDialog = modalStore((state) => state.showEditFolderModal)
	const modifyEditFolderData = modalStore((state) => state.modifyEditFolderData)
	const { folder_id, folder_title, folder_description } = children
	const childLinks = children.children


	const handleClick = () => {
		// @ts-ignore
		modifyEditFolderData(folder_id, folder_title, folder_description, childLinks)
		showEditFolderDialog()
	}

	return (
		<button
			className={styles.edit__button}
			id="edit__folder__button"
			onClick={() => handleClick()}
            aria-label="Edit folder"
		>
			<Tooltip anchorSelect="#edit__folder__button" variant="info" className={tooltipStyles.custom__tooltip} content="Edit folder" />
			<Image width={24} height={24} src="/icons/edit-icon.svg" alt="Edit icon" priority />
		</button>
	)
}

export default EditFolderButton
