"use client"

import styles from "./RegisterComponent.module.css"
import Image from "next/image"
import "../../app/globals.css"
import {
	signInWithGoogle,
	signInWithGitHub,
	signInWithFacebook,
	signInWithEmail,
} from "@/app/utils/signIn"
import { useState } from "react"

const RegisterComponent = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSubmit = async () => {
		await signInWithEmail(email, password)
	}

	return (
		<section className={styles.register__page__container}>
			<div className={styles.register__page__logo}>
				<Image src="/BookmarkerLogo.svg" alt="logo" width={450} height={200} />
			</div>
			<div className={styles.register__page__text}>
				Start managing your bookmarks in one place by login out of your account.
			</div>
			<div className={styles.register__page__social__buttons}>
				<button
					className={styles.register__page__social__button}
					onClick={() => signInWithGoogle()}
				>
					<Image
						src="/social/google.svg"
						alt="Google Logo"
						width={20}
						height={20}
					/>
					Sign Up with Google
				</button>
				<button
					className={styles.register__page__social__button}
					onClick={() => signInWithGitHub()}
				>
					<Image
						src="/social/github.svg"
						alt="GitHub Logo"
						width={20}
						height={20}
					/>
					Sign Up with GitHub
				</button>
				<button
					className={styles.register__page__social__button}
					onClick={() => signInWithFacebook()}
				>
					<Image
						src="/social/facebook.svg"
						alt="Facebook Logo"
						width={20}
						height={20}
					/>
					Sign Up with Facebook
				</button>
				<hr className={styles.register__page__separator} />
				<form className={styles.register__page__form} onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
					<button
						className={styles.register__page__social__button}
						onClick={() => signInWithEmail(email, password)}
					>
						<Image
							src="/social/email.svg"
							alt="Email Logo"
							width={20}
							height={20}
						/>
						Sign Up with Email
					</button>
				</form>
			</div>
		</section>
	)
}

export default RegisterComponent
