import { initTranslations } from "@/app/i18n";
import { Barlow } from "next/font/google";
import Head from "next/head";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

// @ts-ignore
export const generateMetadata = async (props: { params }) => {
    const {lang} = await props.params;

    const { t } = await initTranslations(lang, ["change-password-page"]);

    return {
        title: t("title"),
    };
};

export default function ChangePasswordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <Head>
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

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Bookmarker" />
                <meta
                    property="og:description"
                    content="App to manage browser bookmarks everywhere"
                />
                <meta property="og:site_name" content="Bookmarker" />
            </Head>
            <div className={barlow.className}>{children}</div>
            <Toaster position="top-center" richColors={true} />
        </>
    );
}
