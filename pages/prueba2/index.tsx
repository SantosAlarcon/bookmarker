import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next/types";
import TestLayout from "./layout";

type Props = {
    locale: string;
};

const PruebaPage = () => {
    const { t } = useTranslation("common");

    return (
        <TestLayout>
            <div>{t("delete")}</div>
        </TestLayout>
    );
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
