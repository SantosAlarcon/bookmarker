"use client"
import Image from "next/image"
import React from "react"
import styles from "./EditButton.module.scss"
import { modalStore } from "@/store/modalStore"

interface EditFolderProps {
    children: {
        id: string,
        title: string,
        description: string
    }
}

const EditFolderButton = ({children}: EditFolderProps) => {
    const showEditFolderDialog = modalStore((state) => state.showEditFolderModal);
    const modifyEditFolderData = modalStore((state) => state.modifyEditFolderData);
    const {id, title, description} = children;

    const handleClick = () => {
        modifyEditFolderData(title, description);
        showEditFolderDialog();
    }

  return (
    <button className={styles.edit__button} onClick={handleClick}>
      <Image width={24} height={24} src="/edit-icon.svg" alt="Edit icon" />
    </button>
  )
}

export default EditFolderButton
