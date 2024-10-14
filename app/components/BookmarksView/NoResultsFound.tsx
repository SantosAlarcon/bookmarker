import { useTranslation } from "next-i18next";

const NoResultsFound = () => {
	const { t } = useTranslation("common");
	return (
		<>
			<h3>{t("no-results-found")}</h3>
		</>
	);
};

export default NoResultsFound;
