import type { BookmarkFolder, BookmarkItem } from "@/app/types/types";
import { bookmarksStore } from "@/store/bookmarksStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent";
import EditFolderButton from "../Buttons/EditFolderButton/EditFolderButton";
import RemoveFolderButton from "../Buttons/RemoveFolderButton/RemoveFolder";
import styles from "./BookmarkFolderComponent.module.scss";

interface BFCProps {
    children: {
        folder_id: string;
        folder_title: string;
        folder_description: string;
        folder_parentfolder: string | null;
    };
}

// Hoisted so the object reference is stable across renders
const variants = {
    hidden: { height: 0, padding: 0, paddingLeft: "2rem" },
    show: {
        height: "auto",
        padding: 0,
        paddingLeft: "2rem",
    },
};

const BookmarkFolderComponent = (props: BFCProps) => {
    const allItems = bookmarksStore((state) => state.allBookmarksList);

    const [expanded, setExpanded] = useState(false);

    // Children are derived from the store — no per-folder queries.
    // The store already holds every folder and bookmark of the user.
    const children = useMemo<(BookmarkFolder & BookmarkItem)[]>(() => {
        // @ts-ignore
        const childFolders = allItems.filter(
            // @ts-ignore
            (item: BookmarkFolder) =>
                item.folder_parentfolder === props.children.folder_id,
        );
        // @ts-ignore
        const childBookmarks = allItems.filter(
            // @ts-ignore
            (item: BookmarkItem) =>
                item.bookmark_parentfolder === props.children.folder_id,
        );
        return [...childFolders, ...childBookmarks] as (BookmarkFolder &
            BookmarkItem)[];
    }, [allItems, props.children.folder_id]);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={styles.bookmark__folder__container}>
            <div className={styles.bookmark__folder__main}>
                {children.length > 0 && (
                    <Image
                        width={10}
                        height={10}
                        alt=""
                        src="/icons/triangle.svg"
                        className={styles.bookmark__folder__mark__icon}
                        style={
                            expanded ? { rotate: "90deg" } : { rotate: "0deg" }
                        }
                    />
                )}
                {expanded ? (
                    <Image
                        width={24}
                        height={24}
                        alt=""
                        src="/icons/folder-open.svg"
                    />
                ) : (
                    <Image
                        width={24}
                        height={24}
                        alt=""
                        src="/icons/folder.svg"
                    />
                )}
                <button
                    className={styles.bookmark__folder__title}
                    title={props.children.folder_description}
                    onClick={handleExpand}
                    aria-expanded={expanded}
                    aria-controls={`folder-children-${props.children.folder_id}`}
                >
                    <span className={styles.bookmark__folder__title__text}>
                        {props.children.folder_title}
                    </span>
                </button>
                <EditFolderButton>{props.children}</EditFolderButton>
                <RemoveFolderButton>{props.children}</RemoveFolderButton>
            </div>

            {children.length > 0 && (
                <motion.ul
                    id={`folder-children-${props.children.folder_id}`}
                    className={styles.bookmark__folder__links}
                    initial="hidden"
                    animate={expanded ? "show" : "hidden"}
                    inert={expanded ? false : true}
                    variants={variants}
                    transition={{ duration: 0.3, type: "tween" }}
                >
                    {children.map((child: BookmarkFolder & BookmarkItem) => {
                        {
                            /* If the child item has a "folder_id" key, it is considered as a folder */
                        }
                        if (child.hasOwnProperty("folder_id")) {
                            return (
                                <motion.li
                                    key={child.folder_id}
                                    className={
                                        styles.bookmark__folder__links__link
                                    }
                                >
                                    <BookmarkFolderComponent
                                        key={child.folder_id}
                                    >
                                        {child}
                                    </BookmarkFolderComponent>
                                </motion.li>
                            );
                        } else {
                            return (
                                <motion.li
                                    key={child.bookmark_id}
                                    className={
                                        styles.bookmark__folder__links__link
                                    }
                                >
                                    <BookmarkItemComponent
                                        key={child.bookmark_id}
                                    >
                                        {child}
                                    </BookmarkItemComponent>
                                </motion.li>
                            );
                        }
                    })}
                </motion.ul>
            )}
        </div>
    );
};

export default BookmarkFolderComponent;
