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
import { createClient } from "@/app/utils/supabase/client"
import { getSession } from "@/app/utils/supabase/getSession"

const BookmarksView = () => {

	// Get and set the bookmarks from the store
	const bookmarksList = bookmarksStore((state) => state.bookmarksList)
	const setBookmarksList = bookmarksStore((state) => state.setBookmarksList)

	// Get the session from the store because it already has the session information fetched in the auth button.
	const session = authStore((state) => state.session)

	// Get and set the loading state
	const [loading, setLoading] = useState<boolean>(false);

    // 2. Get the root folders so that can be rendered first
	useEffect(() => {
		setLoading(true);
		const getRootFoldersByUser = async () => {
			// @ts-ignore
			const rootFolders = await getRootFolders(session?.user.id)
			setBookmarksList(rootFolders)
		}
		
        if (session) {
			getRootFoldersByUser()
		}

		setLoading(false)
	}, [session, setBookmarksList])

	// In the first render, get all the bookmarks from the JSON file/DB.
	/*useEffect(() => {
		const getBookmarks = async () => {
			// @ts-ignore
			const response = await getAllBookmarks(sessionValue?.user?.id);
			const newBookmarkList = [...bookmarksList, response]
			setBookmarksList(newBookmarkList)
			setLoading(false)
		}

		// If there is no bookmarks in the store, fetch them.
		// It avoids the rerender when navigating to a page.
		if (bookmarksList.length === 0) {
			getBookmarks()
		}
	}, [setBookmarksList, bookmarksList, sessionValue?.user?.id])*/

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
								bookmarksList.map((folder: BookmarkFolder) => (
									<BookmarkFolderComponent key={folder.folder_id}>
										{folder}
									</BookmarkFolderComponent>
								))
							) : (<p className={styles.bookmarks__view__paragraph}>No bookmarks found.<br/>Start creating new folders and bookmarks using the buttons above.</p>)
					)
				}
			</main>
		</>
	)
}

export default BookmarksView
