"use client"
import React from "react"
import styles from "./LogoutButton.module.scss"
import Image from "next/image"
import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const LogoutButton = () => {
    const supabase: SupabaseClient = createClientComponentClient();
	const handleClick = async () => {
        // Call the sign out function of Supabase and close all the sessions.
		const {error} = await supabase.auth.signOut({scope: "global"})

        if (error) {
            console.error('ERROR:', error);
        }
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
