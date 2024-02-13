"use client"
import React, { useEffect, useRef, useState } from "react"
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
    const supabase: SupabaseClient = createClientComponentClient();

    // Get and set the bookmarks from the store
    const bookmarksList = bookmarksStore((state) => state.bookmarksList)
    const setBookmarksList = bookmarksStore((state) => state.setBookmarksList)

    // Get and set the session from the store
    const sessionStore: Session | null = authStore((state) => state.session)
    const setSession = authStore((state) => state.setSession)

    // Get and set the loading state
    const [loading, setLoading] = useState<boolean>(false);

    const rootFolders = useRef<BookmarkFolder[]>(null)

    // First we need to get the session and save it to the auth store
    useEffect(() => {
        const getSession = async () => {
            setLoading(true);
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

    // Get the root folders so that can be rendered first
    useEffect(() => {
        const getRootFoldersByUser = async () => {
            rootFolders.current.value = await getRootFolders(sessionStore?.user.id)
            console.log(rootFolders)
        }
        if (sessionStore) {
            getRootFoldersByUser()
        }
    }, [sessionStore])

    // In the first render, get all the bookmarks from the JSON file/DB.
    useEffect(() => {
        const getBookmarks = async () => {
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
                        bookmarksList.length > 0 && !loading ?
                            // First render the root folders and its children
                            rootFolders && (rootFolders.map((folder: BookmarkFolder) => (
                                <BookmarkFolderComponent key={folder.folder_id}>
                                    {folder}
                                </BookmarkFolderComponent>
                            )))
                            : (<p>No bookmarks found.</p>)
                    )
                }
            </main>
        </>
    )
}

export default BookmarksView
