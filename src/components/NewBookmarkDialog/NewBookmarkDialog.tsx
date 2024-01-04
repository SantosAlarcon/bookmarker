"use client"
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"
import styles from "./NewBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { type BookmarkItem } from "@/types/types"
import { toast } from "sonner"

type Props = {
	title: string
	onClose: () => void
	onCreate: () => void
	children: React.ReactNode
}

const NewBookmarkDialog = ({ title }: Props) => {
    const [newBookmark, setNewBookmark] = useState({
        title: "",
        url: "",
        favorite: false
    })
	const searchParams: ReadonlyURLSearchParams | null  = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get("showNewBookmarkDialog")
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
        setNewBookmark({
            title: "",
            url: "",
            favorite: false
        })
        router.back();
	}

	const createBookmark = async () => {
        const regExpURL: RegExp = new RegExp("^(?:https?):\/\/(?<host>[\w-]+(?:\.[\w-]+)*)(?::\d+)?(?<path>.*)$")

        if (!regExpURL.test(newBookmark.url)) {
            alert("El formato de la URL es incorrecta");
        } else {
            /*alert("Creando tarea...")
            closeDialog()*/
        }

	}

	const dialog: JSX.Element | null = showDialog === "y" ? (
		<dialog
			ref={dialogRef}
			className={styles.new__bookmark__dialog__container}
			onClose={closeDialog}
		>
            <div className={styles.new__bookmark__dialog__title}>
                <img src="/add-bookmark-icon.svg" alt="Add bookmark icon" />
                <h4 className={styles.new__bookmark__dialog__title__text}>{title}</h4>
            </div>
            <div className={styles.new__bookmark__dialog__content}>
                <form className={styles.new__bookmark__dialog__form}>
                    <label htmlFor="title" className={styles.new__bookmark__dialog__form__label}>Title
                        <input type="text" name="title" placeholder="Bookmark title" onChange={() => setNewBookmark({...newBookmark, title: event.target.value})} required />
                    </label>
                    <label htmlFor="url" className={styles.new__bookmark__dialog__form__label}>URL
                        <input type="url" name="url" placeholder="Bookmark URL" onChange={() => setNewBookmark({...newBookmark, url: event.target.value})} required />
                    </label>
                    <label htmlFor="favorite" className={styles.new__bookmark__dialog__form__favorite}>Favorite
                        <input type="checkbox" name="favorite" onChange={() => setNewBookmark({...newBookmark, favorite: event.target.value})} />
                    </label>
                </form>
            </div>
            <div className={styles.new__bookmark__dialog__buttons}>
                <button disabled={newBookmark.title && newBookmark.url ? false : true} onClick={() => createBookmark()}>
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

export default NewBookmarkDialog
