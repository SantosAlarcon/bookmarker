"use client"
import React from "react"
import styles from "./LogoutButton.module.scss"
import { logout } from "@/app/utils/logout"
import Image from "next/image"

const LogoutButton = () => {
	const handleClick = async () => {
		await logout()
	}

	return (
		<button onClick={handleClick} className={styles.logout__button}>
			<span className={styles.logout__button__icon}>
				<Image src="/logout.svg" alt="Logout icon" width={20} height={20} />
			</span>
			Logout
		</button>
	)
}

export default LogoutButton
