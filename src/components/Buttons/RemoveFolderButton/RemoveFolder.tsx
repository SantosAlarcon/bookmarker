"use client"
import Image from "next/image"
import React from "react"
import styles from "./RemoveFolder.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import tooltipStyles from "@/app/tooltip.module.scss"

interface RemoveProps {
	children: {
		id: string
		title: string
	}
}

const RemoveFolderButton = ({ children }: RemoveProps) => {
	const showDeleteConfirmDialog = modalStore(
		(state) => state.showDeleteConfirmModal
	)
	const setDeleteProps = modalStore((state) => state.setDeleteProps)
	const { id, title } = children

	const handleClick = () => {
		setDeleteProps(id, title, "folder")
		showDeleteConfirmDialog()
	}

	return (
		<button
			className={styles.remove__button}
			id="remove__button"
            aria-label="Remove folder"
			onClick={handleClick}
		>
			<Tooltip
				anchorSelect="#remove__button"
				place="top"
				content="Delete folder"
				variant="info"
				className={tooltipStyles.custom__tooltip}
			/>
			<Image width={24} height={24} src="/trash-icon.svg" alt="Trash icon" />
		</button>
	)
}

export default RemoveFolderButton
