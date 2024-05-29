import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "@/src/app/globals.css"
import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

const barlow = Barlow({
	subsets: ["latin"],
	weight: ["500", "700", "900"],
})

export const metadata: Metadata = {
	title: "Bookmarker",
	description: "App to manage browser bookmarks everywhere",
	manifest: "/manifest.json",
}

async function RootLayout({
	children,
}: {
	children: ReactNode
}) {
    const {i18n} = useTranslation();
	return (
		<html lang={i18n.language}>
			<head>
				<link rel="shortcut icon" href="/favicon.svg" />
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
			</head>
			<body className={barlow.className}>
				{children}
			</body>
			<Toaster position="top-center" richColors />
		</html>
	)
}

export default RootLayout
