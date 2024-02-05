import React, { useRef, useState } from "react"
import styles from "./BookmarkFolderComponent.module.scss"
import { BookmarkItem, BookmarkFolder } from "@/types/types"
import Image from "next/image"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import EditFolderButton from "../Buttons/EditFolderButton/EditFolderButton"
import RemoveFolderButton from "../Buttons/RemoveFolderButton/RemoveFolder"
import { motion } from "framer-motion"

interface BFCProps {
    children: {
        id: string
        title: string
        description: string
        children: []
    }
}

const BookmarkFolderComponent = (props: BFCProps) => {
    const [expanded, setExpanded] = useState(false)
    const collapsibleRef = useRef<HTMLUListElement>(null)

    const variants = {
        hidden: { height: 0, padding: 0, paddingLeft: "2rem" },
        show: {
            height: collapsibleRef.current?.scrollHeight + "px",
            padding: 0, paddingLeft: "2rem",
        },
    }

    return (
        <div className={styles.bookmark__folder__container}>
            <div className={styles.bookmark__folder__main}>
                <div className={styles.bookmark__folder__mark}>
                    <Image
                        width={16}
                        height={16}
                        alt="Marker"
                        src="/icons/triangle.svg"
                        className={styles.bookmark__folder__mark__icon}
                        style={expanded ? { rotate: "90deg" } : { rotate: "0deg" }}
                    />
                </div>
                <div className={styles.bookmark__folder__icon}>
                    <Image width={24} height={24} alt="Folder icon" src="/icons/folder.svg" />
                </div>
                <div
                    className={styles.bookmark__folder__title}
                    title={props.children.description}
                    onClick={() => setExpanded(!expanded)}
                >
                    <h4 className={styles.bookmark__folder__title__text}>
                        {props.children.title}
                    </h4>
                </div>
                <EditFolderButton>{props.children}</EditFolderButton>
                <RemoveFolderButton>{props.children}</RemoveFolderButton>
            </div>

            {props.children.children?.length > 0 && (
                <motion.ul
                    className={styles.bookmark__folder__links}
                    ref={collapsibleRef}
                    initial="hidden"
                    animate={expanded ? "show" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.3, type: "tween" }}
                >
                    {props.children?.children.map(
                        (child: BookmarkFolder | BookmarkItem) => {
                            {
                                /* If the child item has "children" property, it is considered as a folder */
                            }
                            if ("children" in child) {
                                return (
                                    <li
                                        key={child.id}
                                        className={styles.bookmark__folder__links__link}
                                    >
                                        <BookmarkFolderComponent key={child.id}>
                                            {child}
                                        </BookmarkFolderComponent>
                                    </li>
                                )
                            } else {
                                return (
                                    <li
                                        key={child.id}
                                        className={styles.bookmark__folder__links__link}
                                    >
                                        <BookmarkItemComponent key={child.id}>
                                            {child}
                                        </BookmarkItemComponent>
                                    </li>
                                )
                            }
                        }
                    )}
                </motion.ul>
            )}
        </div>
    )
}

export default BookmarkFolderComponent
