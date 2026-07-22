"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { modalStore } from "@/store/modalStore";
import styles from "./EditButton.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";
import tooltipStyles from "@/styles/tooltip.module.css";
import "@/app/i18n/client";

interface EditFolderProps {
	children: {
		folder_id: string;
		folder_title: string;
		folder_description: string;
		folder_parentfolder: string | null;
	};
}

const EditFolderButton = ({ children }: EditFolderProps) => {
	const showEditFolderDialog = modalStore((state) => state.showEditFolderModal);
	const modifyEditFolderData = modalStore(
		(state) => state.modifyEditFolderData,
	);
	const { folder_id, folder_title, folder_description, folder_parentfolder } =
		children;

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

	const handleClick = () => {
		// @ts-ignore
		modifyEditFolderData(
			folder_id,
			folder_title,
			folder_description,
			folder_parentfolder,
		);
		showEditFolderDialog();
	};

	return (
		<button
			className={styles.edit__button}
			onClick={() => handleClick()}
			aria-label={t("edit-folder-title")}
			type="button"
			id="edit__folder__button"
		>
			<Tooltip
				anchorSelect="#edit__folder__button"
				variant="info"
				className={tooltipStyles.custom__tooltip}
				content={t("edit-folder-title")}
			/>
			<Image
				width={24}
				height={24}
				src="/icons/edit-icon.svg"
				alt="Edit icon"
				priority={true}
			/>
		</button>
	);
};

export default EditFolderButton;
