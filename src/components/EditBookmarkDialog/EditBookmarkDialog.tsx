"use client"
import {
	useRouter,
} from "next/navigation"
import styles from "./EditBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Props = {
	title: string
	open: boolean
	id: string
	children: React.ReactNode
}

const EditBookmarkDialog = ({ title, id, open }: Props) => {
	const [newBookmark, setNewBookmark] = useState({
		title: "",
		url: "",
	})
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const router = useRouter()

	useEffect(() => {
		if (open) {
			dialogRef.current?.showModal()
		} else {
		dialogRef.current?.close()
		}
	}, [open])

	const closeDialog = async () => {
		dialogRef.current?.close()
		setNewBookmark({
			title: "",
			url: "",
		})
		router.push("/")
	}

	const editBookmark = async () => {
		const regExpURL: RegExp = new RegExp(
			"^(?:https?)://(?<host>[w-]+(?:.[w-]+)*)(?::d+)?(?<path>.*)$"
		)

		if (!regExpURL.test(newBookmark.url)) {
			alert("El formato de la URL es incorrecta")
		} else {
			/*alert("Creando tarea...")
										  closeDialog()*/
		}
	}

	const dialog: JSX.Element | null =
		open ? (
			<dialog
				ref={dialogRef}
				className={styles.edit__bookmark__dialog__container}
				onClose={closeDialog}
			>
				<div className={styles.edit__bookmark__dialog__title}>
					<Image
						src="/edit-icon.svg"
						alt="Edit bookmark icon"
						width={16}
						height={16}
					/>
					<h4 className={styles.edit__bookmark__dialog__title__text}>
						{title}
					</h4>
				</div>
				<div className={styles.edit__bookmark__dialog__content}>
					<form className={styles.edit__bookmark__dialog__form}>
						<label
							htmlFor="title"
							className={styles.edit__bookmark__dialog__form__label}
						>
							Title
							<input
								type="text"
								name="title"
								placeholder="Bookmark title"
								onChange={() =>
									setNewBookmark({ ...newBookmark, title: event.target.value })
								}
								required
							/>
						</label>
						<label
							htmlFor="url"
							className={styles.edit__bookmark__dialog__form__label}
						>
							URL
							<input
								type="url"
								name="url"
								placeholder="Bookmark URL"
								onChange={() =>
									setNewBookmark({ ...newBookmark, url: event.target.value })
								}
								required
							/>
						</label>
					</form>
				</div>
				<div className={styles.edit__bookmark__dialog__buttons}>
					<button
						disabled={newBookmark.title && newBookmark.url ? false : true}
						onClick={() => editBookmark()}
					>
						Modify
					</button>
					<button onClick={() => closeDialog()}>Close</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default EditBookmarkDialog
