import type { ReactNode } from "react";
import { Head, Html as html, NextScript } from "next/document";
import i18nConfig from "@/next-i18next.config";
import "@/styles/globals.css";

export async function generateStaticParams() {
	return i18nConfig.locales.map((locale: string) => ({ locale }));
}

console.log("LOADING ROOT LAYOUT...")

export default function RootLayout({
    params: { lang },
    children,
}: { params: { lang: string }; children: ReactNode }) {
    console.log("CURRENT LANGUAGE: ", lang);

    return (
        <html lang={lang}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* @ts-ignore */}
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <title>Bookmarker</title>
                <link rel="shortcut icon" href="/favicon.svg" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
                <meta name="theme-color" content="#8936FF" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="Bookmarker" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
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
            <body>
                {children}
                <NextScript />
            </body>
        </html>
    );
};
