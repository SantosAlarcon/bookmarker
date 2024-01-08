"use client"
import React, { useState, useEffect, Suspense } from "react"
import styles from "./BookmarksView.module.scss"
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent"
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import getAllBookmarks from "@/lib/bookmarks/getAllBookmarks"
import EditFolderDialog from "../EditFolderDialog/EditFolderDialog"
import EditBookmarkDialog from "../EditBookmarkDialog/EditBookmarkDialog"

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
			<main className={styles.bookmarks__view__container}>
				{bookmarks
					? bookmarks.map((bookmark) => {
						if ("children" in bookmark) {
							// Si tiene la clave 'children', es tratado como una carpeta.
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
			<EditBookmarkDialog title="Edit bookmark" open={false} />
			<EditFolderDialog title="Edit folder" open={false} />
		</>
	)
}

export default BookmarksView
