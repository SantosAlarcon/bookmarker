"use client"
import styles from "./EditFolderDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { modalStore } from "@/store"

type Props = {
	title: string
	children: React.ReactNode
}

interface EditFolderState {
    title: string,
    description: string
}

const EditFolderDialog = ({ title }: Props) => {
    const editFolderData = modalStore((state) => state.editFolderData);
    const hideEditFolderDialog = modalStore((state) => state.hideEditFolderModal)
    const editFolderModal = modalStore((state) => state.editFolderModal)
	const [newFolder, setNewFolder] = useState<EditFolderState>({
		title: editFolderData.title,
        description: editFolderData.description
	})
	const dialogRef = useRef<null | HTMLDialogElement>(null)

	useEffect(() => {
		if (editFolderModal) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [editFolderModal])

    useEffect(() => {
        setNewFolder({
            title: editFolderData.title,
            description: editFolderData.description
        })
    }, [editFolderData])

	const closeDialog = async () => {
		dialogRef.current?.close()
        hideEditFolderDialog();
		setNewFolder({
			title: "",
            description: ""
		})
	}

    /* This function implements the logic to modify folder metadata */
	const editFolder = async () => {
		dialogRef.current?.close()
        hideEditFolderDialog();
        toast.success("Folder data has been updated succesfully");
    }

	const dialog: JSX.Element | null =
		editFolderModal ? (
			<dialog
				ref={dialogRef}
				className={styles.edit__folder__dialog__container}
				onClose={closeDialog}
			>
				<div className={styles.edit__folder__dialog__title}>
					<Image src="/edit-icon.svg" alt="Edit icon" width={16} height={16} />
					<h4 className={styles.edit__folder__dialog__title__text}>{title}</h4>
				</div>
				<div className={styles.edit__folder__dialog__content}>
					<form className={styles.edit__folder__dialog__form}>
						<label
							htmlFor="title"
							className={styles.edit__folder__dialog__form__label}
						>
							Title
							<input
								type="text"
								name="title"
								placeholder="Folder title"
                                value={newFolder.title}
								onChange={() =>
									setNewFolder({ ...newFolder, title: event.target.value })
								}
								required
							/>
						</label>
						<label
							htmlFor="description"
							className={styles.edit__folder__dialog__form__label}
						>
							Description
							<input
								type="text"
								name="description"
								placeholder="Folder description"
                                value={newFolder.description}
								onChange={() =>
									setNewFolder({ ...newFolder, description: event.target.value })
								}
								required
							/>
						</label>
					</form>
				</div>
				<div className={styles.edit__folder__dialog__buttons}>
					<button
						disabled={newFolder.title && newFolder.description ? false : true}
						onClick={() => editFolder()}
					>
                        Modify
					</button>
					<button onClick={() => closeDialog()}>Close</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default EditFolderDialog
