"use client"
import styles from "./NewBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { modalStore } from "@/store/modalStore"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { BookmarkFolder } from "@/types/types"
import { useRouter } from "next/navigation"
import { getAllFolders } from "@/app/utils/supabase/folders/getAllFolders"
import { createClient } from "@/app/utils/supabase/client"
import { createNewBookmark } from "@/app/utils/supabase/bookmarks/createNewBookmark"
import { folderStore } from "@/store/folderStore"
import { validateURL } from "@/app/utils/validateURL"

type Props = {
	title: string
}

const NewBookmarkDialog = ({ title }: Props) => {
	const hideNewBookmarkDialog = modalStore(
		(state) => state.hideNewBookmarkModal
	)
	const newBookmarkModal = modalStore((state) => state.newBookmarkModal)
	const folderList = folderStore(state => state.folderList)
	const setFolderList = folderStore(state => state.setFolderList)
	const [newBookmark, setNewBookmark] = useState({
		title: "",
		url: "",
		parentFolder: null,
	})

	const dialogRef = useRef<null | HTMLDialogElement>(null)

	const router = useRouter()

	useEffect(() => {
		const getFolderList = async () => {
			const supabase = createClient();
			const { data: user } = await supabase.auth.getUser();
			// @ts-ignore
			const folders = await getAllFolders(user.user?.id)
			setFolderList(folders)
		}
		getFolderList()
	}, [setFolderList])

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
		if (!validateURL(newBookmark.url)) {
			alert("URL format is incorrect!\nEnter an URL starting with 'http://' or 'https://'.")
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
					src="/icons/add-bookmark-icon.svg"
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
							{folderList &&
								folderList.map((folder: BookmarkFolder) => (
									<option key={folder.folder_id} value={folder.folder_id}>
										{folder.folder_title}
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
