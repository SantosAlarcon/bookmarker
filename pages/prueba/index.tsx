import useTranslation from "next-translate/useTranslation"
import React from "react"

const PruebaPage = () => {
  const { t } = useTranslation("common")

  return <div>{t("delete")}</div>
}

export default PruebaPage
