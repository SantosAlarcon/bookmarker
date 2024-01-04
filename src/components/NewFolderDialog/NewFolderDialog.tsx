"use client"
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import styles from "./NewFolderDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { type FolderItem } from "@/types/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type Props = {
	title: string
	onClose: () => void
	onCreate: () => void
	children: React.ReactNode
}

const NewFolderDialog = ({ title }: Props) => {
    const [newFolder, setNewFolder] = useState({
        title: "",
    })
	const searchParams: ReadonlyURLSearchParams | null  = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get("showNewFolderDialog")
    const router = useRouter();

	useEffect(() => {
		if (showDialog === "y") {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}

        console.log(dialogRef);
	}, [showDialog])

	const closeDialog = async () => {
		dialogRef.current?.close()
        setNewFolder({
            title: "",
        })
        router.back();
	}

	const createFolder = async () => {
	}

	const dialog: JSX.Element | null = showDialog === "y" ? (
		<dialog
			ref={dialogRef}
			className={styles.new__folder__dialog__container}
			onClose={closeDialog}
		>
            <div className={styles.new__folder__dialog__title}>
                <img src="/add-folder-icon.svg" alt="Add folder icon" />
                <h4 className={styles.new__folder__dialog__title__text}>{title}</h4>
            </div>
            <div className={styles.new__folder__dialog__content}>
                <form className={styles.new__folder__dialog__form}>
                    <label htmlFor="title" className={styles.new__folder__dialog__form__label}>Title
                        <input type="text" name="title" placeholder="Folder title" onChange={() => setNewFolder({...newFolder, title: event.target.value})} required />
                    </label>
                </form>
            </div>
            <div className={styles.new__folder__dialog__buttons}>
                <button disabled={newFolder.title ? false : true} onClick={() => createFolder()}>
                    Crear
                </button>
                <button onClick={() => closeDialog()}>
                    Close
                </button>
            </div>
		</dialog>
	) : null;

	return dialog
}

export default NewFolderDialog
