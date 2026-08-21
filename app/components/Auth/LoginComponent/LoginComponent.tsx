"use client";

import Image from "next/image";
import styles from "./LoginComponent.module.scss";
import "@/styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { loginWithEmail } from "@/app/utils/supabase/loginWithEmail";
import { loginWithOAuth } from "@/app/utils/supabase/loginWithOAuth";
import Spinner from "@/components/Spinner/Spinner";

interface FormData {
	email: string;
	password: string;
	loading: boolean;
}

const LoginComponent = ({ lang }: { lang: string }) => {
	const router = useRouter();
	const { t } = useTranslation("login-page", { lng: lang });
	const emailRef = useRef<HTMLInputElement>(null);

	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		loading: false,
	});
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setFormData({ ...formData, loading: true });
		setError(null);
		try {
			await loginWithEmail(formData.email, formData.password);
			toast.success(t("login-success"));
			router.prefetch("/");
			router.push("/");
		} catch {
			setError(t("login-error"));
			setFormData((prev) => ({ ...prev, loading: false }));
			emailRef.current?.focus();
		}
	};

	return (
		<div className={styles.login__page__container}>
			<div className={styles.login__page__logo}>
				<Image
					src="/BookmarkerLogo.svg"
					alt="Bookmarker"
					width={450}
					height={150}
					priority={true}
				/>
			</div>
			<div className={styles.login__page__inner}>
				<Image
					className={styles.login__page__image}
					src="/BookmarkerMockup.webp"
					alt=""
					width={1225}
					height={749}
					loading="eager"
				/>
				<div className={styles.login__page__box}>
					<h1 className={styles.login__page__title}>{t("title")}</h1>
					<div className={styles.login__page__text}>{t("text")}</div>
					<div className={styles.login__page__social__buttons}>
						<form
							action={() => loginWithOAuth("google")}
							className={styles.login__page__social__button__form}
						>
							<button
								type="submit"
								className={styles.login__page__social__button}
								disabled={formData.loading}
							>
								<Image
									src="/social/google.svg"
									alt=""
									width={20}
									height={20}
									priority={true}
								/>
								{t("sign-with-google")}
							</button>
						</form>
						<form
							action={() => loginWithOAuth("github")}
							className={styles.login__page__social__button__form}
						>
							<button
								type="submit"
								className={styles.login__page__social__button}
								disabled={formData.loading}
							>
								<Image
									src="/social/github.svg"
									alt=""
									width={20}
									height={20}
									priority={true}
								/>
								{t("sign-with-github")}
							</button>
						</form>
						<form
							action={() => loginWithOAuth("facebook")}
							className={styles.login__page__social__button__form}
						>
							<button
								type="submit"
								className={styles.login__page__social__button}
								disabled={formData.loading}
							>
								<Image
									src="/social/facebook.svg"
									alt=""
									width={20}
									height={20}
									priority={true}
								/>
								{t("sign-with-facebook")}
							</button>
						</form>
						<hr className={styles.login__page__separator} />
						<form
							className={styles.login__page__form}
							onSubmit={(e) => handleSubmit(e)}
						>
							<label htmlFor="email">{t("email-label")}</label>
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
								placeholder={t("email-label")}
								value={formData.email}
								aria-invalid={error !== null}
								aria-describedby={
									error !== null ? "login-error" : undefined
								}
							/>
							<label htmlFor="password">{t("password-label")}</label>
							<input
								type="password"
								id="password"
								name="password"
								autoComplete="current-password"
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
								required={true}
								aria-required={true}
								placeholder={t("password-label")}
								value={formData.password}
								aria-invalid={error !== null}
								aria-describedby={
									error !== null ? "login-error" : undefined
								}
							/>
							{error !== null && (
								<p id="login-error" role="alert" className={styles.login__page__error}>
									{error}
								</p>
							)}
							<button
								className={styles.login__page__social__button}
								type="submit"
								disabled={formData.loading}
								aria-busy={formData.loading}
							>
								{formData.loading ? (
									<Spinner />
								) : (
									<Image
										src="/social/email.svg"
										alt=""
										width={20}
										height={20}
										priority={true}
									/>
								)}
								{t("sign-with-email")}
							</button>
						</form>
					</div>
					<Link href="/auth/register" className={styles.login__page__link}>
						{t("register-text")} <b>{t("register-link")}</b>
					</Link>
					<Link href="/reset-password" className={styles.login__page__link}>
						{t("reset-password-text")} <b>{t("reset-password-link")}</b>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;
