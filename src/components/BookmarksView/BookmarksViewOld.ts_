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
import { Session, SupabaseClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import getAllBookmarks from "@/app/utils/supabase/bookmarks/getAllBookmarks"
import { authStore } from "@/store/authStore"
import { getRootFolders } from "@/app/utils/supabase/folders/getRootFolders"

const BookmarksView = () => {
	// Get and set the bookmarks from the store
	const bookmarksList = bookmarksStore((state) => state.bookmarksList)
	const setBookmarksList = bookmarksStore((state) => state.setBookmarksList)
	
	// Get and set the session from the store
	const session: Session | null = authStore((state) => state.session)
	const setSession = authStore((state) => state.setSession)

	// Get and set the loading state
	const [loading, setLoading] = useState<boolean>(false);

	const supabase: SupabaseClient = createClientComponentClient();


	const rootFolders = await getRootFolders(session?.user?.id)

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
	}, [supabase.auth, setSession])

	// In the first render, get all the bookmarks from the JSON file/DB.
	useEffect(() => {
		const getBookmarks = async () => {
			setLoading(true)
			// @ts-ignore
			const response = await getAllBookmarks(session?.user?.id);
			setBookmarksList(response)
			setLoading(false)
		}

		// If there is no bookmarks in the store, fetch them.
		// It avoids the rerender when navigating to a page.
		if (bookmarksList.length === 0) {
			getBookmarks()
		}
	}, [setBookmarksList, bookmarksList, session?.user?.id])

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
						bookmarksList.length > 0 && !loading
							// First render the root folders and its children
							? rootFolders.map((folder: BookmarkFolder) => {
								return (
									<BookmarkFolderComponent key={folder.folder_id}>
										{folder}
									</BookmarkFolderComponent>
								)
							})

							    /*bookmarksList.map((bookmark: BookmarkItem & BookmarkFolder) => {
								// If the item contains the "children" key, it is treated as a folder
								if ("children" in bookmark) {
									// It renders the top level folders
									if (bookmark.bookmark_parentFolder === null) {
										console.log(bookmark);
										return (
											<BookmarkFolderComponent key={bookmark.folder_id}>
												{bookmark}
											</BookmarkFolderComponent>
										)
									}
								} else {
									return (
										<BookmarkItemComponent key={bookmark.bookmark_id}>
											{bookmark}
										</BookmarkItemComponent>
									)
								}*/
							}) : (<p>No bookmarks found.</p>)
					)
				}
			</main>
		</>
	)
}

export default BookmarksView
