import type { ReactNode } from "react"
import { useTranslation } from "next-i18next"

const ResetPasswordLayout = ({ children }: { children: ReactNode }) => {
	const { t, i18n } = useTranslation("reset-password")
	console.log("holiiiiiiiiiiiiiiiiiiiiiiiii")

	return (
		<html lang={i18n.language}>
			<head>
				<title>{t("page-title")}</title>
			</head>
			<body>{children}</body>
		</html>
	)
}

export default ResetPasswordLayout
