import { Head, Html, Main, NextScript } from "next/document";
import { useTranslation } from "react-i18next";

const Document = () => {
	const { i18n } = useTranslation();
	
    return (
		<Html lang={i18n.language}>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
