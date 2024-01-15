"use client"
import styles from "./EditBookmarkDialog.module.scss"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { modalStore } from "@/store/modalStore"
import { toast } from "sonner"
import updateBookmark from "@/app/lib/bookmarks/updateBookmark"
import { updateBookmarkList } from "@/app/utils/updateBookmarkList"
import { BookmarkFolder } from "@/types/types"
import { getFolders } from "@/app/utils/getFolders"

type Props = {
  title: string
}

interface EditBookmarkState {
  title: string
  url: string
  parentFolder: string | null
}

const EditBookmarkDialog = ({ title }: Props) => {
  const editBookmarkData = modalStore((state) => state.editBookmarkData)
  const editBookmarkModal = modalStore((state) => state.editBookmarkModal)
  const hideEditBookmarkDialog = modalStore(
    (state) => state.hideEditBookmarkModal
  )
  const [newBookmark, setNewBookmark] = useState<EditBookmarkState>({
    title: editBookmarkData.title,
    url: editBookmarkData.url,
    parentFolder: editBookmarkData.parentFolder,
  })

  const [folders, setFolders] = useState<BookmarkFolder[]>([])

  const dialogRef = useRef<null | HTMLDialogElement>(null)

  useEffect(() => {
    if (editBookmarkModal) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [editBookmarkModal])

  useEffect(() => {
    const getFolderList = async () => {
      const folderList = await getFolders()
      setFolders(folderList)
    }
    getFolderList()
  }, [])

  useEffect(() => {
    setNewBookmark({
      title: editBookmarkData.title,
      url: editBookmarkData.url,
      parentFolder: editBookmarkData.parentFolder,
    })
  }, [editBookmarkData])

  const closeDialog = async () => {
    dialogRef.current?.close()
    hideEditBookmarkDialog()
    setNewBookmark({
      title: "",
      url: "",
      parentFolder: null,
    })
  }

  const editBookmark = async () => {
    const regExpURL: RegExp = new RegExp(
      "(?:https?)://(?:www.)?[a-z0-9-]+.[a-z]{2,6}(?::d+)?(/|/[a-z0-9-_.?&=#]+)?"
    )

    if (!regExpURL.test(newBookmark.url)) {
      alert("El formato de la URL es incorrecta")
    } else {
      await updateBookmark(editBookmarkData.id, newBookmark)
      updateBookmarkList()
      closeDialog()
      toast.success("Bookmark updated successfully")
    }
  }

  const dialog: JSX.Element | null =
    editBookmarkModal === true ? (
      <dialog
        ref={dialogRef}
        className={styles.edit__bookmark__dialog__container}
        onClose={closeDialog}
      >
        <div className={styles.edit__bookmark__dialog__title}>
          <Image
            src="/edit-icon.svg"
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
              className={styles.edit__bookmark__dialog__form__label}
            >
              Title
              <input
                type="text"
                name="title"
                placeholder="Bookmark title"
                onChange={() =>
                  // @ts-ignore
                  setNewBookmark({ ...newBookmark, title: event.target.value })
                }
                value={newBookmark.title}
                required
              />
            </label>
            <label
              htmlFor="url"
              className={styles.edit__bookmark__dialog__form__label}
            >
              URL
              <input
                type="url"
                name="url"
                placeholder="Bookmark URL"
                onChange={() =>
                  // @ts-ignore
                  setNewBookmark({ ...newBookmark, url: event.target.value })
                }
                value={newBookmark.url}
                required
              />
            </label>
            <label
              htmlFor="parentFolder"
              className={styles.edit__bookmark__dialog__form__label}
            >
              Parent folder
              <select
                name="parentFolder"
                defaultValue={newBookmark.parentFolder}
                className={styles.edit__bookmark__dialog__form__select}
                onChange={() =>
                  // @ts-ignore
                  setNewBookmark({
                    ...newBookmark,
                    parentFolder: event.target.value,
                  })
                }
              >
                <option value="null">No parent folder</option>
                {folders &&
                  folders.map((folder: BookmarkFolder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.title}
                    </option>
                  ))}
              </select>
            </label>
          </form>
        </div>
        <div className={styles.edit__bookmark__dialog__buttons}>
          <button
            disabled={newBookmark.title && newBookmark.url ? false : true}
            onClick={() => editBookmark()}
          >
            Modify
          </button>
          <button onClick={() => closeDialog()}>Close</button>
        </div>
      </dialog>
    ) : null

  return dialog
}

export default EditBookmarkDialog
