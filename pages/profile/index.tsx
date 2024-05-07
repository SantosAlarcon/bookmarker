import { useRouter } from "next/navigation"
import styles from "./profile.module.scss"

import "@/app/globals.css"
import FalseIcon from "@/components/Icons/FalseIcon"
import TrueIcon from "@/components/Icons/TrueIcon"
import { authStore } from "@/store/authStore"
import type { Session, UserMetadata } from "@supabase/supabase-js"
import type { Metadata } from "next"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"
import { useEffect, useState } from "react"
import ProfileLayout from "./layout"
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "My profile - Bookmarker",
}

type Props = {
  locale: string
}

export default function PrivatePage() {
  const { t, i18n } = useTranslation("profile-page")
  metadata.title = t("page-title")
  const router = useRouter()

  const session: Session | null = authStore((state) => state.session)
  console.log("This is the session:")
  console.log(session)

  useEffect(() => {

    // If there is no user or session active, redirect to login page
    /*if (!session) {
                          router.push("/auth/login")
                        }*/
  }, [])

  const [hydrated, setHydrated] = useState<boolean>(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const userMetadata: UserMetadata | undefined = session?.user?.user_metadata

  // To avoid hydration issues, it will show the component after the hydration.
  if (!hydrated) return null

  return (
    <ProfileLayout>
      <section className={styles.profile__page__container}>
        <h1 className={styles.profile__page__title}>{t("title")}</h1>
        <div className={styles.profile__page__avatar}>
          <picture>
            <img
              className={styles.profile__page__avatar__img}
              alt={userMetadata?.full_name}
              src={userMetadata?.picture}
              fetchpriority="high"
            />
          </picture>
        </div>
        <div className={styles.profile__page__data__grid}>
          <span className={styles.profile__page__data__grid__field__name}>
            {t("username")}
          </span>
          <span className={styles.profile__page__data__grid__field__value}>
            {userMetadata?.full_name}
          </span>
          <span className={styles.profile__page__data__grid__field__name}>
            {t("email")}
          </span>
          <span className={styles.profile__page__data__grid__field__value}>
            {userMetadata?.email}
          </span>
          <span className={styles.profile__page__data__grid__field__name}>
            {t("verified-by-email")}
          </span>
          <span className={styles.profile__page__data__grid__field__value}>
            {userMetadata?.email_verified ? <TrueIcon /> : <FalseIcon />}
          </span>
          <span className={styles.profile__page__data__grid__field__name}>
            {t("creation-date")}
          </span>
          <span className={styles.profile__page__data__grid__field__value}>
            {new Date(session?.user?.created_at!).toLocaleString(
              i18n.language,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
          <span className={styles.profile__page__data__grid__field__name}>
            {t("last-login-date")}
          </span>
          <span className={styles.profile__page__data__grid__field__value}>
            {new Date(session?.user?.last_sign_in_at!).toLocaleString(
              i18n.language,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              }
            )}
          </span>
        </div>
        <Link className={styles.profile__page__back__button} href="/">
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
