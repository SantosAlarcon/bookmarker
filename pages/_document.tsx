import { Head, Html, Main, NextScript } from "next/document";
import { useTranslation } from "react-i18next";

const Document = () => {
	const { i18n } = useTranslation();

	return (
		<Html lang={i18n.language}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
