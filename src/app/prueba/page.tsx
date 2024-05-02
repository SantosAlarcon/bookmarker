"use client"
import React from "react"
import { useClientTranslation } from "../utils/useTranslation"

const PruebaPage = () => {
	console.log("MOMOCHIMOMO")
	const { t } = useClientTranslation("common")

	return <div>{t("delete")}</div>
}

export default PruebaPage
