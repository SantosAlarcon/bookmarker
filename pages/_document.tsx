import { Head, Html, Main, NextScript } from "next/document";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";

const Document = () => {
	const { i18n } = useTranslation();

	return (
		<Html lang={i18n.language}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* @ts-ignore */}
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
			</Head>
            <Toaster position="top-center" richColors />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
