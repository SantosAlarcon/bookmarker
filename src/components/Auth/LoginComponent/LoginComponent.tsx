"use client"

import styles from "./LoginComponent.module.scss"
import Image from "next/image"
import "@/app/globals.css"
import {
	signInWithGoogle,
	signInWithGitHub,
	signInWithFacebook,
	signInWithEmail,
} from "@/app/utils/signIn"
import { FormEvent, useState} from "react"
import Spinner from "@/components/Spinner/Spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { createClient } from "@/app/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js"

interface FormData {
	email: string
	password: string
	loading: boolean
}

const LoadingComponent = () => {
	const supabase: SupabaseClient = createClient();
    const router: AppRouterInstance = useRouter();

	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		loading: false,
	})


	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setFormData({ ...formData, loading: true })
		const isLoggedIn: boolean | undefined = await signInWithEmail(formData.email, formData.password, supabase)

        // If the login is succesfull, redirect to the main page
        if (isLoggedIn) {
            router.prefetch("/")
            router.push("/")
        }

		setFormData({ ...formData, loading: false })

        // Reset the form
		setFormData({ email: "", password: "", loading: false })
	}

	return (
		<section className={styles.login__page__container}>
			<div className={styles.login__page__logo}>
				<Image src="/BookmarkerLogo.svg" alt="logo" width={450} height={150} priority />
			</div>
			<div className={styles.login__page__box}>
				<h2 className={styles.login__page__title}>Login</h2>
				<div className={styles.login__page__text}>
					Start managing your bookmarks in one place by login of your account.
				</div>
				<div className={styles.login__page__social__buttons}>
					<button
						className={styles.login__page__social__button}
						onClick={() => signInWithGoogle(supabase)}
                        disabled={formData.loading}
					>
						<Image
							src="/social/google.svg"
							alt="Google Logo"
							width={20}
							height={20}
                            priority
						/>
						Sign In with Google
					</button>
					<button
						className={styles.login__page__social__button}
						onClick={() => signInWithGitHub(supabase)}
                        disabled={formData.loading}
					>
						<Image
							src="/social/github.svg"
							alt="GitHub Logo"
							width={20}
							height={20}
                            priority
						/>
						Sign In with GitHub
					</button>
					<button
						className={styles.login__page__social__button}
						onClick={() => signInWithFacebook(supabase)}
                        disabled={formData.loading}
					>
						<Image
							src="/social/facebook.svg"
							alt="Facebook Logo"
							width={20}
							height={20}
                            priority
						/>
						Sign In with Facebook
					</button>
					<hr className={styles.login__page__separator} />
					<form className={styles.login__page__form} onSubmit={(e) => handleSubmit(e)}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							required
							placeholder="Email"
							value={formData.email}
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							required
							placeholder="Password"
							value={formData.password}
						/>
						<button
							className={styles.login__page__social__button}
							type="submit"
                            disabled={formData.loading}
						>
                            {formData.loading ? <Spinner /> : <Image
								src="/social/email.svg"
								alt="Email Logo"
								width={20}
								height={20}
                                priority
							/>}
							Sign In with Email
						</button>
					</form>
				</div>
				<Link href="/auth/register" className={styles.login__page__link}>
					Already have an account? <b>Register now</b>
				</Link>
				<Link href="/reset-password" className={styles.login__page__link}>
					Cannot log in? <b>Click to reset password</b>
				</Link>
			</div>
		</section>
	)
}

export default LoadingComponent
