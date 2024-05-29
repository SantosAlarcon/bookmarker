import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import nextI18NextConfig from "../next-i18next.config.js";
import "@/styles/globals.css";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Bookmarker</title>
				<link rel="shortcut icon" href="/favicon.svg" />
				<link rel="manifest" href="/manifest.json" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
				/>
				<meta name="theme-color" content="#8936FF" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="Bookmarker" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-config" content="/icons/browserconfig.xml" />
				<meta name="msapplication-TileColor" content="#2B5797" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="robots" content="index, follow" />

				<meta property="og:type" content="website" />
				<meta property="og:title" content="Bookmarker" />
				<meta
					property="og:description"
					content="App to manage browser bookmarks everywhere"
				/>
				<meta property="og:site_name" content="Bookmarker" />

			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default appWithTranslation(MyApp, nextI18NextConfig);
