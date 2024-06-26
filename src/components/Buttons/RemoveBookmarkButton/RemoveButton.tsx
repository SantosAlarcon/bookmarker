"use client"
import { modalStore } from "@/store/modalStore"
import Image from "next/image"
import { Tooltip } from "react-tooltip"
import styles from "./RemoveButton.module.scss"
import "react-tooltip/dist/react-tooltip.css"
import tooltipStyles from "@/styles/tooltip.module.scss"
import { useTranslation } from "next-i18next"

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
    const {t} = useTranslation("common");

	const handleClick = () => {
		setDeleteProps(bookmark_id, bookmark_title, "bookmark")
		showDeleteConfirmDialog()
	}

	return (
		<button
			className={styles.remove__button}
			onClick={handleClick}
			aria-label={t("delete-bookmark")}
            type="button"
            id="remove__bookmark__button"
		>
			<Tooltip
				anchorSelect="#remove__bookmark__button"
				place="top"
				content={t("delete-bookmark")}
				variant="info"
				className={tooltipStyles.custom__tooltip}
			/>
			<Image width={24} height={24} src="/icons/trash-icon.svg" alt="Trash icon" priority />
		</button>
	)
}

export default RemoveButton
