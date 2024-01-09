"use client"
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import styles from "./NewFolderDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { type FolderItem } from "@/types/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Props = {
	title: string
	children: React.ReactNode
}

const NewFolderDialog = ({ title }: Props) => {
	const [newFolder, setNewFolder] = useState({
		title: "",
		descripcion: "",
	})
	const searchParams: ReadonlyURLSearchParams | null = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog: string | null = searchParams.get("showNewFolderDialog")
	const router = useRouter()

	useEffect(() => {
		if (showDialog === "y") {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showDialog])

	const closeDialog = async () => {
		dialogRef.current?.close()
		setNewFolder({
			title: "",
			descripcion: "",
		})
		router.back()
	}

        /* THis function implements the logic to create a folder and close the dialog. */
	const createFolder = async () => {
		closeDialog()
		toast.success("Folder created successfully!")
	}

	const dialog: JSX.Element | null =
		showDialog === "y" ? (
			<dialog
				ref={dialogRef}
				className={styles.new__folder__dialog__container}
				onClose={closeDialog}
			>
				<div className={styles.new__folder__dialog__title}>
					<Image width={24} height={24} src="/add-folder-icon.svg" alt="Add folder icon" />
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
									setNewFolder({ ...newFolder, title: event.target.value })
								}
								required
							/>
						</label>
					</form>
				</div>
				<div className={styles.new__folder__dialog__buttons}>
					<button
						disabled={newFolder.title ? false : true}
						onClick={() => createFolder()}
					>
						Crear
					</button>
					<button onClick={() => closeDialog()}>Close</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default NewFolderDialog
