"use client";

import Spinner from "@/components/Spinner/Spinner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styles from "./ResetPassword.module.scss";
import "@/styles/globals.css";
import "@/app/i18n/client";

const ResetPassword = ({ lang }: { lang: string }) => {
    const supabase = createClientComponentClient();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [hydrated, setHydrated] = useState<boolean>(false);
    const { t } = useTranslation("reset-password", { lng: lang });

    useEffect(() => {
        setHydrated(true);
    }, []);

    async function handleResetPassword(email: string, event: FormEvent) {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/api/auth/update-password`,
        });

        if (error) {
            console.error("ERROR: ", error);
        } else {
            toast.info(t("toast-success"));
        }
        setLoading(false);
        setEmail("");
    }

    if (!hydrated) return null;

    return (
        <div className={styles.reset__password__container}>
            <Image
                className={styles.reset__password__logo}
                src="/BookmarkerLogo.svg"
                alt="Bookmarker logo"
                width="450"
                height="150"
                priority={true}
            />
            <div className={styles.reset__password__inner}>
                <Image
                    src="/BookmarkerMockup.webp"
                    alt="Mockup"
                    width="1225"
                    height="749"
                    className={styles.reset__password__image}
                />
                <div className={styles.reset__password__box}>
                    <h2 className={styles.reset__password__title}>
                        {t("title")}
                    </h2>

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
                            value={email}
                            // @ts-ignore
                            onChange={() => setEmail(event.target.value)}
                        />
                        <button
                            aria-label={t("reset-password-button")}
                            className={styles.reset__password__button}
                            type="submit"
                            disabled={!email}
                        >
                            {loading ? <Spinner /> : t("reset-password-button")}
                        </button>
                    </form>
                    <div className={styles.reset__password__links}>
                        {t("remember-password-text")}
                        <Link
                            aria-label={t("remember-password-link")}
                            href="/auth/login"
                            className={styles.reset__password__link}
                        >
                            <b>{t("remember-password-link")}</b>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
