"use client"
import React, { useEffect, useState } from "react"
import styles from "./BookmarksView.module.scss"
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent"
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import EditFolderDialog from "../Dialogs/EditFolderDialog/EditFolderDialog"
import EditBookmarkDialog from "../Dialogs/EditBookmarkDialog/EditBookmarkDialog"
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog"
import { BookmarkItem, BookmarkFolder } from "@/types/types"
import { bookmarksStore } from "@/store/bookmarksStore"
import { authStore } from "@/store/authStore"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"

const BookmarksView = () => {

	// Get and set the bookmarks from the store
	const bookmarksList = bookmarksStore((state) => state.bookmarksList)

	// Get the session from the store because it already has the session information fetched in the auth button.
	const session = authStore((state) => state.session)

	// Get and set the loading state
	const [loading, setLoading] = useState<boolean>(false);

	// Get the root folders so that can be rendered first
	useEffect(() => {
		setLoading(true);
		const getRootItems = async () => {
			await updateBookmarkList()
		}

		if (session) {
			getRootItems()
		}

		setLoading(false)
	}, [session])

	return (
		<>
			<EditBookmarkDialog title="Edit bookmark" />
			<EditFolderDialog title="Edit folder" />
			<ConfirmDeleteDialog title="Confirm deletion" />
			<main className={styles.bookmarks__view__container}>
				{loading ?
					// If not bookmarks are loaded, it shows skeleton component
					Array.from({ length: 10 }).map((_, i) => (
						<BookmarkSkeleton key={i} />
					)) :
					(
						// If there no bookmarks, it shows a simple message.
						// If there are, it renders the folders and bookmarks
						bookmarksList.length > 0 && !loading ?
							// First render the root folders and its children
							(
								// @ts-ignore
								bookmarksList.map((item: BookmarkFolder & BookmarkItem) => {
									if (item.hasOwnProperty("folder_id")) {
										return (
											<BookmarkFolderComponent key={item.folder_id}>
												{item}
											</BookmarkFolderComponent>)
									} else {
										return (<BookmarkItemComponent key={item.bookmark_id}>
											{item}
										</BookmarkItemComponent>)
									}
								}
								)
							) : (<p className={styles.bookmarks__view__paragraph}>No bookmarks found.<br />Start creating new folders and bookmarks using the buttons above.</p>)
					)
				}
			</main>
		</>
	)
}

export default BookmarksView
