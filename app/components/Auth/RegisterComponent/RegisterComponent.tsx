"use client";

import Image from "next/image";
import styles from "./RegisterComponent.module.scss";
import "@/styles/globals.css";
import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Spinner from "@/components/Spinner/Spinner";
import "@/app/i18n/client";
import { signUpWithEmail } from "@/app/utils/supabase/signUp";

interface FormData {
	email: string;
	password: string;
	confirmPassword: string;
	loading: boolean;
}

const RegisterComponent = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("register-page", { lng: lang });
	const emailRef = useRef<HTMLInputElement>(null);
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		confirmPassword: "",
		loading: false,
	});
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError(null);

		if (formData.password !== formData.confirmPassword) {
			setError(t("passwords-dont-match"));
			return;
		}

		setFormData({ ...formData, loading: true });
		try {
			await signUpWithEmail(formData.email, formData.password);
			toast.success(t("toast-success"));
			setFormData({
				email: "",
				password: "",
				confirmPassword: "",
				loading: false,
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : t("toast-error"));
			setError(t("toast-error"));
			setFormData((prev) => ({ ...prev, loading: false }));
			emailRef.current?.focus();
		}
	};

	return (
		<div className={styles.register__page__container}>
			<div className={styles.register__page__logo}>
				<Image
					src="/BookmarkerLogo.svg"
					alt="Bookmarker"
					width={450}
					height={150}
					priority={true}
				/>
			</div>
			<div className={styles.register__page__inner}>
				<Image
					src="/BookmarkerMockup.webp"
					alt=""
					width={1225}
					height={749}
					className={styles.register__page__image}
				/>
				<div className={styles.register__page__box}>
					<h1 className={styles.register__page__title}>{t("title")}</h1>
					<div className={styles.register__page__text}>{t("text")}</div>
					<div className={styles.register__page__advice}>{t("advice")}</div>
					<div className={styles.register__page__social__buttons}>
						<form
							className={styles.register__page__form}
							onSubmit={(e) => handleSubmit(e)}
						>
							<label className={styles.register__page__label} htmlFor="email">
								{t("email-label")}
							</label>
							<input
								type="email"
								id="email"
								name="email"
								autoComplete="email"
								ref={emailRef}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								required={true}
								aria-required={true}
								placeholder={t("email-placeholder")}
								value={formData.email}
								aria-invalid={error !== null}
								aria-describedby={
									error !== null ? "register-error" : undefined
								}
							/>

							<label
								className={styles.register__page__label}
								htmlFor="password"
							>
								{t("password-label")}
							</label>
							<input
								type="password"
								id="password"
								name="password"
								autoComplete="new-password"
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
								required={true}
								aria-required={true}
								placeholder={t("password-placeholder")}
								value={formData.password}
								aria-invalid={error !== null}
								aria-describedby={
									error !== null ? "register-error" : undefined
								}
							/>
							<label
								className={styles.register__page__label}
								htmlFor="confirm-password"
							>
								{t("confirm-password-label")}
							</label>
							<input
								type="password"
								id="confirm-password"
								name="confirm-password"
								autoComplete="new-password"
								onChange={(e) =>
									setFormData({
										...formData,
										confirmPassword: e.target.value,
									})
								}
								required={true}
								aria-required={true}
								placeholder={t("confirm-password-placeholder")}
								value={formData.confirmPassword}
								aria-invalid={error !== null}
								aria-describedby={
									error !== null ? "register-error" : undefined
								}
							/>
							{error !== null && (
								<p
									id="register-error"
									role="alert"
									className={styles.register__page__error}
								>
									{error}
								</p>
							)}
							<button
								className={styles.register__page__social__button}
								type="submit"
								disabled={formData.loading}
								aria-busy={formData.loading}
							>
								{formData.loading ? <Spinner /> : t("register-button")}
							</button>
						</form>
					</div>
					<Link href="/auth/login" className={styles.register__page__link}>
						{t("remember-password-text")} <b>{t("remember-password-link")}</b>
					</Link>
					<Link href="/reset-password" className={styles.register__page__link}>
						{t("reset-password-text")} <b>{t("reset-password-link")}</b>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterComponent;
