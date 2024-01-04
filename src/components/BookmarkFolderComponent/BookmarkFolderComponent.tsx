import React, { useState } from "react"
import styles from "./BookmarkFolderComponent.module.scss"
import { BookmarkItem } from "@/types/types"
import Image from "next/image"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"

interface BFCProps {
    children: {
        icon: string,
        title: string,
        description: string, links: BookmarkItem[]
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
	    <details open={expanded}>
		<summary>
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
		</summary>

		{/* Render links */}
		{props?.children.links && (
		    <div className={styles.bookmark__folder__links}>
			{props.children.links.map((link: BookmarkItem) => (
			    <BookmarkItemComponent key={link.id}>{link}</BookmarkItemComponent>
			))}
		    </div>
		)}
	    </details>
	</div>
    )
}

export default BookmarkFolderComponent
