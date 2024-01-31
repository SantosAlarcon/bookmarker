"use client"
import React, { useEffect, useState } from "react"
import styles from "./BookmarksView.module.scss"
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent"
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import getAllBookmarks from "@/app/lib/bookmarks/getAllBookmarks"
import EditFolderDialog from "../Dialogs/EditFolderDialog/EditFolderDialog"
import EditBookmarkDialog from "../Dialogs/EditBookmarkDialog/EditBookmarkDialog"
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog"
import { BookmarkItem, BookmarkFolder } from "@/types/types"
import { bookmarksStore } from "@/store/bookmarksStore"
import { SupabaseClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const BookmarksView = () => {
	const bookmarksList = bookmarksStore((state) => state.bookmarksList)
	const setBookmarksList = bookmarksStore((state) => state.setBookmarksList)
	const [loading, setLoading] = useState<boolean>(false);
	const [session, setSession] = useState<any>(null)
	const supabase: SupabaseClient = createClientComponentClient();

	// In the first render, get all the bookmarks from the JSON file/DB.
	useEffect(() => {
		const getBookmarks = async () => {
			setLoading(true)
			const response = await getAllBookmarks()
			setBookmarksList(response)
			setLoading(false)
		}
		getBookmarks()
	}, [setBookmarksList])

	useEffect(() => {
		const getSession = async () => {
			try {
				const { data: { session }, error } = await supabase.auth.getSession()
				setSession(session)
				if (error) {
					console.error("ERROR:", error)
				}
			} catch (error) {
				console.error("ERROR:", error)
			}
		}
		getSession()
	}, [supabase.auth])

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
						bookmarksList.length > 0 && !loading
							// @ts-ignore
							? bookmarksList.map((bookmark: BookmarkItem | BookmarkFolder) => {
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
							}) : (<p>No bookmarks found.</p>)
					)
				}
			</main>
		</>
	)
}

export default BookmarksView
