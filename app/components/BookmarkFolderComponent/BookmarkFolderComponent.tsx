import type { BookmarkFolder, BookmarkItem } from "@/app/types/types";
import getChildrenBookmarks from "@/app/utils/supabase/bookmarks/getChildrenBookmarks";
import { getChildrenFolders } from "@/app/utils/supabase/folders/getChildrenFolders";
import { bookmarksStore } from "@/store/bookmarksStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const BookmarkFolderComponent = (props: BFCProps) => {
    const bookmarkList = bookmarksStore((state) => state.bookmarksList);

    const collapsibleRef = useRef<HTMLUListElement>(null);

    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState([]);

    const variants = {
        hidden: { height: 0, padding: 0, paddingLeft: "2rem" },
        show: {
            height: "auto",
            padding: 0,
            paddingLeft: "2rem",
        },
    };

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    // Get the children bookmarks and folders
    useEffect(() => {
        const getChildren = async () => {
            // Get the children folders and bookmarks
            const [childrenFolders, childrenBookmarks] = await Promise.all([
                getChildrenFolders(props.children.folder_id),
                getChildrenBookmarks(props.children.folder_id),
            ]);
            let childrenList = [];

            // If there any child folders, it renders them first and then the children bookmarks
            if (childrenFolders.length > 0) {
                // First we need to assign the children folder list to the children list
                childrenList = childrenFolders;

                // Iterates every folder
                // @ts-ignore
                childrenList.map((folder: BookmarkFolder) => {
                    // Iterates every child bookmark
                    // @ts-ignore
                    childrenBookmarks.map((bookmark: BookmarkItem) => {
                        // If the bookmark belongs to this parent folder, it pushes to the children array
                        if (
                            bookmark.bookmark_parentfolder === folder.folder_id
                        ) {
                            // @ts-ignore
                            folder.folder_children.push(bookmark);
                        }
                    });
                });

                // After rendering the children folder, render the children bookmarks
                // @ts-ignore
                setChildren([...childrenList, ...childrenBookmarks]);
            } else {
                // @ts-ignore
                // The children bookmarks are set in the children where there is any children folder
                setChildren(childrenBookmarks);
            }
        };
        getChildren();
    }, [bookmarkList, props.children.folder_id]);

    return (
        <div className={styles.bookmark__folder__container}>
            <div className={styles.bookmark__folder__main}>
                {children.length > 0 && (
                    <Image
                        width={10}
                        height={10}
                        alt="Marker"
                        src="/icons/triangle.svg"
                        className={styles.bookmark__folder__mark__icon}
                        style={
                            expanded ? { rotate: "90deg" } : { rotate: "0deg" }
                        }
                        priority={true}
                    />
                )}
                {expanded ? (
                    <Image
                        width={24}
                        height={24}
                        alt="Folder icon"
                        src="/icons/folder-open.svg"
                        priority={true}
                    />
                ) : (
                    <Image
                        width={24}
                        height={24}
                        alt="Folder icon"
                        src="/icons/folder.svg"
                        priority={true}
                    />
                )}
                <button
                    className={styles.bookmark__folder__title}
                    title={props.children.folder_description}
                    onClick={handleExpand}
                    aria-label={props.children.folder_title}
                >
                    <h4 className={styles.bookmark__folder__title__text}>
                        {props.children.folder_title}
                    </h4>
                </button>
                <EditFolderButton>{props.children}</EditFolderButton>
                <RemoveFolderButton>{props.children}</RemoveFolderButton>
            </div>

            {children.length > 0 && (
                <motion.ul
                    className={styles.bookmark__folder__links}
                    ref={collapsibleRef}
                    initial="hidden"
                    animate={expanded ? "show" : "hidden"}
                    inert={expanded ? false : true}
                    layout
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
                                    exit={{ scale: 0 }}
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
                                    exit={{ scale: 0 }}
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
