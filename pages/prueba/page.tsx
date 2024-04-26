import { useTranslation } from "next-i18next"

const PruebaPage = () => {
  const { t } = useTranslation("common")
    console.log("momotamomo")

  return <div>{t("delete")}</div>
}

export default PruebaPage
