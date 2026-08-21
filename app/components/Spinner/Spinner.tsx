"use client";

import styles from "./Spinner.module.css";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";
import "@/app/i18n/client";

const Spinner = () => {
    // @ts-ignore
    const lang = localeStore((state) => state.locale);
    const { t } = useT("common", { lng: lang });

    return (
        <div role="status" className={styles.lds__spinner__wrapper}>
            <div className={styles.lds__spinner} aria-hidden="true">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span className="visually-hidden">{t("loading")}</span>
        </div>
    );
};

export default Spinner;
