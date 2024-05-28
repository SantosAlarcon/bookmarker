import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next/types";

type Props = {
	locale: string;
};

const PruebaPage = () => {
	const { t } = useTranslation("common");

	return <div>{t("delete")}</div>;
};

export default PruebaPage;

export const getStaticProps: GetStaticProps<Props> = async ({
	locale,
	// @ts-ignore
}) => ({
	props: {
		...(await serverSideTranslations(locale ?? "en", ["common"])),
	},
});
