import { localeStore } from "@/app/store/localeStore";
import { useTranslation } from "next-i18next";

const NoResultsFound = () => {
    // @ts-ignore
    const {locale} = localeStore.getState()
    const { t } = useTranslation("common", {lng: locale});
    return (
        <>
            <h3>{t("no-results-found")}</h3>
        </>
    );
};

export default NoResultsFound;
