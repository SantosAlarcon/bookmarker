"use client"
import Image from "next/image"
import React from "react"
import styles from "./EditButton.module.scss"
import { modalStore } from "@/store/modalStore"

interface EditBookmarkProps {
    children: {
        id: string,
        title: string,
        url: string,
	parentFolder: string | null
    }
}

const EditBookmarkButton = ({children}: EditBookmarkProps) => {
    const showEditBookmarkDialog = modalStore((state) => state.showEditBookmarkModal);
    const modifyEditBookmarkData = modalStore((state) => state.modifyEditBookmarkData);
    const {id, title, url, parentFolder} = children;

    const handleClick = () => {
        modifyEditBookmarkData(id, title, url, parentFolder);
        showEditBookmarkDialog();
    }

  return (
    <button className={styles.edit__button} onClick={handleClick}>
      <Image width={24} height={24} src="/edit-icon.svg" alt="Edit icon" />
    </button>
  )
}

export default EditBookmarkButton
