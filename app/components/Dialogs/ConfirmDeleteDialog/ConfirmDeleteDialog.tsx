"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBookmark } from "@/app/utils/supabase/bookmarks/deleteBookmark";
import deleteFolder from "@/app/utils/supabase/folders/deleteFolder";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import AccessibleDialog from "@/components/Dialogs/AccessibleDialog/AccessibleDialog";
import Spinner from "@/components/Spinner/Spinner";
import { modalStore } from "@/store/modalStore";
import styles from "./ConfirmDeleteDialog.module.scss";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";

type Props = {
	title: string;
};

const ConfirmDeleteDialog = ({ title }: Props) => {
	const confirmDeleteModal = modalStore((state) => state.deleteConfirmModal);
	const closeDeleteModal = modalStore((state) => state.hideDeleteConfirmModal);
	const deleteProps = modalStore((state) => state.deleteProps);
	const [loading, setLoading] = useState<boolean>(false);

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });

	const closeDialog = () => {
		closeDeleteModal();
	};

	const confirmDeletion = async () => {
		if (deleteProps.type !== "bookmark" && deleteProps.type !== "folder") {
			return;
		}
		setLoading(true);
		if (deleteProps.type === "bookmark") {
			await deleteBookmark(deleteProps.id);
		} else {
			await deleteFolder(deleteProps.id);
		}

		await updateBookmarkList();
		closeDialog();
		setLoading(false);
		toast.success(`${t("deletion-success")}: ${deleteProps?.title}`);
		requestAnimationFrame(() => {
			if (document.activeElement === document.body) {
				document.getElementById("bookmarks-list")?.focus();
			}
		});
	};

	return (
		<AccessibleDialog
			isOpen={confirmDeleteModal === true}
			onClose={closeDialog}
			className={styles.confirm__delete__dialog__container}
			titleId="confirm-delete-title"
			descriptionId="confirm-delete-desc"
		>
			<div className={styles.confirm__delete__dialog__title}>
				<Image
					src="/icons/trash-icon.svg"
					alt=""
					width={16}
					height={16}
				/>
				<h2
					id="confirm-delete-title"
					className={styles.confirm__delete__dialog__title__text}
				>
					{title}
				</h2>
			</div>
			<div
				id="confirm-delete-desc"
				className={styles.confirm__delete__dialog__content}
			>
				{deleteProps?.type === "folder" ? (
					<p className={styles.confirm__delete__dialog__content__text}>
						<span className={styles.confirm__delete__dialog__danger__text}>
							{t("warning")}
						</span>
						: {t("all-the-children-inside")}{" "}
						<span className={styles.confirm__delete__dialog__danger__text}>
							{t("will")}
						</span>{" "}
						{t("be-deleted")}.<br />
						{t("confirm-folder-deletion-text")} <b>{deleteProps?.title}</b>?
					</p>
				) : (
					<p className={styles.confirm__delete__dialog__content__text}>
						{t("confirm-deletion-text")} <b>{deleteProps?.title}</b>?
					</p>
				)}
			</div>
			<div className={styles.confirm__delete__dialog__buttons}>
				<button
					type="button"
					className={styles.confirm__delete__dialog__buttons__delete}
					onClick={() => confirmDeletion()}
					disabled={loading}
					aria-busy={loading}
				>
					{loading ? <Spinner /> : t("delete")}
				</button>
				<button
					type="button"
					onClick={() => closeDialog()}
					autoFocus={true}
				>
					{t("close")}
				</button>
			</div>
		</AccessibleDialog>
	);
};

export default ConfirmDeleteDialog;
