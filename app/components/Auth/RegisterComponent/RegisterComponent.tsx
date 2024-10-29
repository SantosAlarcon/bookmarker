"use client";

import Image from "next/image";
import styles from "./RegisterComponent.module.scss";
import "@/styles/globals.css";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import "@/app/i18n/client";
import { signUpWithEmail } from "@/app/utils/supabase/signUp";

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
}

const RegisterComponent = ({ lang }: { lang: string }) => {
    // @ts-ignore
    const { t } = useTranslation("register-page", { lng: lang });
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error(t("passwords-dont-match"));
            return;
        }

        setFormData({ ...formData, loading: true });
        await signUpWithEmail(formData.email, formData.password)
            .then(() => {
                // These lines will execute if the login is successful
                toast.success(t("toast-success"));
            })
            .catch((error) => {
                // If it fails to log in, it shows an toast error
                toast.error(error);
            });

        setFormData({ ...formData, loading: false });
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
        });
    };

    return (
        <section className={styles.register__page__container}>
            <div className={styles.register__page__logo}>
                <Image
                    src="/BookmarkerLogo.svg"
                    alt="logo"
                    width={450}
                    height={150}
                    priority={true}
                />
            </div>
            <div className={styles.register__page__inner}>
                <Image
                    src="/BookmarkerMockup.webp"
                    alt="mockup"
                    width={1225}
                    height={749}
                    className={styles.register__page__image}
                />
                <div className={styles.register__page__box}>
                    <h2 className={styles.register__page__title}>
                        {t("title")}
                    </h2>
                    <div className={styles.register__page__text}>
                        {t("text")}
                    </div>
                    <div className={styles.register__page__advice}>
                        {t("advice")}
                    </div>
                    <div className={styles.register__page__social__buttons}>
                        <form
                            className={styles.register__page__form}
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <label
                                className={styles.register__page__label}
                                htmlFor="email"
                            >
                                {t("email-label")}
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required={true}
                                placeholder={t("email-placeholder")}
                                value={formData.email}
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
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                required={true}
                                placeholder={t("password-placeholder")}
                                value={formData.password}
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
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                required={true}
                                placeholder={t("confirm-password-placeholder")}
                                value={formData.confirmPassword}
                            />
                            <button
                                className={
                                    styles.register__page__social__button
                                }
                                type="submit"
                            >
                                {formData.loading ? (
                                    <Spinner />
                                ) : (
                                    t("register-button")
                                )}
                            </button>
                        </form>
                    </div>
                    <Link
                        href="/auth/login"
                        className={styles.register__page__link}
                    >
                        {t("remember-password-text")}{" "}
                        <b>{t("remember-password-link")}</b>
                    </Link>
                    <Link
                        href="/reset-password"
                        className={styles.register__page__link}
                    >
                        {t("reset-password-text")}{" "}
                        <b>{t("reset-password-link")}</b>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RegisterComponent;
