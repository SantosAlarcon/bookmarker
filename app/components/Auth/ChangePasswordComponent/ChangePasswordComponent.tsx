"use client";

import Image from "next/image";
import styles from "./ChangePasswordComponent.module.scss";
import "@/styles/globals.css";
import Spinner from "@/components/Spinner/Spinner";
import { type FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import "@/app/i18n/client";
import { updatePassword } from "@/app/utils/supabase/updatePassword";

interface FormData {
    password: string;
    confirmPassword: string;
    loading: boolean;
}

const ChangePasswordComponent = ({ lang }: { lang: string }) => {
    // @ts-ignore
    const { t } = useTranslation("change-password-page", { lng: lang });
    const passwordRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>({
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
            await updatePassword(formData.password);
            toast.success(t("toast-success"));
            setFormData({
                password: "",
                confirmPassword: "",
                loading: false,
            });
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("toast-error"));
            setError(t("toast-error"));
            setFormData((prev) => ({ ...prev, loading: false }));
            passwordRef.current?.focus();
        }
    };

    return (
        <div className={styles.change__password__page__container}>
            <div className={styles.change__password__page__logo}>
                <Image
                    src="/BookmarkerLogo.svg"
                    alt="Bookmarker"
                    width={450}
                    height={150}
                    priority={true}
                />
            </div>
            <div className={styles.change__password__page__inner}>
                <Image
                    className={styles.change__password__page__image}
                    src="/BookmarkerMockup.webp"
                    alt=""
                    width={1225}
                    height={749}
                />
                <div className={styles.change__password__page__box}>
                    <h1 className={styles.change__password__page__title}>
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
                                htmlFor="password"
                            >
                                {t("password-label")}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                ref={passwordRef}
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
                                    error !== null
                                        ? "change-password-error"
                                        : undefined
                                }
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
                                    error !== null
                                        ? "change-password-error"
                                        : undefined
                                }
                            />
                            {error !== null && (
                                <p
                                    id="change-password-error"
                                    role="alert"
                                    className={styles.change__password__page__error}
                                >
                                    {error}
                                </p>
                            )}
                            <button
                                className={
                                    styles.change__password__page__social__button
                                }
                                type="submit"
                                disabled={formData.loading}
                                aria-busy={formData.loading}
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
        </div>
    );
};

export default ChangePasswordComponent;
