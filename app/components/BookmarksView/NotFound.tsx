import { useTranslation } from "next-i18next";

const NotFound = () => {
    const { t } = useTranslation("common");
    return (
        <>
            <h1>{t("no-bookmarks-title")}</h1> {t("no-bookmarks-text")}
        </>
    );
};

export default NotFound;
