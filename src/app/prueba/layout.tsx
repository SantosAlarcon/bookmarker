<<<<<<< HEAD
import type { ReactNode } from "react"
import i18next from "../../../i18n"

const layout = async ({ children }: { children: ReactNode }) => {
  
    return (
    <html lang={i18next}>
      <head>
        <title>{i18next.t("test-title", { ns: "common" })}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default layout
=======
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
>>>>>>> e7e93fb9e3695e42d1c270a89c0aa8329dcd1e39
