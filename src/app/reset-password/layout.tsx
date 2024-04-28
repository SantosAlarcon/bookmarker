import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset password - Bookmarker",
};

const ResetPasswordLayout = ({ children }: { children: ReactNode }) => {
	const { t, i18n } = useTranslation("reset-password");
	metadata.title = t("page-title");

    console.log("Los oppai de Asunaaaarrrrllll!!!!")

	return (
		<html lang={i18n.language}>
			<body>{children}</body>
		</html>
	);
};

export default ResetPasswordLayout;
