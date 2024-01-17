"use client"
import Image from "next/image"
import React from "react"
import styles from "./EditButton.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import tooltipStyles from "@/app/tooltip.module.scss"

interface EditBookmarkProps {
	children: {
		id: string
		title: string
		url: string
		parentFolder: string | null
	}
}

const EditBookmarkButton = ({ children }: EditBookmarkProps) => {
	const showEditBookmarkDialog = modalStore(
		(state) => state.showEditBookmarkModal
	)
	const modifyEditBookmarkData = modalStore(
		(state) => state.modifyEditBookmarkData
	)
	const { id, title, url, parentFolder } = children

	const handleClick = () => {
		modifyEditBookmarkData(id, title, url, parentFolder)
		showEditBookmarkDialog()
	}

	return (
		<button
			className={styles.edit__button}
			id="edit__bookmark__button"
			onClick={handleClick}
            aria-label="Edit bookmark"
		>
			<Tooltip
				anchorSelect="#edit__bookmark__button"
				variant="info"
				content="Edit bookmark"
				className={tooltipStyles.custom__tooltip}
			/>
			<Image width={24} height={24} src="/edit-icon.svg" alt="Edit icon" />
		</button>
	)
}

export default EditBookmarkButton
