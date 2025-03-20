import styles from "./profile.module.scss";

import { initTranslations } from "@/app/i18n";
import { createClient } from "@/app/utils/supabase/server";
import FalseIcon from "@/components/Icons/FalseIcon";
import TrueIcon from "@/components/Icons/TrueIcon";
import type { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function ProfilePage(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const supabase = await createClient();

    const { lang } = params;

    const { t, i18n } = await initTranslations(lang, ["profile-page"]);

    // If there is no session, it redirects to the login page
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userMetadata: UserMetadata | undefined = user?.user_metadata;

    return (
        <section className={styles.profile__page__container}>
            <h1 className={styles.profile__page__title}>{t("title")}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <div className={styles.profile__page__avatar}>
                    <Image
                        className={styles.profile__page__avatar__img}
                        alt=""
                        src={userMetadata?.picture}
                        width="96"
                        height="96"
                        priority={true}
                    />
                </div>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <div className={styles.profile__page__data__grid}>
                    <span
                        className={
                            styles.profile__page__data__grid__field__name
                        }
                    >
                        {t("username")}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__value
                        }
                    >
                        {userMetadata?.full_name}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__name
                        }
                    >
                        {t("email")}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__value
                        }
                    >
                        {userMetadata?.email}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__name
                        }
                    >
                        {t("verified-by-email")}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__value
                        }
                    >
                        {userMetadata?.email_verified ? (
                            <TrueIcon />
                        ) : (
                            <FalseIcon />
                        )}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__name
                        }
                    >
                        {t("creation-date")}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__value
                        }
                    >
                        {new Date(user?.created_at!).toLocaleString(
                            i18n.language,
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            },
                        )}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__name
                        }
                    >
                        {t("last-login-date")}
                    </span>
                    <span
                        className={
                            styles.profile__page__data__grid__field__value
                        }
                    >
                        {new Date(user?.last_sign_in_at!).toLocaleString(
                            i18n.language,
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            },
                        )}
                    </span>
                </div>
            </Suspense>
            <Link className={styles.profile__page__back__button} href="/" aria-label={t("back-to-home-button")}>
                {t("back-to-home-button")}
            </Link>
        </section>
    );
}

export default ProfilePage;
