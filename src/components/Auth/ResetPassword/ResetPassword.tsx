"use client"

import { FormEvent, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import styles from "./ResetPassword.module.scss"
import Image from "next/image"
import { toast } from "sonner"
import Spinner from "@/components/Spinner/Spinner"
import useTranslation from "next-translate/useTranslation"
import switchLocale from "@/app/utils/switchLocale"

const ResetPassword = () => {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation("reset-password")

  useEffect(() => {
    switchLocale()
  }, [])

  async function resetPassword(email: string, event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      console.error("ERROR: ", error)
    } else {
      toast.info(t("toast-success"))
    }
    setLoading(false)
    setEmail("")
  }

  return (
    <div className={styles.reset__password__container}>
      <Image
        className={styles.reset__password__logo}
        src="/BookmarkerLogo.svg"
        alt="Bookmarker logo"
        width="450"
        height="150"
        priority
      />

      <div className={styles.reset__password__box}>
        <h2 className={styles.reset__password__title}>{t("title")}</h2>

        <p className={styles.reset__password__text}>{t("text")}</p>

        <form
          className={styles.reset__password__form}
          onSubmit={(e) => resetPassword(email, e)}
        >
          <label htmlFor="email" className={styles.reset__password__label}>
            {t("email-label")}
          </label>
          <input
            className={styles.reset__password__input}
            id="email"
            name="email"
            placeholder={t("email-placeholder")}
            type="email"
            required
            value={email}
            // @ts-ignore
            onChange={() => setEmail(event.target.value)}
          />
          <button
            className={styles.reset__password__button}
            type="submit"
            disabled={email ? false : true}
          >
            {loading ? <Spinner /> : t("reset-password-button")}
          </button>
        </form>
        <div className={styles.reset__password__links}>
          {t("remember-password-text")}
          <Link href="/auth/login" className={styles.reset__password__link}>
            <b>{t("remember-password-link")}</b>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
