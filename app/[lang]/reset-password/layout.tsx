import { initTranslations } from "@/app/i18n";
import { Barlow } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
});

export async function generateMetadata(props: {
    params: Promise<{ lang: string }>;
}) {
    const {lang} = await props.params;

    const { t } = await initTranslations(lang, ["reset-password"]);
    
	return {
        title: `${t("title")}`,
    };
}

function ResetPasswordLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className={barlow.className}>{children}</div>
            <Toaster position="top-center" richColors />
        </>
    );
}

export default ResetPasswordLayout;
