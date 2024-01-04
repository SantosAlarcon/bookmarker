"use client"
import { useSearchParams } from "next/navigation"
import styles from "./NewBookmarkDialog.module.scss"
import React, { JSXElementConstructor, useEffect, useRef } from "react"

type Props = {
	title: string
	onClose: () => void
	onCreate: () => void
	children: React.ReactNode
}

const NewBookmarkDialog = ({ title, onClose, onCreate, children }: Props) => {
	const searchParams = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get("showDialog")

	useEffect(() => {
		if (showDialog === "y") {
			dialogRef.current?.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showDialog])

	const closeDialog = () => {
		dialogRef.current?.close()
		onClose()
	}

	const createBookmark = () => {
		onCreate()
		closeDialog()
	}

	const dialog: JSX.Element | null = showDialog === "y" ? (
		<dialog
			ref={dialogRef}
			className={styles.new__bookmark__dialog__container}
			onClose={closeDialog}
		>
			<NewBookmarkDialogContent
				title={title}
				onCreate={createBookmark}
				onClose={closeDialog}
			>
				{children}
			</NewBookmarkDialogContent>
		</dialog>
	) : null;

	return dialog
}

export default NewBookmarkDialog
