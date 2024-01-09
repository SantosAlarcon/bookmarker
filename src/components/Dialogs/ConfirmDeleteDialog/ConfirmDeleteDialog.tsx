"use client"
import styles from "./ConfirmDeleteDialog.module.scss"
import React, { useEffect, useReducer, useRef } from "react"
import Image from "next/image"
import modalVisibilityReducer, {
	modalVisibility,
} from "@/reducers/modalReducer"
import { toast } from "sonner"

type Props = {
	title: string
}

const ConfirmDeleteDialog = ({ title }: Props) => {
	const [state, modalDeleteDispatch] = useReducer(modalVisibilityReducer, modalVisibility)
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const confirmDeleteModal = state.confirmDeleteModal

	useEffect(() => {
		if (confirmDeleteModal === true) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
		console.log(`>> ${confirmDeleteModal}`)
	}, [confirmDeleteModal])

	const closeDialog = async () => {
		modalDeleteDispatch({ type: "hideConfirmDeleteModal" })
		dialogRef.current?.close()
	}

	/* This function implements deletion logic and closes the medal */
	const confirmDeletion = () => {
		modalDeleteDispatch({ type: "hideConfirmDeleteModal" })
		dialogRef.current?.close()
		toast.success("Bookmark deleted successfully!")
	}

	const dialog: HTMLDialogElement | null =
		confirmDeleteModal === true ? (
			<dialog
				ref={dialogRef}
				className={styles.confirm__delete__dialog__container}
				onClose={closeDialog}
			>
				<div className={styles.confirm__delete__dialog__title}>
					<Image
						src="/trash-icon.svg"
						alt="Trash icon"
						width={16}
						height={16}
					/>
					<h4 className={styles.confirm__delete__dialog__title__text}>
						{title}
					</h4>
				</div>
				<div className={styles.confirm__delete__dialog__content}>
					<p className={styles.confirm__delete__dialog__content__text}>
						Are you sure to delete this item?
					</p>
				</div>
				<div className={styles.confirm__delete__dialog__buttons}>
					<button className={styles.confirm__delete__dialog__buttons__delete}
						onClick={() => confirmDeletion()}
					>
						Delete
					</button>
					<button onClick={() => closeDialog()}>Cancel</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default ConfirmDeleteDialog
