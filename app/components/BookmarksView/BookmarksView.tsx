"use client";
import { localeStore } from "@/app/store/localeStore";
import type { BookmarkFolder, BookmarkItem } from "@/app/types/types";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import { authStore } from "@/store/authStore";
import { bookmarksStore } from "@/store/bookmarksStore";
import { filterStore } from "@/store/filterStore";
import type { Session } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import BookmarkFolderComponent from "../BookmarkFolderComponent/BookmarkFolderComponent";
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent";
import BookmarkSkeleton from "../BookmarkSkeleton/BookmarkSkeleton";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog";
import EditBookmarkDialog from "../Dialogs/EditBookmarkDialog/EditBookmarkDialog";
import EditFolderDialog from "../Dialogs/EditFolderDialog/EditFolderDialog";
import styles from "./BookmarksView.module.scss";
import NoResultsFound from "./NoResultsFound";
import NotFound from "./NotFound";

const BookmarksView = () => {
    // Get the locale from its store
    // @ts-ignore
    const lang = localeStore((state) => state.locale);

    // Load the translation function with the "common" namespace
    const { t } = useTranslation("common", { lng: lang });

    // Get and set the bookmarks from the store
    const bookmarksList = bookmarksStore((state) => state.bookmarksList);
    const allBookmarksList = bookmarksStore((state) => state.allBookmarksList);
    const setFetched = bookmarksStore((state) => state.setFetched);

    // Get the filter from the filter store
    const filter = filterStore((state) => state.filter);

    // Get the session from the store because it already has the session information fetched in the auth button.
    const session: Session | null = authStore((state) => state.session);

    // Get and set the loading state
    const [loading, setLoading] = useState<boolean>(false);

    const [filteredList, setFilteredList] = useState([...bookmarksList]);

    // Get the root folders so that can be rendered first
    useEffect(() => {
        setLoading(true);

        const getRootItems = async () => {
            await updateBookmarkList();
	    setFetched(true);
        };

        getRootItems();


        setLoading(false);
    }, [session]);

    // This will trigger when the filter updates
    useEffect(() => {
        if (filter === "" || filter === undefined) {
            setFilteredList([...bookmarksList]);
        } else {
            // @ts-ignore
            setFilteredList(
                [...allBookmarksList].filter(
                    // @ts-ignore
                    (item: BookmarkItem & BookmarkFolder) =>
                        item.bookmark_title?.toLowerCase().includes(filter) || item.folder_title?.toLowerCase().includes(filter),
                ),
            );
        }
    }, [filter, bookmarksList]);

    return (
        <>
            <EditBookmarkDialog title={t("edit-bookmark-title")} />
            <EditFolderDialog title={t("edit-folder-title")} />
            <ConfirmDeleteDialog title={t("delete-item")} />

            <main className={styles.bookmarks__view__container}>
                {filter && filteredList.length === 0 && (
                    <div className={styles.bookmarks__view__paragraph}>
                        <NoResultsFound />
                    </div>
                )}
                {loading ? (
                    // If not bookmarks are loaded, it shows skeleton component
                    Array.from({ length: 10 }).map((_, i) => <BookmarkSkeleton key={i} />)
                ) : // If there are, it renders the folders and bookmarks
                bookmarksList.length > 0 ? (
                    // First render the root folders and its children
                    <motion.ul layout initial="false" className={styles.bookmarks__view__list}>
                        {/* @ts-ignore */}
                        {filteredList?.map((item: BookmarkFolder & BookmarkItem, index) => {
                            {
                                /* If the item have the folder_id field, it renders a folder component. */
                            }
                            if (item.hasOwnProperty("folder_id")) {
                                return (
                                    <motion.li
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        key={item.folder_id}
                                    >
                                        <BookmarkFolderComponent key={item.folder_id}>{item}</BookmarkFolderComponent>
                                    </motion.li>
                                );
                            } else {
                                return (
                                    <motion.li
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        key={item.bookmark_id}
                                    >
                                        <BookmarkItemComponent key={item.bookmark_id}>{item}</BookmarkItemComponent>
                                    </motion.li>
                                );
                            }
                        })}
                    </motion.ul>
                ) : (
                    // If there not any bookmarks/folders, it shows a message of it.
                    // In case that no search ocurrences are found, it shows a message of it.
                    <div className={styles.bookmarks__view__paragraph}>{<NotFound />}</div>
                )}
            </main>
        </>
    );
};

export default BookmarksView;
