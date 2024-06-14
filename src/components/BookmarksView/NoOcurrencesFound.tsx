import { useTranslation } from "next-i18next";

const NoOcurrencesFound = () => {
	const { t } = useTranslation("common");
	return (
		<>
			<h3>{t("no-ocurrences-found")}</h3>
		</>
	);
};

export default NoOcurrencesFound;
