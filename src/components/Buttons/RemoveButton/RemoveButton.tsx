"use client"
import Image from "next/image"
import React from "react"
import styles from "./RemoveButton.module.scss"
import { modalStore } from "@/store/modalStore"

interface RemoveProps {
  children: {
    id: string
    title: string
  }
}

const RemoveButton = ({ children }: RemoveProps) => {
  const showDeleteConfirmDialog = modalStore(
    (state) => state.showDeleteConfirmModal
  )
  const setDeleteProps = modalStore((state) => state.setDeleteProps)
  const { id, title } = children

  const handleClick = () => {
    setDeleteProps(id, title)
    showDeleteConfirmDialog()
  }

  return (
    <button className={styles.remove__button} onClick={handleClick}>
      <Image width={24} height={24} src="/trash-icon.svg" alt="Trash icon" />
    </button>
  )
}

export default RemoveButton
