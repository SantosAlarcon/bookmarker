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
import { useId } from "react";

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

	const tooltipId = useId();

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
			aria-label={`${t("delete-folder")}: ${folder_title}`}
			onClick={handleClick}
			type="button"
			id={tooltipId}
		>
			<Tooltip
				anchorSelect={`#${CSS.escape(tooltipId)}`}
				place="top"
				content={t("delete-folder")}
				variant="info"
				className={tooltipStyles.custom__tooltip}
			/>
			<Image
				width={24}
				height={24}
				src="/icons/trash-icon.svg"
				alt=""
				priority={true}
			/>
		</button>
	);
};

export default RemoveFolderButton;
