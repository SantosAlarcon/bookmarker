"use client"
import React from "react"
import Image from "next/image"
import NewBookmarkDialog from "../Dialogs/NewBookmarkDialog/NewBookmarkDialog"
import NewFolderDialog from "../Dialogs/NewFolderDialog/NewFolderDialog"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import styles from "./Header.module.scss"
import tooltipStyles from "@/app/tooltip.module.scss"

const Header = () => {
	const showNewBookmarkModal = modalStore((state) => state.showNewBookmarkModal)
	const showNewFolderModal = modalStore((state) => state.showNewFolderModal)

	const handleNewBookmark = async () => {
		showNewBookmarkModal()
	}
	const handleNewFolder = async () => {
		showNewFolderModal()
	}
	return (
		<>
			<NewBookmarkDialog title="New bookmark"></NewBookmarkDialog>
			<NewFolderDialog title="New Folder"></NewFolderDialog>
			<header className={styles.header__container}>
				<div className={styles.header__logo}>
					<Image
						src="/BookmarkerLogo.svg"
						width="128"
						height="128"
						alt="Logo"
						priority={true}
						className={styles.header__logo_img}
					/>
				</div>
				<div className={styles.header__links}>
					<div className={styles.header__links__new__boomark}>
						<button
							onClick={handleNewBookmark}
							className={styles.header__links__button}
							id="new-bookmark-tooltip"
							aria-label="New Bookmark"
						>
							<Tooltip
								anchorSelect="#new-bookmark-tooltip"
								place="bottom"
								variant="info"
								className={tooltipStyles.custom__tooltip}
								content="New bookmark"
							/>
							<Image
								width={40}
								height={40}
								src="/add-bookmark-icon.svg"
								alt="New bookmark icon"
							/>
						</button>
					</div>
					<div className={styles.header__links__new__folder}>
						<button
							onClick={handleNewFolder}
							className={styles.header__links__button}
							id="new-folder-tooltip"
							aria-label="New Folder"
						>
							<Tooltip
								anchorSelect="#new-folder-tooltip"
								place="bottom"
								variant="info"
								className={tooltipStyles.custom__tooltip}
								content="New folder"
							/>
							<Image
								width={40}
								height={40}
								src="/add-folder-icon.svg"
								alt="New folder icon"
							/>
						</button>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
