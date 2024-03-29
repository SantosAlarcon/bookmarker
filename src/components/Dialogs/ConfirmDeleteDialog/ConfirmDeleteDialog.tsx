"use client"
import styles from "./ConfirmDeleteDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { modalStore } from "@/store/modalStore"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { useRouter } from "next/navigation"
import { deleteBookmark } from "@/app/utils/supabase/bookmarks/deleteBookmark"
import deleteFolder from "@/app/utils/supabase/folders/deleteFolder"
import Spinner from "@/components/Spinner/Spinner"

type Props = {
	title: string
}

const ConfirmDeleteDialog = ({ title }: Props) => {
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const confirmDeleteModal = modalStore((state) => state.deleteConfirmModal)
	const closeDeleteModal = modalStore((state) => state.hideDeleteConfirmModal)
	const deleteProps = modalStore((state) => state.deleteProps)
    const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter()

	useEffect(() => {
		if (confirmDeleteModal === true) {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [confirmDeleteModal])

	const closeDialog = async () => {
		closeDeleteModal()
		dialogRef.current?.close()
	}

	/* This function implements deletion logic and closes the medal. Use the ID of the item to delete it */
	const confirmDeletion = async () => {
        setLoading(true);
		switch (deleteProps.type) {
			case "bookmark":
				await deleteBookmark(deleteProps.id)
				break
			case "folder":
				await deleteFolder(deleteProps.id)
				break
		}

		await updateBookmarkList()
		closeDialog()
        setLoading(false);
		router.refresh()
		toast.success(`'${deleteProps?.title}' deleted successfully!`)
	}

	const dialog: JSX.Element | null =
		confirmDeleteModal === true ? (
			<dialog
				ref={dialogRef}
				className={styles.confirm__delete__dialog__container}
				onClose={closeDialog}
			>
				<div className={styles.confirm__delete__dialog__title}>
					<Image
						src="/icons/trash-icon.svg"
						alt="Trash icon"
						width={16}
						height={16}
					/>
					<h4 className={styles.confirm__delete__dialog__title__text}>
						{title}
					</h4>
				</div>
				<div className={styles.confirm__delete__dialog__content}>
					{deleteProps?.type === "folder" ? (
						<p className={styles.confirm__delete__dialog__content__text}>
							<span className={styles.confirm__delete__dialog__danger__text}>WARNING</span>: All the bookmarks inside this folder <span className={styles.confirm__delete__dialog__danger__text}>WILL</span> be deleted.<br />
							Are you sure to delete <b>{deleteProps?.title} folder</b>?
						</p>
					) : (
						<p className={styles.confirm__delete__dialog__content__text}>
							Are you sure to delete <b>{deleteProps?.title}</b>?
						</p>
					)
					}
				</div>
				<div className={styles.confirm__delete__dialog__buttons}>
					<button
						className={styles.confirm__delete__dialog__buttons__delete}
						onClick={() => confirmDeletion()}
					>
                        {loading ? <Spinner /> : "Delete"}
					</button>
					<button onClick={() => closeDialog()}>Cancel</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default ConfirmDeleteDialog
