import i18next from "i18next";
const PruebaPage = ({ params: { lang } }: { params: { lang: string } }) => {
    const t = i18next.getFixedT(lang);
    return (
            <div>{t("delete")}</div>
    );
};

export default PruebaPage;
