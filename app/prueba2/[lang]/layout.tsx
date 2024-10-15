import type { ReactNode } from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import nextI18nextConfig from "@/next-i18next.config";

export const md: Metadata = {
    title: "Prueba",
};

export async function generateStaticParams() {
    return nextI18nextConfig.i18n.locales.map((locale: string) => ({
        lang: locale,
    }));
}

const TestLayout = ({
    children,
    params: { lang },
}: { children: ReactNode; params: { lang: string } }) => {
    console.log(lang);
    return <div>{children}</div>;
};

export default TestLayout;
