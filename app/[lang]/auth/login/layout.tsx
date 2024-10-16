import { Barlow } from "next/font/google";
import { Toaster } from "sonner";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";
import { Html } from "next/document";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
});

function AuthLayout({
    children,
    params: { lang },
}: { children: ReactNode; params: { lang: string } }) {
    const { t } = useTranslation("login-page", { lng: lang });

    return (
        <Html>
            <Head>
                <title>{t("page-title")}</title>
                <link rel="shortcut icon" href="/favicon.svg" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                />
                <meta name="theme-color" content="#8936FF" />
                <meta
                    name="description"
                    content="App to manage browser bookmarks everywhere"
                />
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

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Bookmarker" />
                <meta
                    property="og:description"
                    content="App to manage browser bookmarks everywhere"
                />
                <meta property="og:site_name" content="Bookmarker" />
            </Head>
            <body>
                <div className={barlow.className}>{children}</div>
            </body>
            <Toaster position="top-center" richColors />
        </Html>
    );
}

export default AuthLayout;
