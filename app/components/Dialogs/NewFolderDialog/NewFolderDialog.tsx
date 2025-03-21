"use client";
import type { BookmarkFolder } from "@/app/types/types";
import { createNewFolder } from "@/app/utils/supabase/folders/createNewFolder";
import { updateBookmarkList } from "@/app/utils/updateBookmarkList";
import Spinner from "@/components/Spinner/Spinner";
import { folderStore } from "@/store/folderStore";
import { modalStore } from "@/store/modalStore";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import styles from "./NewFolderDialog.module.scss";
import "@/app/i18n/client";
import { localeStore } from "@/app/store/localeStore";
import React from "react";

type Props = {
    title: string;
};

const NewFolderDialog = ({ title }: Props) => {
    const showNewFolderDialog = modalStore((state) => state.newFolderModal);
    const hideNewFolderDialog = modalStore((state) => state.hideNewFolderModal);

    const folderList = folderStore((state) => state.folderList);

    const [newFolder, setNewFolder] = useState({
        title: "",
        description: "",
        parentFolder: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const dialogRef = useRef<null | HTMLDialogElement>(null);

    // @ts-ignore
    const lang = localeStore((state) => state.locale);
    const { t } = useTranslation("common", { lng: lang });

    useEffect(() => {
        if (showNewFolderDialog) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [showNewFolderDialog]);

    const closeDialog = async () => {
        dialogRef.current?.close();
        hideNewFolderDialog();
        setNewFolder({
            title: "",
            description: "",
            parentFolder: null,
        });
    };

    /* THis function implements the logic to create a folder and close the dialog. */
    const createFolder = async () => {
        setLoading(true);
        await createNewFolder(newFolder);
        await updateBookmarkList();
        closeDialog();
        setLoading(false);
        toast.success(t("new-folder-success"));
    };

    const dialog: React.JSX.Element | null = showNewFolderDialog ? (
        <dialog
            ref={dialogRef}
            className={styles.new__folder__dialog__container}
            onClose={closeDialog}
			role="dialog"
        >
            <div className={styles.new__folder__dialog__title}>
                <Image
                    width={24}
                    height={24}
                    src="/icons/add-folder-icon.svg"
                    alt="Add folder icon"
                />
                <h4 className={styles.new__folder__dialog__title__text}>
                    {title}
                </h4>
            </div>
            <div className={styles.new__folder__dialog__content}>
                <form className={styles.new__folder__dialog__form}>
                    <label
                        htmlFor="title"
                        className={styles.new__folder__dialog__form__label}
                    >
                        {t("title")}
                        <input
                            type="text"
                            name="title"
                            placeholder={t("folder-title-placeholder")}
                            onChange={() =>
                                setNewFolder({
                                    ...newFolder,
                                    // @ts-ignore
                                    title: event.target.value,
                                })
                            }
                            required
                        />
                    </label>
                    <label
                        htmlFor="description"
                        className={styles.new__folder__dialog__form__label}
                    >
                        {t("description")}
                        <input
                            type="text"
                            name="description"
                            placeholder={t("folder-description-placeholder")}
                            onChange={() =>
                                setNewFolder({
                                    ...newFolder,
                                    // @ts-ignore
                                    description: event.target.value,
                                })
                            }
                            required
                        />
                    </label>
                    <label
                        htmlFor="parentFolder"
                        className={styles.new__folder__dialog__form__label}
                    >
                        {t("parent-folder")}
                        <select
                            name="parentFolder"
                            className={
                                styles.new__folder__dialog__form__parent__folder
                            }
                            onChange={() =>
                                setNewFolder({
                                    ...newFolder,
                                    // @ts-ignore
                                    parentFolder: event.target.value,
                                })
                            }
                        >
                            <option defaultValue="null">
                                {t("no-parent-folder")}
                            </option>
                            {folderList.map((folder: BookmarkFolder) => (
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
            <div className={styles.new__folder__dialog__buttons}>
                <button
                    disabled={!(newFolder.title && newFolder.description)}
                    onClick={() => createFolder()}
                    type="button"
                >
                    {loading ? <Spinner /> : t("create")}
                </button>
                <button type="button" onClick={() => closeDialog()}>
                    {t("close")}
                </button>
            </div>
        </dialog>
    ) : null;

    return dialog;
};

export default NewFolderDialog;
