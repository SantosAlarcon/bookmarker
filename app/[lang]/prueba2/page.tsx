import { initTranslations } from "@/app/i18n";
import styles from "@/styles/page.module.css"

const PruebaPage = async ({ params: { lang } }: { params: { lang: string } }) => {
    const { t } = await initTranslations(lang, ["common"]);
    return (
        <main className={styles.main}>
            {t("delete")}
        </main>
    );
};

export default PruebaPage;
