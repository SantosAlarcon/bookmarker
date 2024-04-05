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
import useTranslation from "next-translate/useTranslation"

type Props = {
	title: string
}

const ConfirmDeleteDialog = ({ title }: Props) => {
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const confirmDeleteModal = modalStore((state) => state.deleteConfirmModal)
	const closeDeleteModal = modalStore((state) => state.hideDeleteConfirmModal)
	const deleteProps = modalStore((state) => state.deleteProps)
    const [loading, setLoading] = useState<boolean>(false);
    const {t} = useTranslation("common")

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
							<span className={styles.confirm__delete__dialog__danger__text}>{t("warning")}</span>: {t("all-the-children-inside")} <span className={styles.confirm__delete__dialog__danger__text}>{t("will")}</span> {t("be-deleted")}.<br />
                            {t("confirm-folder-deletion-text")} <b>{deleteProps?.title}</b>?
						</p>
					) : (
						<p className={styles.confirm__delete__dialog__content__text}>
                            {t("confirm-deletion-text")} <b>{deleteProps?.title}</b>?
						</p>
					)
					}
				</div>
				<div className={styles.confirm__delete__dialog__buttons}>
					<button
						className={styles.confirm__delete__dialog__buttons__delete}
						onClick={() => confirmDeletion()}
					>
                        {loading ? <Spinner /> : t("delete")}
					</button>
					<button onClick={() => closeDialog()}>{t("close")}</button>
				</div>
			</dialog>
		) : null

	return dialog
}

export default ConfirmDeleteDialog
