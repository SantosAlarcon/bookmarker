import { redirect } from "next/navigation"
import styles from "./profile.module.scss"

import FalseIcon from "@/components/Icons/FalseIcon"
import TrueIcon from "@/components/Icons/TrueIcon"
import { authStore } from "@/store/authStore"
import type { UserMetadata } from "@supabase/supabase-js"
import type { Metadata } from "next"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useEffect, useState } from "react"
import ProfileLayout from "./layout"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { GetStaticProps } from "next"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "My profile - Bookmarker",
}

type Props = {
  locale: string
}

export default function PrivatePage() {
  const { t, i18n } = useTranslation("profile-page")
  metadata.title = t("page-title")

  const user = authStore((state) => state.user)
  const [hydrated, setHydrated] = useState<boolean>(false)

  const userMetadata: UserMetadata | undefined = user?.user_metadata

  // If there is no user or session active, redirect to the main page.
  if (user) {
    redirect("/")
  }

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  return (
    <ProfileLayout>
      <section className={styles.user__info__container}>
        <h1 className={styles.user__info__title}>{t("title")}</h1>
        <div className={styles.user__info__avatar}>
          <picture>
            <img
              className={styles.user__info__avatar__img}
              alt={userMetadata?.full_name}
              src={userMetadata?.picture}
            />
          </picture>
        </div>
        <div className={styles.user__info__data__grid}>
          <span className={styles.user__info__data__grid__field__name}>
            {t("username")}
          </span>
          <span className={styles.user__info__data__grid__field__value}>
            {userMetadata?.full_name}
          </span>
          <span className={styles.user__info__data__grid__field__name}>
            {t("email")}
          </span>
          <span className={styles.user__info__data__grid__field__value}>
            {userMetadata?.email}
          </span>
          <span className={styles.user__info__data__grid__field__name}>
            {t("verified-by-email")}
          </span>
          <span className={styles.user__info__data__grid__field__value}>
            {userMetadata?.email_verified ? <TrueIcon /> : <FalseIcon />}
          </span>
          <span className={styles.user__info__data__grid__field__name}>
            {t("creation-date")}
          </span>
          <span className={styles.user__info__data__grid__field__value}>
            {new Date(user?.created_at).toLocaleString(i18n.language, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className={styles.user__info__data__grid__field__name}>
            {t("last-login-date")}
          </span>
          <span className={styles.user__info__data__grid__field__value}>
            {new Date(user?.last_sign_in_at!).toLocaleString(i18n.language, {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </span>
        </div>
        <Link className={styles.user__info__link} href="/">
          {t("back-to-home-button")}
        </Link>
      </section>
    </ProfileLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
  // @ts-ignore
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["profile-page"])),
  },
})
