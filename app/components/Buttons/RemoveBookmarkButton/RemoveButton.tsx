"use client";
import { modalStore } from "@/store/modalStore";
import Image from "next/image";
import { useId } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./RemoveButton.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import tooltipStyles from "@/styles/tooltip.module.css";
import { useTranslation } from "react-i18next";
import "@/app/i18n/client";
import { localeStore } from "@/app/store/localeStore";

interface RemoveProps {
    children: {
        bookmark_id: string;
        bookmark_title: string;
    };
}

const RemoveButton = ({ children }: RemoveProps) => {
    const showDeleteConfirmDialog = modalStore(
        (state) => state.showDeleteConfirmModal,
    );
    const setDeleteProps = modalStore((state) => state.setDeleteProps);
    const { bookmark_id, bookmark_title } = children;

    const tooltipId = useId();

    // @ts-ignore
    const lang = localeStore((state) => state.locale);
    const { t } = useTranslation("common", { lng: lang });

    const handleClick = () => {
        setDeleteProps(bookmark_id, bookmark_title, "bookmark");
        showDeleteConfirmDialog();
    };

    return (
        <button
            className={styles.remove__button}
            onClick={handleClick}
            aria-label={`${t("delete-bookmark")}: ${bookmark_title}`}
            type="button"
            id={tooltipId}
        >
            <Tooltip
                anchorSelect={`#${CSS.escape(tooltipId)}`}
                place="top"
                content={t("delete-bookmark")}
                variant="info"
                className={tooltipStyles.custom__tooltip}
            />
            <Image
                width={24}
                height={24}
                src="/icons/trash-icon.svg"
                alt=""
                priority
            />
        </button>
    );
};

export default RemoveButton;
