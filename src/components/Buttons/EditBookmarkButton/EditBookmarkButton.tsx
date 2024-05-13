"use client"
import Image from "next/image"
import React from "react"
import styles from "./EditButton.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import tooltipStyles from "@/app/tooltip.module.scss"
import { useTranslation } from "next-i18next"

interface EditBookmarkProps {
	children: {
		bookmark_id: string
		bookmark_title: string
		bookmark_url: string
		bookmark_parentfolder: string | null
	}
}

const EditBookmarkButton = ({ children }: EditBookmarkProps) => {
	const showEditBookmarkDialog = modalStore(
		(state) => state.showEditBookmarkModal
	)
	const modifyEditBookmarkData = modalStore(
		(state) => state.modifyEditBookmarkData
	)
	const { bookmark_id, bookmark_title, bookmark_url, bookmark_parentfolder } = children

	const handleClick = () => {
		modifyEditBookmarkData(bookmark_id, bookmark_title, bookmark_url, bookmark_parentfolder)
		showEditBookmarkDialog()
	}

    const {t} = useTranslation("common")

	return (
		<button
			className={styles.edit__button}
			onClick={handleClick}
			aria-label={t("edit-bookmark-title")}
		>
			<Tooltip
				anchorSelect="#edit__bookmark__button"
				variant="info"
				content={t("edit-bookmark-tooltip")}
				className={tooltipStyles.custom__tooltip}
			/>
			<Image width={24} height={24} src="/icons/edit-icon.svg" alt="Edit icon" priority={true} />
		</button>
	)
}

export default EditBookmarkButton
