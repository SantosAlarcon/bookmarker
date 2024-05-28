"use client"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { authStore } from "@/store/authStore"
import { bookmarksStore } from "@/store/bookmarksStore"
import type { BookmarkFolder, BookmarkItem } from "@/types/types"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton"
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog"
import EditBookmarkDialog from "../Dialogs/EditBookmarkDialog/EditBookmarkDialog"
import EditFolderDialog from "../Dialogs/EditFolderDialog/EditFolderDialog"
import styles from "./BookmarksView.module.scss"

const BookmarksView = () => {
	// Get and set the bookmarks from the store
	const bookmarksList = bookmarksStore((state) => state.bookmarksList)

	// Get the session from the store because it already has the session information fetched in the auth button.
	const session = authStore((state) => state.session)

	// Get and set the loading state
	const [loading, setLoading] = useState<boolean>(false)

	// Get the root folders so that can be rendered first
	useEffect(() => {
		setLoading(true)
		const getRootItems = async () => {
			await updateBookmarkList()
		}

		// It there is a session, call the root items function
		if (session) {
			getRootItems()
		}

		setLoading(false)
	}, [session])

    // Load the translation function with the "common" namespace
	const { t } = useTranslation("common")

	return (
		<>
			<EditBookmarkDialog title={t("edit-bookmark-title")} />
			<EditFolderDialog title={t("edit-folder-title")} />
			<ConfirmDeleteDialog title={t("delete-item")} />
			<main className={styles.bookmarks__view__container}>
				{loading ? (
					// If not bookmarks are loaded, it shows skeleton component
					Array.from({ length: 10 }).map((_, i) => <BookmarkSkeleton key={i} />)
				) : // If there no bookmarks, it shows a simple message.
					// If there are, it renders the folders and bookmarks
					bookmarksList.length > 0 && !loading ? (
						// First render the root folders and its children
						<motion.ul layout initial="false" className={styles.bookmarks__view__list}>
							{/* @ts-ignore*/}
							{bookmarksList.map((item: BookmarkFolder & BookmarkItem, index) => {
								{
									/* If the item have the folder_id field, it renders a folder component. */
								}
								if (item.hasOwnProperty("folder_id")) {
									return (
										<motion.li
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ scale: 0 }}
											transition={{ delay: 0.1 * index }}
											key={item.folder_id}
										>
											<BookmarkFolderComponent key={item.folder_id}>
												{item}
											</BookmarkFolderComponent>
										</motion.li>
									)
								} else {
									return (
										<motion.li
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ scale: 0 }}
											transition={{ delay: 0.1 * index }}
											key={item.bookmark_id}
										>
											<BookmarkItemComponent key={item.bookmark_id}>
												{item}
											</BookmarkItemComponent>
										</motion.li>
									)
								}
							})}
						</motion.ul>
					) : (
						<div className={styles.bookmarks__view__paragraph}>
							<h1>{t("no-bookmarks-title")}</h1> {t("no-bookmarks-text")}
						</div>
					)}
			</main>
		</>
	)
}

export default BookmarksView
