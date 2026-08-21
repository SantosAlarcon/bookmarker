"use client";
import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { localeStore } from "@/app/store/localeStore";
import type { BookmarkFolder } from "@/app/types/types";
import updateFolder from "@/app/utils/supabase/folders/updateFolder";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import AccessibleDialog from "@/components/Dialogs/AccessibleDialog/AccessibleDialog";
import Spinner from "@/components/Spinner/Spinner";
import { folderStore } from "@/store/folderStore";
import { modalStore } from "@/store/modalStore";
import styles from "./EditFolderDialog.module.scss";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";

type Props = {
	title: string;
};

const EditFolderDialog = ({ title }: Props) => {
	const editFolderData = modalStore((state) => state.editFolderData);
	const hideEditFolderDialog = modalStore((state) => state.hideEditFolderModal);
	const editFolderModal = modalStore((state) => state.editFolderModal);
	const folderList = folderStore((state) => state.folderList);

	const [updatedFolder, setUpdatedFolder] = useState({
		title: editFolderData.title,
		description: editFolderData.description,
		parentFolder: editFolderData.parentFolder,
	});
	const [loading, setLoading] = useState<boolean>(false);

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

	useEffect(() => {
		setUpdatedFolder({
			title: editFolderData.title,
			description: editFolderData.description,
			parentFolder: editFolderData.parentFolder,
		});
	}, [editFolderData]);

	const closeDialog = () => {
		hideEditFolderDialog();
		setUpdatedFolder({
			title: "",
			description: "",
			parentFolder: null,
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		await updateFolder(editFolderData.id, updatedFolder);
		await updateBookmarkList();
		closeDialog();
		setLoading(false);
		toast.success(t("edit-folder-success"));
	};

	return (
		<AccessibleDialog
			isOpen={editFolderModal === true}
			onClose={closeDialog}
			className={styles.edit__folder__dialog__container}
			titleId="edit-folder-dialog-title"
		>
			<div className={styles.edit__folder__dialog__title}>
				<Image
					src="/icons/edit-icon.svg"
					alt=""
					width={16}
					height={16}
				/>
				<h2
					id="edit-folder-dialog-title"
					className={styles.edit__folder__dialog__title__text}
				>
					{title}
				</h2>
			</div>
			<div className={styles.edit__folder__dialog__content}>
				<form
					className={styles.edit__folder__dialog__form}
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="edit-folder-title-input"
						className={styles.edit__folder__dialog__form__label}
					>
						{t("title")}
						<input
							id="edit-folder-title-input"
							type="text"
							name="title"
							placeholder={t("folder-title-placeholder")}
							value={updatedFolder.title}
							onChange={(e) =>
								setUpdatedFolder({
									...updatedFolder,
									title: e.target.value,
								})
							}
							required
							aria-required={true}
							autoFocus={true}
						/>
					</label>
					<label
						htmlFor="edit-folder-description-input"
						className={styles.edit__folder__dialog__form__label}
					>
						{t("description")}
						<input
							id="edit-folder-description-input"
							type="text"
							name="description"
							placeholder={t("folder-description-placeholder")}
							value={updatedFolder.description}
							onChange={(e) =>
								setUpdatedFolder({
									...updatedFolder,
									description: e.target.value,
								})
							}
						/>
					</label>
					<label
						htmlFor="edit-folder-parent-folder"
						className={styles.edit__folder__dialog__form__label}
					>
						{t("parent-folder")}
						<select
							id="edit-folder-parent-folder"
							name="parentFolder"
							className={styles.edit__folder__dialog__form__select}
							defaultValue={
								editFolderData.parentFolder
									? editFolderData.parentFolder
									: "null"
							}
							onChange={(e) =>
								setUpdatedFolder({
									...updatedFolder,
									parentFolder: e.target.value,
								})
							}
						>
							<option value="null">{t("no-parent-folder")}</option>
							{folderList?.map((folder: BookmarkFolder) => (
								<option key={folder.folder_id} value={folder.folder_id}>
									{folder.folder_title}
								</option>
							))}
						</select>
					</label>
					<div className={styles.edit__folder__dialog__buttons}>
						<button
							type="submit"
							disabled={loading || !updatedFolder.title}
							aria-busy={loading}
						>
							{loading ? <Spinner /> : t("update")}
						</button>
						<button type="button" onClick={() => closeDialog()}>
							{t("close")}
						</button>
					</div>
				</form>
			</div>
		</AccessibleDialog>
	);
};

export default EditFolderDialog;
