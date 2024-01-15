import type { Metadata } from "next"
import { Gabarito } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const gabarito = Gabarito({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
})

export const metadata: Metadata = {
	title: "Bookmarker",
	description: "App to manage browser bookmarks everywhere",
	manifest: "/manifest.json",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="es">
			<head>
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
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

				<meta property="og:type" content="website" />
				<meta property="og:title" content="Bookmarker" />
				<meta
					property="og:description"
					content="App to manage browser bookmarks everywhere"
				/>
				<meta property="og:site_name" content="Bookmarker" />
			<body className={gabarito.className}>{children}</body>
			<Toaster position="top-center" richColors />
			</head>
		</html>
	)
}
