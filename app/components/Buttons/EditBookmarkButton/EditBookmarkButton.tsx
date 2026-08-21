"use client";
import Image from "next/image";
import { useId } from "react";
import styles from "./EditButton.module.scss";
import { modalStore } from "@/store/modalStore";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import tooltipStyles from "@/styles/tooltip.module.css";
import { useTranslation } from "react-i18next";
import "@/app/i18n/client";
import { localeStore } from "@/app/store/localeStore";

interface EditBookmarkProps {
    children: {
        bookmark_id: string;
        bookmark_title: string;
        bookmark_url: string;
        bookmark_parentfolder: string | null;
    };
}

const EditBookmarkButton = ({ children }: EditBookmarkProps) => {
    const showEditBookmarkDialog = modalStore(
        (state) => state.showEditBookmarkModal,
    );
    const modifyEditBookmarkData = modalStore(
        (state) => state.modifyEditBookmarkData,
    );
    const { bookmark_id, bookmark_title, bookmark_url, bookmark_parentfolder } =
        children;

    const tooltipId = useId();

    const handleClick = () => {
        modifyEditBookmarkData(
            bookmark_id,
            bookmark_title,
            bookmark_url,
            bookmark_parentfolder,
        );
        showEditBookmarkDialog();
    };

    // @ts-ignore
    const lang = localeStore((state) => state.locale);
    const { t } = useTranslation("common", { lng: lang });

    return (
        <button
            className={styles.edit__button}
            onClick={handleClick}
            aria-label={`${t("edit-bookmark-title")}: ${bookmark_title}`}
            type="button"
            id={tooltipId}
        >
            <Tooltip
                anchorSelect={`#${CSS.escape(tooltipId)}`}
                variant="info"
                content={t("edit-bookmark-title")}
                className={tooltipStyles.custom__tooltip}
            />
            <Image
                width={24}
                height={24}
                src="/icons/edit-icon.svg"
                alt=""
                priority={true}
            />
        </button>
    );
};

export default EditBookmarkButton;
