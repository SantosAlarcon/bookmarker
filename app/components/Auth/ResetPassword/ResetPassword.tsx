"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Spinner from "@/components/Spinner/Spinner";
import styles from "./ResetPassword.module.scss";
import "@/styles/globals.css";
import "@/app/i18n/client";
import { createClient } from "@/app/utils/supabase/client";

const ResetPassword = ({ lang }: { lang: string }) => {
	const supabase = createClient();
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [hydrated, setHydrated] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const { t } = useTranslation("reset-password", { lng: lang });

	useEffect(() => {
		setHydrated(true);
	}, []);

	async function handleResetPassword(email: string, event: FormEvent) {
		event.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/api/auth/update-password`,
		});

		if (error) {
			setError(t("error"));
			emailRef.current?.focus();
		} else {
			toast.info(t("toast-success"));
			setEmail("");
		}
		setLoading(false);
	}

	if (!hydrated) return null;

	return (
		<main className={styles.reset__password__container}>
			<Image
				className={styles.reset__password__logo}
				src="/BookmarkerLogo.svg"
				alt="Bookmarker"
				width="450"
				height="150"
				priority={true}
			/>
			<div className={styles.reset__password__inner}>
				<Image
					src="/BookmarkerMockup.webp"
					alt=""
					width="1225"
					height="749"
					className={styles.reset__password__image}
				/>
				<div className={styles.reset__password__box}>
					<h1 className={styles.reset__password__title}>{t("title")}</h1>

					<p className={styles.reset__password__text}>{t("text")}</p>

					<form
						className={styles.reset__password__form}
						onSubmit={(e) => handleResetPassword(email, e)}
					>
						<label
							htmlFor="email"
							className={styles.reset__password__form__label}
						>
							{t("email-label")}
						</label>
						<input
							className={styles.reset__password__input}
							id="email"
							name="email"
							placeholder={t("email-placeholder")}
							type="email"
							required={true}
							aria-required={true}
							aria-invalid={error !== null}
							aria-describedby={error !== null ? "reset-error" : undefined}
							autoComplete="email"
							ref={emailRef}
							value={email}
							// @ts-ignore
							onChange={() => setEmail(event.target.value)}
						/>
						{error !== null && (
							<p
								id="reset-error"
								role="alert"
								className={styles.reset__password__error}
							>
								{error}
							</p>
						)}
						<button
							className={styles.reset__password__button}
							type="submit"
							aria-busy={loading}
						>
							{loading ? <Spinner /> : t("reset-password-button")}
						</button>
					</form>
					<div className={styles.reset__password__links}>
						{t("remember-password-text")}
						<Link
							href="/auth/login"
							className={styles.reset__password__link}
						>
							<b>{t("remember-password-link")}</b>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ResetPassword;
