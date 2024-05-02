"use client"
import React from "react"
import { useClientTranslation } from "../utils/useTranslation"

const PruebaLayout = ({ children }: { children: React.ReactNode }) => {
	const { t } = useClientTranslation("common")

	return (
		<html>
			<head>
				<title>{t("title")}</title>
			</head>
			<body>{children}</body>
		</html>
	)
}

export default PruebaLayout
