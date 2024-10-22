import { initTranslations } from "@/app/i18n";
import { Barlow } from "next/font/google";
import Head from "next/head";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
});

export const generateMetadata = async (props: { params: Promise<{ lang: string }> }) => {
    const params = await props.params;

    const {
        lang
    } = params;

    const { t } = await initTranslations(lang, ["profile-page"]);
    return {
        title: t("title"),
    };
};

function ProfileLayout({ children }: { children: ReactNode }) {
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
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Bookmarker" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
            </Head>
            <div className={barlow.className}>{children}</div>
            <Toaster position="top-center" richColors />
        </>
    );
}

export default ProfileLayout;
