"use client"
import styles from "./NewBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { type BookmarkItem } from "@/types/types"
import { toast } from "sonner"
import Image from "next/image"
import { modalStore } from "@/store"

type Props = {
	title: string
	children: React.ReactNode
}

const NewBookmarkDialog = ({ title }: Props) => {
    const hideNewBookmarkDialog = modalStore((state) => state.hideNewBookmarkModal);
    const newBookmarkModal = modalStore((state) => state.newBookmarkModal);
	const [newBookmark, setNewBookmark] = useState({
		title: "",
		url: "",
	})
	const dialogRef = useRef<null | HTMLDialogElement>(null)

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
		})
	}

    /* This function implements the logic for creating a new bookmark */
	const createBookmark = async () => {
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
		newBookmarkModal ? (
			<dialog
				ref={dialogRef}
				className={styles.new__bookmark__dialog__container}
				onClose={closeDialog}
			>
				<div className={styles.new__bookmark__dialog__title}>
					<Image width={24} height={24} src="/add-bookmark-icon.svg" alt="Add bookmark icon" />
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
									setNewBookmark({ ...newBookmark, url: event.target.value })
								}
								required
							/>
						</label>
					</form>
				</div>
				<div className={styles.new__bookmark__dialog__buttons}>
					<button
						disabled={newBookmark.title && newBookmark.url ? false : true}
						onClick={() => createBookmark()}
					>
						Crear
					</button>
					<button onClick={() => closeDialog()}>Close</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default NewBookmarkDialog
