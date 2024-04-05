"use client"
import styles from "./EditFolderDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { modalStore } from "@/store/modalStore"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { useRouter } from "next/navigation"
import updateFolder from "@/app/utils/supabase/folders/updateFolder"
import { folderStore } from "@/store/folderStore"
import { BookmarkFolder } from "@/types/types"
import Spinner from "@/components/Spinner/Spinner"
import useTranslation from "next-translate/useTranslation"

type Props = {
    title: string
}

const EditFolderDialog = ({ title }: Props) => {
    const editFolderData = modalStore((state) => state.editFolderData)
    const hideEditFolderDialog = modalStore((state) => state.hideEditFolderModal)
    const editFolderModal = modalStore((state) => state.editFolderModal)
    const folderList = folderStore((state) => state.folderList)

    const [updatedFolder, setUpdatedFolder] = useState({
        title: editFolderData.title,
        description: editFolderData.description,
        parentFolder: editFolderData.parentFolder
    })
    const [loading, setLoading] = useState<boolean>(false);
    const {t} = useTranslation("common")

    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const router = useRouter();

    useEffect(() => {
        if (editFolderModal) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [editFolderModal])

    useEffect(() => {
        setUpdatedFolder({
            title: editFolderData.title,
            description: editFolderData.description,
            parentFolder: editFolderData.parentFolder
        })
    }, [editFolderData])

    const closeDialog = async () => {
        dialogRef.current?.close()
        hideEditFolderDialog()
        setUpdatedFolder({
            title: "",
            description: "",
            parentFolder: null
        })
    }

    /* This function implements the logic to modify folder metadata */
    const editFolder = async () => {
        setLoading(true);
        await updateFolder(editFolderData.id, updatedFolder)
        await updateBookmarkList()
        router.refresh()
        closeDialog()
        setLoading(false);
        toast.success(t("edit-folder-success"))
    }

    const dialog: JSX.Element | null = editFolderModal ? (
        <dialog
            ref={dialogRef}
            className={styles.edit__folder__dialog__container}
            onClose={closeDialog}
        >
            <div className={styles.edit__folder__dialog__title}>
                <Image src="/icons/edit-icon.svg" alt="Edit icon" width={16} height={16} />
                <h4 className={styles.edit__folder__dialog__title__text}>{title}</h4>
            </div>
            <div className={styles.edit__folder__dialog__content}>
                <form className={styles.edit__folder__dialog__form}>
                    <label
                        htmlFor="title"
                        className={styles.edit__folder__dialog__form__label}
                    >
                        {t("title")}
                        <input
                            type="text"
                            name="title"
                            placeholder={t("folder-title-placeholder")}
                            value={updatedFolder.title}
                            onChange={() =>
                                // @ts-ignore
                                setUpdatedFolder({ ...updatedFolder, title: event.target.value })
                            }
                            required
                        />
                    </label>
                    <label
                        htmlFor="description"
                        className={styles.edit__folder__dialog__form__label}
                    >
                        {t("description")}
                        <input
                            type="text"
                            name="description"
                            placeholder={t("folder-description-placeholder")}
                            value={updatedFolder.description}
                            onChange={() =>
                                // @ts-ignore
                                setUpdatedFolder({ ...updatedFolder, description: event.target.value })
                            }
                            required
                        />
                    </label>
                    <label
                        htmlFor="parentFolder"
                        className={styles.edit__folder__dialog__form__label}
                    >
                        {t("parent-folder")}
                        <select
                            name="parentFolder"
                            className={styles.edit__folder__dialog__form__select}
                            // @ts-ignore
                            defaultValue={editFolderData.parentFolder ? editFolderData.parentFolder : null}
                            onChange={() =>
                                setUpdatedFolder({
                                    ...updatedFolder,
                                    // @ts-ignore
                                    parentFolder: event.target.value,
                                })
                            }
                        >
                            <option value="null">{t("no-parent-folder")}</option>
                            {folderList &&
                                folderList.map((folder: BookmarkFolder) => (
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
            <div className={styles.edit__folder__dialog__buttons}>
                <button
                    disabled={updatedFolder.title && updatedFolder.description ? false : true}
                    onClick={() => editFolder()}
                >
                    {loading ? <Spinner /> : t("update")}
                </button>
                <button onClick={() => closeDialog()}>{t("close")}</button>
            </div>
        </dialog>
    ) : null

    return dialog
}

export default EditFolderDialog
