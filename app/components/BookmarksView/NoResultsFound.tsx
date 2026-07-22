import { localeStore } from "@/app/store/localeStore";
import { getT } from "next-i18next/server";

const NoResultsFound = async () => {
    // @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = await getT("common", { lng: locale });
	return <h3>{t("no-results-found")}</h3>;
};

export default NoResultsFound;
