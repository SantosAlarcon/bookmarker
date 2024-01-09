"use client"
import Image from "next/image"
import React from "react"
import styles from "./RemoveButton.module.scss"
import { modalStore } from "@/store"

const RemoveButton = () => {
    const showDeleteConfirmDialog = modalStore((state) => state.showDeleteConfirmModal);

    const handleClick = () => {
        showDeleteConfirmDialog();
    }

  return (
    <button className={styles.remove__button} onClick={handleClick}>
      <Image width={24} height={24} src="/trash-icon.svg" alt="Trash icon" />
    </button>
  )
}

export default RemoveButton
