"use client";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";

const NoResultsFound = () => {
	// @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = useT("common", { lng: locale });
	return <h3>{t("no-results-found")}</h3>;
};

export default NoResultsFound;
