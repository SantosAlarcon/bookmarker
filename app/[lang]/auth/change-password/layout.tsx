import { initTranslations } from "@/app/i18n";
import { Barlow } from "next/font/google";
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
            <div className={barlow.className}>{children}</div>
            <Toaster position="top-center" richColors={true} />
        </>
    );
}
