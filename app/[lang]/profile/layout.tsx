import { initTranslations } from "@/app/i18n";
import { Barlow } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
});

export const generateMetadata = async (props: {
    params: Promise<{ lang: string }>;
}) => {
    const {lang} = await props.params;
    
	const { t } = await initTranslations(lang, ["profile-page"]);

    return {
        title: t("title"),
    };
};

export const dynamic = "force-dynamic";

function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className={barlow.className}>{children}</div>
            <Toaster position="top-center" richColors />
        </>
    );
}

export default ProfileLayout;
