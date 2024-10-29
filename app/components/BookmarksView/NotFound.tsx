import { localeStore } from "@/app/store/localeStore";
import { useTranslation } from "next-i18next";

const NotFound = () => {
    // @ts-ignore
    const { locale } = localeStore.getState();
    const { t } = useTranslation("common", { lng: locale });
    return (
        <>
            <h1>{t("no-bookmarks-title")}</h1> {t("no-bookmarks-text")}
        </>
    );
};

export default NotFound;
