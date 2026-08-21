"use client";
import Image from "next/image";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { localeStore } from "@/app/store/localeStore";
import type { BookmarkFolder } from "@/app/types/types";
import updateBookmark from "@/app/utils/supabase/bookmarks/updateBookmark";
import { createClient } from "@/app/utils/supabase/client";
import { getAllFolders } from "@/app/utils/supabase/folders/getAllFolders";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import { validateURL } from "@/app/utils/validateURL";
import AccessibleDialog from "@/components/Dialogs/AccessibleDialog/AccessibleDialog";
import Spinner from "@/components/Spinner/Spinner";
import { folderStore } from "@/store/folderStore";
import { modalStore } from "@/store/modalStore";
import styles from "./EditBookmarkDialog.module.scss";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";

type Props = {
	title: string;
};

interface EditBookmarkState {
	title: string;
	url: string;
	parentFolder: string | null;
}

const EditBookmarkDialog = ({ title }: Props) => {
	const editBookmarkData = modalStore((state) => state.editBookmarkData);
	const editBookmarkModal = modalStore((state) => state.editBookmarkModal);
	const hideEditBookmarkDialog = modalStore(
		(state) => state.hideEditBookmarkModal,
	);
	const folderList = folderStore((state) => state.folderList);
	const setFolderList = folderStore((state) => state.setFolderList);

	const [updatedBookmark, setUpdatedBookmark] = useState<EditBookmarkState>({
		title: editBookmarkData.title,
		url: editBookmarkData.url,
		parentFolder: editBookmarkData.parentFolder,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [urlError, setUrlError] = useState<string | null>(null);

	const urlRef = useRef<HTMLInputElement>(null);

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

	useEffect(() => {
		const getFolderList = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			// @ts-ignore
			const folders = await getAllFolders(user?.id);
			// @ts-ignore
			setFolderList(folders);
		};
		getFolderList();
	}, [setFolderList]);

	useEffect(() => {
		setUpdatedBookmark({
			title: editBookmarkData.title,
			url: editBookmarkData.url,
			parentFolder: editBookmarkData.parentFolder,
		});
	}, [editBookmarkData]);

	const closeDialog = () => {
		hideEditBookmarkDialog();
		setUpdatedBookmark({
			title: "",
			url: "",
			parentFolder: null,
		});
		setUrlError(null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validateURL(updatedBookmark.url)) {
			setUrlError(t("invalid-url-error"));
			urlRef.current?.focus();
			return;
		}
		setUrlError(null);
		setLoading(true);
		await updateBookmark(editBookmarkData.id, updatedBookmark);
		await updateBookmarkList();
		closeDialog();
		setLoading(false);
		toast.success(t("edit-bookmark-success"));
	};

	return (
		<AccessibleDialog
			isOpen={editBookmarkModal === true}
			onClose={closeDialog}
			className={styles.edit__bookmark__dialog__container}
			titleId="edit-bookmark-dialog-title"
		>
			<div className={styles.edit__bookmark__dialog__title}>
				<Image
					src="/icons/edit-icon.svg"
					alt=""
					width={16}
					height={16}
				/>
				<h2
					id="edit-bookmark-dialog-title"
					className={styles.edit__bookmark__dialog__title__text}
				>
					{title}
				</h2>
			</div>
			<div className={styles.edit__bookmark__dialog__content}>
				<form
					className={styles.edit__bookmark__dialog__form}
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="edit-bookmark-title-input"
						className={styles.edit__bookmark__dialog__form__label}
					>
						{t("title")}
						<input
							id="edit-bookmark-title-input"
							type="text"
							name="title"
							placeholder={t("bookmark-title-placeholder")}
							onChange={(e) =>
								setUpdatedBookmark({
									...updatedBookmark,
									title: e.target.value,
								})
							}
							value={updatedBookmark.title}
							required
							aria-required={true}
							autoFocus={true}
						/>
					</label>
					<label
						htmlFor="edit-bookmark-url-input"
						className={styles.edit__bookmark__dialog__form__label}
					>
						URL
						<input
							id="edit-bookmark-url-input"
							ref={urlRef}
							type="url"
							name="url"
							placeholder={t("bookmark-url-placeholder")}
							onChange={(e) =>
								setUpdatedBookmark({
									...updatedBookmark,
									url: e.target.value,
								})
							}
							value={updatedBookmark.url}
							required
							aria-required={true}
							aria-invalid={urlError !== null}
							aria-describedby={
								urlError !== null ? "edit-bookmark-url-error" : undefined
							}
						/>
					</label>
					{urlError !== null && (
						<p
							id="edit-bookmark-url-error"
							role="alert"
							className={styles.edit__bookmark__dialog__form__error}
						>
							{urlError}
						</p>
					)}
					<label
						htmlFor="edit-bookmark-parent-folder"
						className={styles.edit__bookmark__dialog__form__label}
					>
						{t("parent-folder")}
						<select
							id="edit-bookmark-parent-folder"
							name="parentFolder"
							className={styles.edit__bookmark__dialog__form__select}
							defaultValue={
								editBookmarkData.parentFolder
									? editBookmarkData.parentFolder
									: "null"
							}
							onChange={(e) =>
								setUpdatedBookmark({
									...updatedBookmark,
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
					<div className={styles.edit__bookmark__dialog__buttons}>
						<button
							type="submit"
							disabled={loading}
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

export default EditBookmarkDialog;
