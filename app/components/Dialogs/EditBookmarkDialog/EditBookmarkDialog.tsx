"use client";
import { localeStore } from "@/app/store/localeStore";
import type { BookmarkFolder } from "@/app/types/types";
import updateBookmark from "@/app/utils/supabase/bookmarks/updateBookmark";
import { createClient } from "@/app/utils/supabase/client";
import { getAllFolders } from "@/app/utils/supabase/folders/getAllFolders";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import { validateURL } from "@/app/utils/validateURL";
import Spinner from "@/components/Spinner/Spinner";
import { folderStore } from "@/store/folderStore";
import { modalStore } from "@/store/modalStore";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import styles from "./EditBookmarkDialog.module.scss";
import "@/app/i18n/client";
import React from "react";

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

    const dialogRef = useRef<null | HTMLDialogElement>(null);

    // @ts-ignore
    const lang = localeStore((state) => state.locale);
    const { t } = useTranslation("common", { lng: lang });

    useEffect(() => {
        if (editBookmarkModal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [editBookmarkModal]);

    /* It rerenders when the bookmark list is updated */
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

    const closeDialog = async () => {
        dialogRef.current?.close();
        hideEditBookmarkDialog();
        setUpdatedBookmark({
            title: "",
            url: "",
            parentFolder: null,
        });
    };

    const editBookmark = async () => {
        if (validateURL(updatedBookmark.url)) {
            setLoading(true);
            await updateBookmark(editBookmarkData.id, updatedBookmark);
            await updateBookmarkList();
            closeDialog();
            setLoading(false);
            //router.refresh()
            toast.success(t("edit-bookmark-success"));
        } else {
            alert(
                "URL format is incorrect!\nEnter an URL starting with 'http://' or 'https://'.",
            );
        }
    };

    const dialog: React.JSX.Element | null =
        editBookmarkModal === true ? (
            <dialog
                ref={dialogRef}
                className={styles.edit__bookmark__dialog__container}
                onClose={closeDialog}
				role="dialog"
            >
                <div className={styles.edit__bookmark__dialog__title}>
                    <Image
                        src="/icons/edit-icon.svg"
                        alt="Edit bookmark icon"
                        width={16}
                        height={16}
                    />
                    <h4 className={styles.edit__bookmark__dialog__title__text}>
                        {title}
                    </h4>
                </div>
                <div className={styles.edit__bookmark__dialog__content}>
                    <form className={styles.edit__bookmark__dialog__form}>
                        <label
                            htmlFor="title"
                            className={
                                styles.edit__bookmark__dialog__form__label
                            }
                        >
                            {t("title")}
                            <input
                                type="text"
                                name="title"
                                placeholder={t("bookmark-title-placeholder")}
                                onChange={() =>
                                    setUpdatedBookmark({
                                        ...updatedBookmark,
                                        // @ts-ignore
                                        title: event.target.value,
                                    })
                                }
                                value={updatedBookmark.title}
                                required
                            />
                        </label>
                        <label
                            htmlFor="url"
                            className={
                                styles.edit__bookmark__dialog__form__label
                            }
                        >
                            URL
                            <input
                                type="url"
                                name="url"
                                placeholder={t("bookmark-url-placeholder")}
                                onChange={() =>
                                    setUpdatedBookmark({
                                        ...updatedBookmark,
                                        // @ts-ignore
                                        url: event.target.value,
                                    })
                                }
                                value={updatedBookmark.url}
                                required
                            />
                        </label>
                        <label
                            htmlFor="parentFolder"
                            className={
                                styles.edit__bookmark__dialog__form__label
                            }
                        >
                            {t("parent-folder")}
                            <select
                                name="parentFolder"
                                className={
                                    styles.edit__bookmark__dialog__form__select
                                }
                                // @ts-ignore
                                defaultValue={
                                    editBookmarkData.parentFolder
                                        ? editBookmarkData.parentFolder
                                        : null
                                }
                                onChange={() =>
                                    setUpdatedBookmark({
                                        ...updatedBookmark,
                                        // @ts-ignore
                                        parentFolder: event.target.value,
                                    })
                                }
                            >
                                <option value="null">
                                    {t("no-parent-folder")}
                                </option>
                                {folderList?.map((folder: BookmarkFolder) => (
                                    <option
                                        key={folder.folder_id}
                                        value={folder.folder_id}
                                    >
                                        {folder.folder_title}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </form>
                </div>
                <div className={styles.edit__bookmark__dialog__buttons}>
                    <button
                        type="button"
                        disabled={
                            !(updatedBookmark.title && updatedBookmark.url)
                        }
                        onClick={() => editBookmark()}
                    >
                        {loading ? <Spinner /> : t("update")}
                    </button>
                    <button type="button" onClick={() => closeDialog()}>
                        {t("close")}
                    </button>
                </div>
            </dialog>
        ) : null;

    return dialog;
};

export default EditBookmarkDialog;
