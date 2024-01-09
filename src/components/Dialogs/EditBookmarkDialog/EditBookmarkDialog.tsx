"use client"
import styles from "./EditBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { modalStore } from "@/store"

type Props = {
	title: string
	id: string
	children: React.ReactNode
}

interface EditBookmarkState {
    title: string,
    url: string
}


const EditBookmarkDialog = ({ title }: Props) => {
    const editBookmarkData = modalStore((state) => state.editBookmarkData);
    const editBookmarkModal = modalStore((state) => state.editBookmarkModal);
    const hideEditBookmarkDialog = modalStore((state) => state.hideEditBookmarkModal);
	const [newBookmark, setNewBookmark] = useState<EditBookmarkState>({
		title: editBookmarkData.title,
		url: editBookmarkData.url,
	})
	const dialogRef = useRef<null | HTMLDialogElement>(null)

	useEffect(() => {
		if (editBookmarkModal) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [editBookmarkModal])

    useEffect(() => {
        setNewBookmark({
            title: editBookmarkData.title,
            url: editBookmarkData.url
        })
    }, [editBookmarkData])

	const closeDialog = async () => {
		dialogRef.current?.close()
        hideEditBookmarkDialog()
		setNewBookmark({
			title: "",
			url: "",
		})
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
		editBookmarkModal === true ? (
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
                                value={newBookmark.title}
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
                                value={newBookmark.url}
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
