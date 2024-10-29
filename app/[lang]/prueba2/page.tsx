import { initTranslations } from "@/app/i18n";
import styles from "@/styles/page.module.css";

const PruebaPage = async (props: { params: Promise<{ lang: string }> }) => {
    const params = await props.params;

    const { lang } = params;

    const { t } = await initTranslations(lang, ["common"]);
    return <main className={styles.main}>{t("delete")}</main>;
};

export default PruebaPage;
