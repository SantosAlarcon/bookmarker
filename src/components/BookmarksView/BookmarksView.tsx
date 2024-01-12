"use client"
import React, { useEffect } from "react"
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

const BookmarksView = () => {
    const bookmarksList = bookmarksStore((state) => state.bookmarksList)
    const setBookmarksList = bookmarksStore((state) => state.setBookmarksList)


    // In the first render, get all the bookmarks from the JSON file/DB.
    useEffect(() => {
	const getBookmarks = async () => {
	    const response = await getAllBookmarks()
	    setBookmarksList(response)
	}
        getBookmarks()
    }, [setBookmarksList])

    return (
        <>
            <EditBookmarkDialog title="Edit bookmark" />
            <EditFolderDialog title="Edit folder" />
            <ConfirmDeleteDialog title="Confirm deletion" />
            <main className={styles.bookmarks__view__container}>
                {bookmarksList.length > 0
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
