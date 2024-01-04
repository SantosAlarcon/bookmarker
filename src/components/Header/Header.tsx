"use client"
import React from "react"
import Image from "next/image"
import styles from "./Header.module.scss"
import { Toaster, toast } from "sonner"

const Header = () => {

	const handleNewBookmark = () => {
	    toast.info("Se va a crear un nuevo marcador...");
	}
	const handleNewFolder = () => {
	    toast.info("Se va a crear una nueva carpeta...");
	}
	return (
		<header className={styles.header__container}>
			<div className={styles.header__logo}>
				<Image
					src="/BookmarkerLogo.svg"
					width="128"
					height="128"
					alt="Logo"
					priority={true}
					className={styles.header__logo_img}
				/>
			</div>
			<div className={styles.header__links}>
				<div className={styles.header__links__new__boomark}>
					<button onClick={() => handleNewBookmark()} className={styles.header__links__button}>
						<Image width={40} height={40} src="/add-bookmark-icon.svg" alt="New bookmark icon" />
					</button>
				</div>
				<div className={styles.header__links__new__folder}>
					<button onClick={() => handleNewFolder()} className={styles.header__links__button}>
						<Image width={40} height={40} src="/add-folder-icon.svg" alt="New folder icon" />
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
