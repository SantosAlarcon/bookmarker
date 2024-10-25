import i18nConfig from "@/next-i18next.config";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import AuthSync from "../components/Auth/AuthSync";
import LocaleSync from "../components/LocaleSync";

export async function generateStaticParams() {
    return i18nConfig.locales.map((locale: string) => ({ locale }));
}

export const metadata: Metadata = {
    title: {
        template: "%s - Bookmarker",
        default: "Bookmarker",
    },
    description: "App to manage browser bookmarks everywhere",
};

export default async function RootLayout(props: {
    params: Promise<{ lang: string }>;
    children: ReactNode;
}) {
    const params = await props.params;

    const { children } = props;
    
    return (
        <html lang={params.lang} suppressHydrationWarning={true}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* @ts-ignore */}
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
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
            </head>
            <body>
		{children}
            </body>
        </html>
    );
}
