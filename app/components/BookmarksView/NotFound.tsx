"use client";

import { localeStore } from "@/app/store/localeStore";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";

const NotFound = () => {
	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

	return (
		<>
			<h2>{t("no-bookmarks-title")}</h2>
			<p>{t("no-bookmarks-text")}</p>
		</>
	);
};

export default NotFound;
