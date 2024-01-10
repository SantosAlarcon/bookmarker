"use client"
import React, { useState, useEffect} from "react"
import styles from "./BookmarksView.module.scss"
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent"
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import getAllBookmarks from "@/lib/bookmarks/getAllBookmarks"
import EditFolderDialog from "../Dialogs/EditFolderDialog/EditFolderDialog"
import EditBookmarkDialog from "../Dialogs/EditBookmarkDialog/EditBookmarkDialog"
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog"
import { BookmarkItem, BookmarkFolder } from "@/types/types"

const BookmarksView = () => {
	const [bookmarks, setBookmarks] = useState(null)

	const getBookmarks = async () => {
		const response = await getAllBookmarks()
		setBookmarks(response)
	}

	useEffect(() => {
		getBookmarks()
	}, [])

	return (
		<>
			<EditBookmarkDialog title="Edit bookmark" />
			<EditFolderDialog title="Edit folder" />
			<ConfirmDeleteDialog title="Confirm deletion" />
			<main className={styles.bookmarks__view__container}>
				{bookmarks
					? bookmarks.map((bookmark: BookmarkItem | BookmarkFolder) => {
						if ("children" in bookmark) {
							// If the item contains the "children" key, it is treated as a folder
							return (
								<BookmarkFolderComponent key={bookmark.id}>
									{bookmark}
								</BookmarkFolderComponent>
							)
						} else {
							return (
								<BookmarkItemComponent key={bookmark.id}>
									{bookmark}
								</BookmarkItemComponent>
							)
						}
					})
					: // If not bookmarks are loaded, it shows skeleton component
					Array.from({ length: 10 }).map((_, i) => (
						<BookmarkSkeleton key={i} />
					))}
			</main>
		</>
	)
}

export default BookmarksView
