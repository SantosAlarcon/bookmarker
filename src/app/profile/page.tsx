import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import styles from "./profile.module.scss"

import { createClient } from '@/app/utils/supabase/server'
import { UserMetadata } from '@supabase/supabase-js'
import TrueIcon from '@/components/Icons/TrueIcon'
import FalseIcon from '@/components/Icons/FalseIcon'
import Link from 'next/link'
import { Metadata } from 'next'
import useTranslation from 'next-translate/useTranslation'

export const metadata: Metadata = {
	title: "My profile - Bookmarker",
}

export default async function PrivatePage() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.getUser()
    const userMetadata: UserMetadata | undefined = data.user?.user_metadata
    const {t, lang} = useTranslation("profile-page")
    metadata.title = t("page-title")

    // If there is no user or session active, redirect to the main page.
    if (error || !data?.user) {
        redirect('/')
    }

    return (<section className={styles.user__info__container}>
        <h1 className={styles.user__info__title}>{t("title")}</h1>
        <div className={styles.user__info__avatar}>
            <picture>
                <img className={styles.user__info__avatar__img} alt={userMetadata?.full_name} src={userMetadata?.picture} />
            </picture>
        </div>
        <div className={styles.user__info__data__grid}>
            <span className={styles.user__info__data__grid__field__name}>{t("username")}</span>
            <span className={styles.user__info__data__grid__field__value}>{userMetadata?.full_name}</span>
            <span className={styles.user__info__data__grid__field__name}>{t("email")}</span>
            <span className={styles.user__info__data__grid__field__value}>{userMetadata?.email}</span>
            <span className={styles.user__info__data__grid__field__name}>{t("verified-by-email")}</span>
            <span className={styles.user__info__data__grid__field__value}>{userMetadata?.email_verified ? <TrueIcon /> : <FalseIcon />}</span>
            <span className={styles.user__info__data__grid__field__name}>{t("creation-date")}</span>
            <span className={styles.user__info__data__grid__field__value}>{new Date(data.user.created_at).toLocaleString(lang, { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className={styles.user__info__data__grid__field__name}>{t("last-login-date")}</span>
            <span className={styles.user__info__data__grid__field__value}>{new Date(data.user.last_sign_in_at!).toLocaleString(lang, { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", hour12: false })}</span>
        </div>
        <Link className={styles.user__info__link} href="/">{t("back-to-home-button")}</Link>
    </section>)
}
