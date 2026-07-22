"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { modalStore } from "@/store/modalStore";
import styles from "./RemoveFolder.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import { useT } from "next-i18next/client";
import tooltipStyles from "@/styles/tooltip.module.css";
import "@/app/i18n/client";
import { localeStore } from "@/app/store/localeStore";

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

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

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
				priority={true}
			/>
		</button>
	);
};

export default RemoveFolderButton;
