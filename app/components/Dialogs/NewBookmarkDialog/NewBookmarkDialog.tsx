"use client";
import Image from "next/image";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { localeStore } from "@/app/store/localeStore";
import type { BookmarkFolder } from "@/app/types/types";
import { createNewBookmark } from "@/app/utils/supabase/bookmarks/createNewBookmark";
import { createClient } from "@/app/utils/supabase/client";
import { getAllFolders } from "@/app/utils/supabase/folders/getAllFolders";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import { validateURL } from "@/app/utils/validateURL";
import AccessibleDialog from "@/components/Dialogs/AccessibleDialog/AccessibleDialog";
import Spinner from "@/components/Spinner/Spinner";
import { folderStore } from "@/store/folderStore";
import { modalStore } from "@/store/modalStore";
import styles from "./NewBookmarkDialog.module.scss";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";

type Props = {
	title: string;
};

const NewBookmarkDialog = ({ title }: Props) => {
	const hideNewBookmarkDialog = modalStore(
		(state) => state.hideNewBookmarkModal,
	);
	const newBookmarkModal = modalStore((state) => state.newBookmarkModal);
	const folderList = folderStore((state) => state.folderList);
	const setFolderList = folderStore((state) => state.setFolderList);
	const [newBookmark, setNewBookmark] = useState<{
		title: string;
		url: string;
		parentFolder: string | null;
	}>({
		title: "",
		url: "",
		parentFolder: null,
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
			const { data: user } = await supabase.auth.getUser();
			// @ts-ignore
			const folders = await getAllFolders(user.user?.id);
			// @ts-ignore
			setFolderList(folders);
		};
		getFolderList();
	}, [setFolderList]);

	const closeDialog = () => {
		hideNewBookmarkDialog();
		setNewBookmark({
			title: "",
			url: "",
			parentFolder: null,
		});
		setUrlError(null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validateURL(newBookmark.url)) {
			setUrlError(t("invalid-url-error"));
			urlRef.current?.focus();
			return;
		}
		setUrlError(null);
		setLoading(true);
		await createNewBookmark(newBookmark);
		await updateBookmarkList();
		closeDialog();
		setLoading(false);
		toast.success(t("new-bookmark-success"));
	};

	return (
		<AccessibleDialog
			isOpen={newBookmarkModal === true}
			onClose={closeDialog}
			className={styles.new__bookmark__dialog__container}
			titleId="new-bookmark-dialog-title"
		>
			<div className={styles.new__bookmark__dialog__title}>
				<Image
					width={24}
					height={24}
					src="/icons/add-bookmark-icon.svg"
					alt=""
					className={styles.new__bookmark__dialog__icon}
				/>
				<h2
					id="new-bookmark-dialog-title"
					className={styles.new__bookmark__dialog__title__text}
				>
					{title}
				</h2>
			</div>
			<div className={styles.new__bookmark__dialog__content}>
				<form
					className={styles.new__bookmark__dialog__form}
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="new-bookmark-title-input"
						className={styles.new__bookmark__dialog__form__label}
					>
						{t("title")}
						<input
							id="new-bookmark-title-input"
							type="text"
							name="title"
							placeholder={t("bookmark-title-placeholder")}
							onChange={(e) =>
								setNewBookmark({
									...newBookmark,
									title: e.target.value,
								})
							}
							required
							aria-required={true}
							autoFocus={true}
						/>
					</label>
					<label
						htmlFor="new-bookmark-url-input"
						className={styles.new__bookmark__dialog__form__label}
					>
						URL
						<input
							id="new-bookmark-url-input"
							ref={urlRef}
							type="url"
							name="url"
							placeholder={t("bookmark-url-placeholder")}
							onChange={(e) =>
								setNewBookmark({
									...newBookmark,
									url: e.target.value,
								})
							}
							required
							aria-required={true}
							aria-invalid={urlError !== null}
							aria-describedby={
								urlError !== null ? "new-bookmark-url-error" : undefined
							}
						/>
					</label>
					{urlError !== null && (
						<p
							id="new-bookmark-url-error"
							role="alert"
							className={styles.new__bookmark__dialog__form__error}
						>
							{urlError}
						</p>
					)}
					<label
						htmlFor="new-bookmark-parent-folder"
						className={styles.new__bookmark__dialog__form__label}
					>
						{t("parent-folder")}
						<select
							id="new-bookmark-parent-folder"
							name="parentFolder"
							className={styles.new__bookmark__dialog__form__select}
							defaultValue="null"
							onChange={(e) =>
								setNewBookmark({
									...newBookmark,
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
					<div className={styles.new__bookmark__dialog__buttons}>
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

export default NewBookmarkDialog;
