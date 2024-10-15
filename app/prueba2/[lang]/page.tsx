import { useTranslation } from "next-i18next";
import TestLayout from "./layout";
import nextI18nextConfig from "@/next-i18next.config";

const PruebaPage = ({ params: { lang } }: { params: { lang: string } }) => {
    const { t } = useTranslation("common", { lng: lang });

    return (
        <TestLayout>
            <div>{t("delete")}</div>
        </TestLayout>
    );
};

export default PruebaPage;
