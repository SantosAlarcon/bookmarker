"use client";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";

const NoResultsFound = () => {
	// @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = useT("common", { lng: locale });
	return <p>{t("no-results-found")}</p>;
};

export default NoResultsFound;
