"use client";

import Image from "next/image";
import styles from "./LoginComponent.module.scss";
import "@/styles/globals.css";
import { createClient } from "@/app/utils/supabase/client";
import Spinner from "@/components/Spinner/Spinner";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/app/i18n/client";
import { loginWithEmail } from "@/app/utils/supabase/loginWithEmail";
import { toast } from "sonner";
import { loginWithOAuth } from "@/app/utils/supabase/loginWithOAuth";

interface FormData {
    email: string;
    password: string;
    loading: boolean;
}

const LoginComponent = ({ lang }: { lang: string }) => {
    const supabase: SupabaseClient = createClient();
    const router: AppRouterInstance = useRouter();
    const { t } = useTranslation("login-page", { lng: lang });
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        loading: false,
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setFormData({ ...formData, loading: true });
        loginWithEmail(formData.email, formData.password).then((res) => {
		toast.success(t("login-success"));
		router.prefetch("/");
		router.push("/");
	        
        }).catch((err) => {
		toast.error(err.message);
        });

        setFormData({ ...formData, loading: false });

        // Reset the form
        setFormData({ email: "", password: "", loading: false });
    };

    if (!hydrated) {
        return null;
    }

    return (
        <section className={styles.login__page__container}>
            <div className={styles.login__page__logo}>
                <Image src="/BookmarkerLogo.svg" alt="logo" width={450} height={150} priority={true} />
            </div>
            <div className={styles.login__page__box}>
                <h2 className={styles.login__page__title}>{t("title")}</h2>
                <div className={styles.login__page__text}>{t("text")}</div>
                <div className={styles.login__page__social__buttons}>
                    <button
                        type="button"
                        className={styles.login__page__social__button}
                        onClick={() => loginWithOAuth("google")}
                        disabled={formData.loading}
                    >
                        <Image src="/social/google.svg" alt="Google Logo" width={20} height={20} priority={true} />
                        {t("sign-with-google")}
                    </button>
                    <button
                        type="button"
                        className={styles.login__page__social__button}
                        onClick={() => loginWithOAuth("github")}
                        disabled={formData.loading}
                    >
                        <Image src="/social/github.svg" alt="GitHub Logo" width={20} height={20} priority={true} />
                        {t("sign-with-github")}
                    </button>
                    <button
                        type="button"
                        className={styles.login__page__social__button}
                        onClick={() => loginWithOAuth("facebook")}
                        disabled={formData.loading}
                    >
                        <Image src="/social/facebook.svg" alt="Facebook Logo" width={20} height={20} priority={true} />
                        {t("sign-with-facebook")}
                    </button>
                    <hr className={styles.login__page__separator} />
                    <form className={styles.login__page__form} onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="email">{t("email-label")}</label>
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
                            placeholder={t("email-label")}
                            value={formData.email}
                        />
                        <label htmlFor="password">{t("password-label")}</label>
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
                            placeholder={t("password-label")}
                            value={formData.password}
                        />
                        <button className={styles.login__page__social__button} type="submit" disabled={formData.loading}>
                            {formData.loading ? (
                                <Spinner />
                            ) : (
                                <Image src="/social/email.svg" alt="Email Logo" width={20} height={20} priority={true} />
                            )}
                            {t("sign-with-email")}
                        </button>
                    </form>
                </div>
                <Link href="/reset-password" className={styles.login__page__link}>
                    {t("reset-password-text")} <b>{t("reset-password-link")}</b>
                </Link>
            </div>
        </section>
    );
};

export default LoginComponent;
