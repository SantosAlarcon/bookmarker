"use client";
import Image from "next/image";
import styles from "./RemoveFolder.module.scss";
import { modalStore } from "@/store/modalStore";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import tooltipStyles from "@/styles/tooltip.module.scss";
import { useTranslation } from "next-i18next";

interface RemoveProps {
    children: {
        folder_id: string;
        folder_title: string;
    };
}

const RemoveFolderButton = ({ children }: RemoveProps) => {
    const showDeleteConfirmDialog = modalStore(
        (state) => state.showDeleteConfirmModal,
    );
    const setDeleteProps = modalStore((state) => state.setDeleteProps);
    const { folder_id, folder_title } = children;
    const { t } = useTranslation("common");

    const handleClick = () => {
        setDeleteProps(folder_id, folder_title, "folder");
        showDeleteConfirmDialog();
    };

    return (
        <button
            className={styles.remove__button}
            aria-label={t("delete-folder")}
            onClick={handleClick}
            type="button"
            id="remove__folder__button"
        >
            <Tooltip
                anchorSelect="#remove__folder__button"
                place="top"
                content={t("delete-folder")}
                variant="info"
                className={tooltipStyles.custom__tooltip}
            />
            <Image
                width={24}
                height={24}
                src="/icons/trash-icon.svg"
                alt="Trash icon"
                priority
            />
        </button>
    );
};

export default RemoveFolderButton;
