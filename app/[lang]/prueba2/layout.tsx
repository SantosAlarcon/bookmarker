import type { ReactNode } from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import nextI18nextConfig from "@/next-i18next.config.ts";
import i18nConfig from "@/next-i18next.config.ts";
import { appWithTranslation } from "next-i18next";

export const metadata: Metadata = {
    title: "Prueba",
};

export async function generateStaticParams() {
    return nextI18nextConfig.locales.map((locale: string) => ({
        lang: locale,
    }));
}

const TestLayout = ({
    children,
    params: { lang },
}: { children: ReactNode; params: { lang: string } }) => {
    return (
        <html lang={lang}>
            <body>{children}</body>
        </html>
    );
};

export default appWithTranslation(TestLayout, i18nConfig);
