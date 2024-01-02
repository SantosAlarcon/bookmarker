"use client"
import React, { useState, useEffect, Suspense } from 'react'
import styles from './BookmarksView.module.css'
import { type BookmarkItem, type BookmarkFolder } from '@/types/types'
import BookmarkFolderComponent from '../BookmarkFolderComponent/BookmarkFolderComponent'

const BookmarksView = () => {
    const [bookmarks, setBookmarks] = useState([]);

    const getBookmarks = async () => {
		const response = await fetch("/api/bookmarks");
		const data = await response.json();
		setBookmarks(data);
    }

    useEffect(() => {
	   getBookmarks(); 
    }, [])

  return (
    <main className={styles.bookmarks__view__container}>
            {bookmarks.map((bookmark: BookmarkFolder) => {
                if (bookmark?.links) {
                    return <BookmarkFolderComponent key={bookmark.id}>{bookmark}</BookmarkFolderComponent>
                }
            })}
    </main>
  )
}

export default BookmarksView
