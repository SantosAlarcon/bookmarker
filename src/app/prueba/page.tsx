import React from "react"
import { useTranslation } from "next-i18next"

const PruebaPage = () => {
  const { t } = useTranslation("common")

  return <div>{t("delete")}</div>
}

export default PruebaPage
