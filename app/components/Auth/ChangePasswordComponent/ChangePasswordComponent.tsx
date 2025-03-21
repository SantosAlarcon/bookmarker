"use client";

import Image from "next/image";
import styles from "./ChangePasswordComponent.module.scss";
import "@/styles/globals.css";
import Spinner from "@/components/Spinner/Spinner";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import "@/app/i18n/client";
import { updatePassword } from "@/app/utils/supabase/updatePassword";

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
}

const ChangePasswordComponent = ({ lang }: { lang: string }) => {
    // @ts-ignore
    const { t } = useTranslation("change-password-page", { lng: lang });
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Check if both passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error(t("passwords-dont-match"));
            return;
        }

        setFormData({ ...formData, loading: true });
        await updatePassword(formData.email, formData.password)
            .then(() => {
                // These lines will execute if the change password is successful
                toast.success(t("toast-success"));
            })
            .catch((error) => {
                // If it fails to change password, it shows an toast error
                toast.error(error);
            });

        setFormData({ ...formData, loading: false });

        // Reset the form
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
        });
    };

    return (
        <section className={styles.change__password__page__container}>
            <div className={styles.change__password__page__logo}>
                <Image
                    src="/BookmarkerLogo.svg"
                    alt="logo"
                    width={450}
                    height={150}
                    priority={true}
                />
            </div>
            <div className={styles.change__password__page__inner}>
                <Image
                    className={styles.change__password__page__image}
                    src="/BookmarkerMockup.webp"
                    alt="Mockup"
                    width={1225}
                    height={749}
                />
                <div className={styles.change__password__page__box}>
                    <h1 className={styles.change__password__page__title} role="heading">
                        {t("title")}
                    </h1>
                    <div className={styles.change__password__page__text}>
                        {t("text")}
                    </div>
                    <div className={styles.change__password__page__advice}>
                        {t("advice")}
                    </div>
                    <div
                        className={
                            styles.change__password__page__social__buttons
                        }
                    >
                        <form
                            className={styles.change__password__page__form}
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <label
                                className={styles.change__password__page__label}
                                htmlFor="email"
                            >
                                {t("email-label")}
                            </label>
                            <input
                                type="email"
								aria-label={t("email-label")}
                                id="email"
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
                            />

                            <label
                                className={styles.change__password__page__label}
                                htmlFor="password"
                            >
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
                                placeholder={t("password-placeholder")}
                                value={formData.password}
                            />
                            <label
                                className={styles.change__password__page__label}
                                htmlFor="confirm-password"
                            >
                                {t("confirm-password-label")}
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
								aria-label={t("confirm-password-label")}
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
                            />
                            <button
                                className={
                                    styles.change__password__page__social__button
                                }
                                type="submit"
								aria-label={t("change-password-button")}
                            >
                                {formData.loading ? (
                                    <Spinner />
                                ) : (
                                    t("change-password-button")
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePasswordComponent;
