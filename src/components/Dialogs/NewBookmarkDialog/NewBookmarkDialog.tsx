"use client"
import styles from "./NewBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { modalStore } from "@/store/modalStore"
import createNewBookmark from "@/app/lib/bookmarks/createNewBookmark"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { getFolders } from "@/app/utils/getFolders"
import { BookmarkFolder } from "@/types/types"
import { useRouter } from "next/navigation"
import { bookmarksStore } from "@/store/bookmarksStore"

type Props = {
	title: string
}

const NewBookmarkDialog = ({ title }: Props) => {
	const hideNewBookmarkDialog = modalStore(
		(state) => state.hideNewBookmarkModal
	)
	const newBookmarkModal = modalStore((state) => state.newBookmarkModal)
	const folderList = bookmarksStore(state => state.bookmarksList)
	const [newBookmark, setNewBookmark] = useState({
		title: "",
		url: "",
		parentFolder: null,
	})

	const [folders, setFolders] = useState<BookmarkFolder[]>([])

	const dialogRef = useRef<null | HTMLDialogElement>(null)

	const router = useRouter()

	useEffect(() => {
		const getFolderList = async () => {
			const folderList = await getFolders()
			setFolders(folderList)
		}
		getFolderList()
	}, [folderList])

	useEffect(() => {
		if (newBookmarkModal) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [newBookmarkModal])

	const closeDialog = async () => {
		dialogRef.current?.close()
		hideNewBookmarkDialog()
		setNewBookmark({
			title: "",
			url: "",
			parentFolder: null,
		})
	}

	/* This function implements the logic for creating a new bookmark */
	const createBookmark = async () => {
		const regExpURL: RegExp = new RegExp(
			"^(?:https?):\/\/([w-]+(?:.[w-]+)*)(?::d+)?(.*)$"
		)

		if (!regExpURL.test(newBookmark.url)) {
			alert("El formato de la URL es incorrecta")
		} else {
			await createNewBookmark(newBookmark)
			await updateBookmarkList()
			router.refresh()
			closeDialog()
			toast.success("The new bookmark added successfully :)")
		}
	}

	const dialog: JSX.Element | null = newBookmarkModal ? (
		<dialog
			ref={dialogRef}
			className={styles.new__bookmark__dialog__container}
			onClose={closeDialog}
		>
			<div className={styles.new__bookmark__dialog__title}>
				<Image
					width={24}
					height={24}
					src="/add-bookmark-icon.svg"
					alt="Add bookmark icon"
				/>
				<h4 className={styles.new__bookmark__dialog__title__text}>{title}</h4>
			</div>
			<div className={styles.new__bookmark__dialog__content}>
				<form className={styles.new__bookmark__dialog__form}>
					<label
						htmlFor="title"
						className={styles.new__bookmark__dialog__form__label}
					>
						Title
						<input
							type="text"
							name="title"
							placeholder="Bookmark title"
							onChange={() =>
								// @ts-ignore
								setNewBookmark({ ...newBookmark, title: event.target.value })
							}
							required
						/>
					</label>
					<label
						htmlFor="url"
						className={styles.new__bookmark__dialog__form__label}
					>
						URL
						<input
							type="url"
							name="url"
							placeholder="Bookmark URL"
							onChange={() =>
								// @ts-ignore
								setNewBookmark({ ...newBookmark, url: event.target.value })
							}
							required
						/>
					</label>
					<label
						htmlFor="parentFolder"
						className={styles.new__bookmark__dialog__form__label}
					>
						Parent folder
						<select
							name="parentFolder"
							className={styles.new__bookmark__dialog__form__select}
							onChange={() =>
								setNewBookmark({
									...newBookmark,
                                    // @ts-ignore
									parentFolder: event.target.value,
								})
							}
						>
							<option defaultValue="null" value="null">
								No parent folder
							</option>
							{folders &&
								folders.map((folder: BookmarkFolder) => (
									<option key={folder.id} value={folder.id}>
										{folder.title}
									</option>
								))}
						</select>
					</label>
				</form>
			</div>
			<div className={styles.new__bookmark__dialog__buttons}>
				<button
					disabled={newBookmark.title && newBookmark.url ? false : true}
					onClick={() => createBookmark()}
				>
					Create
				</button>
				<button onClick={() => closeDialog()}>Close</button>
			</div>
		</dialog>
	) : null

	return dialog
}

export default NewBookmarkDialog
