"use client"
import styles from "./NewFolderDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { modalStore } from "@/store/modalStore"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { useRouter } from "next/navigation"
import { createNewFolder } from "@/app/utils/supabase/folders/createNewFolder"
import { folderStore } from "@/store/folderStore"
import { type BookmarkFolder } from "@/types/types"

type Props = {
	title: string
}

const NewFolderDialog = ({ title }: Props) => {
	const showNewFolderDialog = modalStore((state) => state.newFolderModal)
	const hideNewFolderDialog = modalStore((state) => state.hideNewFolderModal)

	const folderList = folderStore((state) => state.folderList)

	const [newFolder, setNewFolder] = useState({
		title: "",
		description: "",
		parentFolder: null
	})
	const dialogRef = useRef<null | HTMLDialogElement>(null)

	const router = useRouter()

	useEffect(() => {
		if (showNewFolderDialog) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showNewFolderDialog])

	const closeDialog = async () => {
		dialogRef.current?.close()
		hideNewFolderDialog()
		setNewFolder({
			title: "",
			description: "",
			parentFolder: null
		})
	}

	/* THis function implements the logic to create a folder and close the dialog. */
	const createFolder = async () => {
		await createNewFolder(newFolder);
		await updateBookmarkList()
		router.refresh()
		closeDialog()
		toast.success("Folder created successfully!")
	}

	const dialog: JSX.Element | null = showNewFolderDialog ? (
		<dialog
			ref={dialogRef}
			className={styles.new__folder__dialog__container}
			onClose={closeDialog}
		>
			<div className={styles.new__folder__dialog__title}>
				<Image
					width={24}
					height={24}
					src="/icons/add-folder-icon.svg"
					alt="Add folder icon"
				/>
				<h4 className={styles.new__folder__dialog__title__text}>{title}</h4>
			</div>
			<div className={styles.new__folder__dialog__content}>
				<form className={styles.new__folder__dialog__form}>
					<label
						htmlFor="title"
						className={styles.new__folder__dialog__form__label}
					>
						Title
						<input
							type="text"
							name="title"
							placeholder="Folder title"
							onChange={() =>
								// @ts-ignore
								setNewFolder({ ...newFolder, title: event.target.value })
							}
							required
						/>
					</label>
					<label
						htmlFor="description"
						className={styles.new__folder__dialog__form__label}
					>
						Description
						<input
							type="text"
							name="description"
							placeholder="Folder description"
							onChange={() =>
								// @ts-ignore
								setNewFolder({ ...newFolder, description: event.target.value })
							}
							required
						/>
					</label>
					<label
						htmlFor="parentFolder"
						className={styles.new__folder__dialog__form__label}
					>
						Parent Folder
						<select
							name="parentFolder"
							className={styles.new__folder__dialog__form__parent__folder}
							onChange={() =>
								// @ts-ignore
								setNewFolder({ ...newFolder, parentFolder: event.target.value })
							}
						>
							<option defaultValue="null">None</option>
							{folderList.map((folder: BookmarkFolder) => (
								<option key={folder.folder_id} value={folder.folder_id}>{folder.folder_title}</option>
							))}
						</select>
					</label>
				</form>
			</div>
			<div className={styles.new__folder__dialog__buttons}>
				<button
					disabled={newFolder.title && newFolder.description ? false : true}
					onClick={() => createFolder()}
				>
					Create
				</button>
				<button onClick={() => closeDialog()}>Close</button>
			</div>
		</dialog>
	) : null

	return dialog
}

export default NewFolderDialog
