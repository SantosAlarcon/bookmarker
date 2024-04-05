"use client"
import React from "react"
import Image from "next/image"
import NewBookmarkDialog from "../Dialogs/NewBookmarkDialog/NewBookmarkDialog"
import NewFolderDialog from "../Dialogs/NewFolderDialog/NewFolderDialog"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import styles from "./Header.module.scss"
import tooltipStyles from "@/app/tooltip.module.scss"
import { useRouter } from "next/navigation"
import AuthButton from "../Buttons/AuthButton/AuthButton"
import UserContextMenu from "./UserContextMenu"
import useTranslation from "next-translate/useTranslation"

const Header = () => {
	const showNewBookmarkModal = modalStore((state) => state.showNewBookmarkModal)
	const showNewFolderModal = modalStore((state) => state.showNewFolderModal)
	const {t} = useTranslation()

	const router = useRouter()

	const handleNewBookmark = async () => {
		showNewBookmarkModal()
	}
	const handleNewFolder = async () => {
		showNewFolderModal()
	}

	return (
		<>
			<NewBookmarkDialog title={t("common:new-bookmark-title")}></NewBookmarkDialog>
			<NewFolderDialog title={t("common:new-folder-title")}></NewFolderDialog>
			<UserContextMenu />
			<header className={styles.header__container}>
				<div className={styles.header__logo} onClick={() => router.push("/")}>
					<Image
						src="/BookmarkerLogo.svg"
						width="128"
						height="128"
						alt="Logo"
						priority
						className={styles.header__logo_img}
					/>
				</div>
				<div className={styles.header__links}>
					<div className={styles.header__links__new__boomark}>
						<button
							onClick={handleNewBookmark}
							className={styles.header__links__button}
							id="new-bookmark-tooltip"
							aria-label={t("header:new-bookmark-tooltip")}
						>
							<Tooltip
								anchorSelect="#new-bookmark-tooltip"
								place="bottom"
								variant="info"
								className={tooltipStyles.custom__tooltip}
								content={t("header:new-bookmark-tooltip")}
							/>
							<Image
								width={32}
								height={32}
								src="/icons/add-bookmark-icon.svg"
								alt="New bookmark icon"
								priority
							/>
						</button>
					</div>
					<div className={styles.header__links__new__folder}>
						<button
							onClick={handleNewFolder}
							className={styles.header__links__button}
							id="new-folder-tooltip"
							aria-label={t("header:new-folder-tooltip")}
						>
							<Tooltip
								anchorSelect="#new-folder-tooltip"
								place="bottom"
								variant="info"
								className={tooltipStyles.custom__tooltip}
								content={t("header:new-folder-tooltip")}
							/>
							<Image
								width={32}
								height={32}
								src="/icons/add-folder-icon.svg"
								alt="New folder icon"
								priority
							/>
						</button>
					</div>
					<AuthButton />
				</div>
			</header>
		</>
	)
}

export default Header
