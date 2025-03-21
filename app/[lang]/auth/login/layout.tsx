import { Barlow } from "next/font/google";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
import { initTranslations } from "@/app/i18n";
import Head from "next/head";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
});

export const generateMetadata = async (props: {
    params: Promise<{ lang: string }>;
}) => {
    const {lang} = await props.params;

    const { t } = await initTranslations(lang, ["login-page"]);

    return {
        title: t("title"),
    };
};

function LoginLayout({ children }: { children: ReactNode }) {
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
				<meta name="title" content="Bookmarker" />
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
            <main className={barlow.className}>{children}</main>
            <Toaster position="top-center" richColors={true} />
        </>
    );
}

export default LoginLayout;
