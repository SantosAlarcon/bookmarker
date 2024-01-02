import React, { useState } from "react"
import styles from "./BookmarkFolderComponent.module.scss"
import { BookmarkItem } from "@/types/types"
import Image from "next/image"

interface BFCProps {
    children: {
        icon: string
        title: string
        description: string
        enlaces: BookmarkItem[]
    }
}

const BookmarkFolderComponent = (props: BFCProps) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div
            className={styles.bookmark__folder__container}
            title={props.children.description}
            onClick={() => setExpanded(!expanded)}
        >
            <div className={styles.bookmark__folder__mark}>
                <Image
                    width={16}
                    height={16}
                    alt="Marker"
                    src="/triangle.svg"
                    className={styles.bookmark__folder__mark__icon}
                    style={expanded && {rotate: "90deg"}}
                />
            </div>
            <div className={styles.bookmark__folder__icon}>
                {props?.children.icon ? (
                    <Image width={32} height={32} alt="Folder icon" src={props.children.icon} />
                ) : (
                    <Image width={32} height={32} alt="Folder icon" src="/folder.svg" />
                )}
            </div>
            <div className={styles.bookmark__folder__title}>
                <h4 className={styles.bookmark__folder__title__text}>{props.children.title}</h4>
            </div>
        </div>
    )
}

export default BookmarkFolderComponent
