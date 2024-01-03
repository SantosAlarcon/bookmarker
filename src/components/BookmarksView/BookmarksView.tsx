"use client";
import React, { useState, useEffect, Suspense } from "react";
import styles from "./BookmarksView.module.scss";
import { type BookmarkFolder } from "@/types/types";
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent";
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton";
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent";

const BookmarksView = () => {
	const [bookmarks, setBookmarks] = useState(null);

	const getBookmarks = async () => {
		const response = await fetch("/api/bookmarks");
		const data = await response.json();
		setBookmarks(data);
	};

	useEffect(() => {
		getBookmarks();
	}, []);

	return (
		<main className={styles.bookmarks__view__container}>
			{bookmarks ? (
				bookmarks.map((bookmark) => {
					if (bookmark?.links) {
						return (
							<BookmarkFolderComponent key={bookmark.id}>
								{bookmark}
							</BookmarkFolderComponent>
						);
					} else {
                        return (
                            <BookmarkItemComponent key={bookmark.id}>
                                {bookmark}
                            </BookmarkItemComponent>
                        )
                    }
				})
			) : // If not bookmarks are loaded, it shows skeleton component
				Array.from({length: 10}).map((_, i) => <BookmarkSkeleton key={i} />)
			}
		</main>
	);
};

export default BookmarksView;
