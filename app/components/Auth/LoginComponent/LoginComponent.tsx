"use client";

import Image from "next/image";
import styles from "./LoginComponent.module.scss";
import "@/styles/globals.css";
import Spinner from "@/components/Spinner/Spinner";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { loginWithEmail } from "@/app/utils/supabase/loginWithEmail";
import { loginWithOAuth } from "@/app/utils/supabase/loginWithOAuth";
import { toast } from "sonner";

interface FormData {
    email: string;
    password: string;
    loading: boolean;
}

const LoginComponent = ({ lang }: { lang: string }) => {
    const router: AppRouterInstance = useRouter();
    const { t } = useTranslation("login-page", { lng: lang });

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        loading: false,
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setFormData({ ...formData, loading: true });
        loginWithEmail(formData.email, formData.password)
            .then(() => {
                toast.success(t("login-success"));
                router.prefetch("/");
                router.push("/");
            })
            .catch(() => {
                toast.error(t("login-error"));
            });

        setFormData({ ...formData, loading: false });

        // Reset the form
        setFormData({ email: "", password: "", loading: false });
    };

    return (
        <section className={styles.login__page__container}>
            <div className={styles.login__page__logo}>
                <Image
                    src="/BookmarkerLogo.svg"
                    alt="logo"
                    width={450}
                    height={150}
                    priority={true}
                />
            </div>
            <div className={styles.login__page__inner}>
                <Image
                    className={styles.login__page__image}
                    src="/BookmarkerMockup.webp"
                    alt="mockup"
                    width={1225}
                    height={749}
                />
                <div className={styles.login__page__box}>
                    <h1 role="heading" className={styles.login__page__title}>{t("title")}</h1>
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
								aria-label={t("sign-with-google")}
                            >
                                <Image
                                    src="/social/google.svg"
                                    alt="Google Logo"
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
								aria-label={t("sign-with-github")}
                            >
                                <Image
                                    src="/social/github.svg"
                                    alt="GitHub Logo"
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
								aria-label={t("sign-with-facebook")}
                            >
                                <Image
                                    src="/social/facebook.svg"
                                    alt="Facebook Logo"
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
								aria-label={t("email-label")}
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
                            />
                            <label htmlFor="password">
                                {t("password-label")}
                            </label>
                            <input
                                type="password"
                                id="password"
								aria-label={t("password-label")}
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
                            />
                            <button
                                className={styles.login__page__social__button}
                                type="submit"
								aria-label={t("sign-with-email")}
                                disabled={formData.loading}
                            >
                                {formData.loading ? (
                                    <Spinner />
                                ) : (
                                    <Image
                                        src="/social/email.svg"
                                        alt="Email Logo"
                                        width={20}
                                        height={20}
                                        priority={true}
                                    />
                                )}
                                {t("sign-with-email")}
                            </button>
                        </form>
                    </div>
                    <Link
                        href="/auth/register"
                        className={styles.login__page__link}
						aria-label={t("register-link")}
                    >
                        {t("register-text")} <b>{t("register-link")}</b>
                    </Link>
                    <Link
                        href="/reset-password"
                        className={styles.login__page__link}
						aria-label={t("reset-password-link")}
                    >
                        {t("reset-password-text")}{" "}
                        <b>{t("reset-password-link")}</b>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LoginComponent;
