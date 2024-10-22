import type { ReactNode } from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";
import nextI18nextConfig from "@/next-i18next.config";

export const metadata: Metadata = {
	title: "Prueba",
};

export async function generateStaticParams() {
	return nextI18nextConfig.locales.map((locale: string) => ({
		lang: locale,
	}));
}

const TestLayout = async (props: { children: ReactNode; params: Promise<{ lang: string }> }) => {
    const params = await props.params;

    const {
        lang
    } = params;

    const {
        children
    } = props;

    return (
		<html lang={lang}>
			<body>{children}</body>
		</html>
	);
};

export default TestLayout;
