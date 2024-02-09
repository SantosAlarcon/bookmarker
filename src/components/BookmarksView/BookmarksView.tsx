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

const BookmarksView = () => {
	const bookmarksList = bookmarksStore((state) => state.bookmarksList)
	const setBookmarksList = bookmarksStore((state) => state.setBookmarksList)
	const session = authStore((state) => state.session)
	const setSession = authStore((state) => state.setSession)
	const [loading, setLoading] = useState<boolean>(false);
	const supabase: SupabaseClient = createClientComponentClient();

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
			const response = await getAllBookmarks(session?.user?.id)
			setBookmarksList(response)
			setLoading(false)
		}

        // If there is no bookmarks in the store, fetch them.
        // It avoids the rerender when navigating to a page.
        if (bookmarksList.length === 0) {
            getBookmarks()
        }
	}, [setBookmarksList, bookmarksList, session?.user.id])

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
