"use client"
import Image from "next/image"
import React from "react"
import styles from "./RemoveButton.module.scss"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"

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
    <button className={styles.remove__button} id="remove__button" onClick={handleClick}>
	    <Tooltip anchorSelect="#remove__button" place="top" content="Remove item"  />
      <Image width={24} height={24} src="/trash-icon.svg" alt="Trash icon" />
    </button>
  )
}

export default RemoveButton
