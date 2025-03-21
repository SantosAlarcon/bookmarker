"use client";
import { deleteBookmark } from "@/app/utils/supabase/bookmarks/deleteBookmark";
import deleteFolder from "@/app/utils/supabase/folders/deleteFolder";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import Spinner from "@/components/Spinner/Spinner";
import { modalStore } from "@/store/modalStore";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import styles from "./ConfirmDeleteDialog.module.scss";
import "@/app/i18n/client";
import { localeStore } from "@/app/store/localeStore";
import React from "react";

type Props = {
    title: string;
};

const ConfirmDeleteDialog = ({ title }: Props) => {
    const dialogRef = useRef<null | HTMLDialogElement>(null);
    const confirmDeleteModal = modalStore((state) => state.deleteConfirmModal);
    const closeDeleteModal = modalStore(
        (state) => state.hideDeleteConfirmModal,
    );
    const deleteProps = modalStore((state) => state.deleteProps);
    const [loading, setLoading] = useState<boolean>(false);

    // @ts-ignore
    const lang = localeStore((state) => state.locale);
    const { t } = useTranslation("common", { lng: lang });

    useEffect(() => {
        if (confirmDeleteModal === true) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [confirmDeleteModal]);

    const closeDialog = async () => {
        closeDeleteModal();
        dialogRef.current?.close();
    };

    /* This function implements deletion logic and closes the medal. Use the ID of the item to delete it */
    const confirmDeletion = async () => {
        setLoading(true);
        switch (deleteProps.type) {
            case "bookmark": {
                await deleteBookmark(deleteProps.id);
                break;
            }
            case "folder": {
                await deleteFolder(deleteProps.id);
                break;
            }
        }

        await updateBookmarkList();
        closeDialog();
        setLoading(false);
        //router.refresh()
        toast.success(`${t("deletion-success")}: ${deleteProps?.title}`);
    };

    const dialog: React.JSX.Element | null =
        confirmDeleteModal === true ? (
            <dialog
                ref={dialogRef}
                className={styles.confirm__delete__dialog__container}
                onClose={closeDialog}
				aria-modal="true"
				role="dialog"
            >
                <div className={styles.confirm__delete__dialog__title}>
                    <Image
                        src="/icons/trash-icon.svg"
                        alt="Trash icon"
                        width={16}
                        height={16}
                    />
                    <h4 className={styles.confirm__delete__dialog__title__text}>
                        {title}
                    </h4>
                </div>
                <div className={styles.confirm__delete__dialog__content}>
                    {deleteProps?.type === "folder" ? (
                        <p
                            className={
                                styles.confirm__delete__dialog__content__text
                            }
                        >
                            <span
                                className={
                                    styles.confirm__delete__dialog__danger__text
                                }
                            >
                                {t("warning")}
                            </span>
                            : {t("all-the-children-inside")}{" "}
                            <span
                                className={
                                    styles.confirm__delete__dialog__danger__text
                                }
                            >
                                {t("will")}
                            </span>{" "}
                            {t("be-deleted")}.<br />
                            {t("confirm-folder-deletion-text")}{" "}
                            <b>{deleteProps?.title}</b>?
                        </p>
                    ) : (
                        <p
                            className={
                                styles.confirm__delete__dialog__content__text
                            }
                        >
                            {t("confirm-deletion-text")}{" "}
                            <b>{deleteProps?.title}</b>?
                        </p>
                    )}
                </div>
                <div className={styles.confirm__delete__dialog__buttons}>
                    <button
                        type="button"
                        className={
                            styles.confirm__delete__dialog__buttons__delete
                        }
                        onClick={() => confirmDeletion()}
                        aria-label={t("delete")}
                    >
                        {loading ? <Spinner /> : t("delete")}
                    </button>
                    <button type="button" onClick={() => closeDialog()} aria-label={t("close")}>
                        {t("close")}
                    </button>
                </div>
            </dialog>
        ) : null;

    return dialog;
};

export default ConfirmDeleteDialog;
