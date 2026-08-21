import { localeStore } from "@/app/store/localeStore";
import { getT } from "next-i18next/server";

const NotFound = async () => {
	// @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = await getT("common", { lng: locale });
	return (
		<>
			<h2>{t("no-bookmarks-title")}</h2>
			<p>{t("no-bookmarks-text")}</p>
		</>
	);
};

export default NotFound;
