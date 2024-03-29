"use client"
import Image from "next/image"
import React from "react"
import styles from "./RemoveButton.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import tooltipStyles from "@/app/tooltip.module.scss"

interface RemoveProps {
	children: {
		bookmark_id: string
		bookmark_title: string
	}
}

const RemoveButton = ({ children }: RemoveProps) => {
	const showDeleteConfirmDialog = modalStore(
		(state) => state.showDeleteConfirmModal
	)
	const setDeleteProps = modalStore((state) => state.setDeleteProps)
	const { bookmark_id, bookmark_title } = children

	const handleClick = () => {
		setDeleteProps(bookmark_id, bookmark_title, "bookmark")
		showDeleteConfirmDialog()
	}

	return (
		<button
			className={styles.remove__button}
			onClick={handleClick}
			aria-label="Remove bookmark"
		>
			<Tooltip
				anchorSelect="#remove__button"
				place="top"
				content="Delete item"
				variant="info"
				className={tooltipStyles.custom__tooltip}
			/>
			<Image width={24} height={24} src="/icons/trash-icon.svg" alt="Trash icon" priority />
		</button>
	)
}

export default RemoveButton
