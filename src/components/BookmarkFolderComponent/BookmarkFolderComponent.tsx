import React, { useEffect, useRef, useState } from "react"
import styles from "./BookmarkFolderComponent.module.scss"
import { BookmarkItem, BookmarkFolder } from "@/types/types"
import Image from "next/image"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import EditFolderButton from "../Buttons/EditFolderButton/EditFolderButton"
import RemoveFolderButton from "../Buttons/RemoveFolderButton/RemoveFolder"
import { motion } from "framer-motion"
import { getChildrenFolders } from "@/app/utils/supabase/folders/getChildrenFolders"
import getChildrenBookmarks from "@/app/utils/supabase/bookmarks/getChildrenBookmarks"
import { bookmarksStore } from "@/store/bookmarksStore"

interface BFCProps {
	children: {
		folder_id: string
		folder_title: string
		folder_description: string
	}
}

const BookmarkFolderComponent = (props: BFCProps) => {
	const [expanded, setExpanded] = useState(false)
	const collapsibleRef = useRef<HTMLUListElement>(null)
	const [children, setChildren] = useState([])
	const bookmarkList = bookmarksStore((state) => state.bookmarksList)

	const variants = {
		hidden: { height: 0, padding: 0, paddingLeft: "2rem" },
		show: {
			height: collapsibleRef.current?.scrollHeight + "px",
			padding: 0, paddingLeft: "2rem",
		},
	}

	// Get the children bookmarks and folders
	useEffect(() => {
		const getChildren = async () => {
			// Get the children folders and bookmarks
			const [childrenFolders, childrenBookmarks] = await Promise.all([getChildrenFolders(props.children.folder_id), getChildrenBookmarks(props.children.folder_id)])
			let childrenList = [];

			// If there any child folders, it renders them first and then the children bookmarks
			if (childrenFolders.length > 0) {
				// First we need to assign the children folder list to the children list
				childrenList = childrenFolders

				// Iterates every folder
				childrenList.map((folder: BookmarkFolder) => {

					// Iterates every child bookmark
					childrenBookmarks.map((bookmark: BookmarkItem) => {
						// If the bookmark belongs to this parent folder, it pushes to the children array
						if (bookmark.bookmark_parentFolder === folder.folder_id) {
							// @ts-ignore
							folder.folder_children.push(bookmark)
						}
					})
				})

                // After rendering the children folder, render the children bookmarks
				// @ts-ignore
				setChildren([...childrenList, ...childrenBookmarks])
			} else {
				// @ts-ignore
				// The children bookmarks are set in the children where there is any children folder
				setChildren(childrenBookmarks);
			}
		}
		getChildren()
	}, [bookmarkList])

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
					title={props.children.folder_description}
					onClick={() => setExpanded(!expanded)}
				>
					<h4 className={styles.bookmark__folder__title__text}>
						{props.children.folder_title}
					</h4>
				</div>
				<EditFolderButton>{props.children}</EditFolderButton>
				<RemoveFolderButton>{props.children}</RemoveFolderButton>
			</div>

			{children.length > 0 && (
				<motion.ul
					className={styles.bookmark__folder__links}
					ref={collapsibleRef}
					initial="hidden"
					animate={expanded ? "show" : "hidden"}
                    layout
					variants={variants}
					transition={{ duration: 0.3, type: "tween" }}
				>
					{children.map(
						(child: BookmarkFolder & BookmarkItem) => {
							{
								/* If the child item has a "folder_id" key, it is considered as a folder */
							}
							if (child.hasOwnProperty("folder_id")) {
								return (
									<li
										key={child.folder_id}
										className={styles.bookmark__folder__links__link}
									>
										<BookmarkFolderComponent key={child.folder_id}>
											{child}
										</BookmarkFolderComponent>
									</li>
								)
							} else {
								return (
									<li
										key={child.bookmark_id}
										className={styles.bookmark__folder__links__link}
									>
										<BookmarkItemComponent key={child.bookmark_id}>
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
