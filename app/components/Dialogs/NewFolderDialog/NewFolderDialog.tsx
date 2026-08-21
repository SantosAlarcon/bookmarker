"use client";
import Image from "next/image";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import type { BookmarkFolder } from "@/app/types/types";
import { createNewFolder } from "@/app/utils/supabase/folders/createNewFolder";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import AccessibleDialog from "@/components/Dialogs/AccessibleDialog/AccessibleDialog";
import Spinner from "@/components/Spinner/Spinner";
import { folderStore } from "@/store/folderStore";
import { modalStore } from "@/store/modalStore";
import styles from "./NewFolderDialog.module.scss";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";

type Props = {
	title: string;
};

const NewFolderDialog = ({ title }: Props) => {
	const showNewFolderDialog = modalStore((state) => state.newFolderModal);
	const hideNewFolderDialog = modalStore((state) => state.hideNewFolderModal);

	const folderList = folderStore((state) => state.folderList);

	const [newFolder, setNewFolder] = useState<{
		title: string;
		description: string;
		parentFolder: string | null;
	}>({
		title: "",
		description: "",
		parentFolder: null,
	});
	const [loading, setLoading] = useState<boolean>(false);

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

	const closeDialog = () => {
		hideNewFolderDialog();
		setNewFolder({
			title: "",
			description: "",
			parentFolder: null,
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		await createNewFolder(newFolder);
		await updateBookmarkList();
		closeDialog();
		setLoading(false);
		toast.success(t("new-folder-success"));
	};

	return (
		<AccessibleDialog
			isOpen={showNewFolderDialog === true}
			onClose={closeDialog}
			className={styles.new__folder__dialog__container}
			titleId="new-folder-dialog-title"
		>
			<div className={styles.new__folder__dialog__title}>
				<Image
					width={24}
					height={24}
					src="/icons/add-folder-icon.svg"
					alt=""
				/>
				<h2
					id="new-folder-dialog-title"
					className={styles.new__folder__dialog__title__text}
				>
					{title}
				</h2>
			</div>
			<div className={styles.new__folder__dialog__content}>
				<form
					className={styles.new__folder__dialog__form}
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="new-folder-title-input"
						className={styles.new__folder__dialog__form__label}
					>
						{t("title")}
						<input
							id="new-folder-title-input"
							type="text"
							name="title"
							placeholder={t("folder-title-placeholder")}
							onChange={(e) =>
								setNewFolder({
									...newFolder,
									title: e.target.value,
								})
							}
							required
							aria-required={true}
							autoFocus={true}
						/>
					</label>
					<label
						htmlFor="new-folder-description-input"
						className={styles.new__folder__dialog__form__label}
					>
						{t("description")}
						<input
							id="new-folder-description-input"
							type="text"
							name="description"
							placeholder={t("folder-description-placeholder")}
							onChange={(e) =>
								setNewFolder({
									...newFolder,
									description: e.target.value,
								})
							}
							required
							aria-required={true}
						/>
					</label>
					<label
						htmlFor="new-folder-parent-folder"
						className={styles.new__folder__dialog__form__label}
					>
						{t("parent-folder")}
						<select
							id="new-folder-parent-folder"
							name="parentFolder"
							className={styles.new__folder__dialog__parent__folder}
							defaultValue="null"
							onChange={(e) =>
								setNewFolder({
									...newFolder,
									parentFolder: e.target.value,
								})
							}
						>
							<option value="null">{t("no-parent-folder")}</option>
							{folderList.map((folder: BookmarkFolder) => (
								<option key={folder.folder_id} value={folder.folder_id}>
									{folder.folder_title}
								</option>
							))}
						</select>
					</label>
					<div className={styles.new__folder__dialog__buttons}>
						<button
							type="submit"
							disabled={loading}
							aria-busy={loading}
						>
							{loading ? <Spinner /> : t("create")}
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

export default NewFolderDialog;
