"use client"
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import styles from "./NewBookmarkDialog.module.scss"
import React, { MutableRefObject, useEffect, useRef } from "react"

type Props = {
	title: string
	onClose: () => void
	onCreate: () => void
	children: React.ReactNode
}

const NewBookmarkDialog = ({ title }: Props) => {
	const searchParams: ReadonlyURLSearchParams | null  = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get("showNewBookmarkDialog")

	useEffect(() => {
		if (showDialog === "y") {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showDialog])

	const closeDialog = async () => {
		dialogRef.current?.close()
	}

	const createBookmark = async () => {
		alert("Creando tarea...")
		closeDialog()
	}

	const dialog: JSX.Element | null = showDialog === "y" ? (
		<dialog
			ref={dialogRef}
			className={styles.new__bookmark__dialog__container}
			onClose={closeDialog}
		>
            <div className={styles.new__bookmark__dialog__title}>
                <h4 className={styles.new__bookmark__dialog__title__text}>{title}</h4>
            </div>
            <div className={styles.new__bookmark__dialog__content}>
                <form className={styles.new__bookmark__dialog__form}>
                    <label for="title" classname={styles.new__bookmark__dialog__form__label}>
                        <input type="text" name="title" placeholder="Bookmark title" required />
                    </label>
                    <label for="url" classname={styles.new__bookmark__dialog__form__label}>
                        <input type="text" name="url" placeholder="Bookmark URL" required />
                    </label>
                </form>
            </div>
            <div className={styles.new__bookmark__dialog__buttons}>
                {/*<button formAction={async () => {
                    "use server"
                    await createBookmark()
                }}>
                    Create
                </button>*/}
                <button>
                    Crear
                </button>
                <button>
                    Close
                </button>
            </div>
		</dialog>
	) : null;

	return dialog
}

export default NewBookmarkDialog
