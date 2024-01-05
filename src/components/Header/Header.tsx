"use client"
import React from "react"
import Image from "next/image"
import styles from "./Header.module.scss"
import { toast } from "sonner"
import NewBookmarkDialog from "../NewBookmarkDialog/NewBookmarkDialog"
import NewFolderDialog from "../NewFolderDialog/NewFolderDialog"
import EditFolderDialog from "../EditFolderDialog/EditFolderDialog"
import EditBookmarkDialog from "../EditBookmarkDialog/EditBookmarkDialog"
import { useRouter } from "next/navigation"


const Header = () => {
    const router = useRouter();

  const handleNewBookmark = async () => {
    router.push("?showNewBookmarkDialog=y")
  }
  const handleNewFolder = async () => {
    router.push("?showNewFolderDialog=y")
  }
  return (
    <>
      <NewBookmarkDialog title="New bookmark"></NewBookmarkDialog>
      <EditBookmarkDialog title="New bookmark"></EditBookmarkDialog>
      <NewFolderDialog title="New Folder"></NewFolderDialog>
      <EditFolderDialog title="New Folder"></EditFolderDialog>
      <header className={styles.header__container}>
        <div className={styles.header__logo}>
          <Image
            src="/BookmarkerLogo.svg"
            width="128"
            height="128"
            alt="Logo"
            priority={true}
            className={styles.header__logo_img}
          />
        </div>
        <div className={styles.header__links}>
          <div className={styles.header__links__new__boomark}>
            <button
              onClick={handleNewBookmark}
              className={styles.header__links__button}
            >
              <Image
                width={40}
                height={40}
                src="/add-bookmark-icon.svg"
                alt="New bookmark icon"
              />
            </button>
          </div>
          <div className={styles.header__links__new__folder}>
            <button
              onClick={handleNewFolder}
              className={styles.header__links__button}
            >
              <Image
                width={40}
                height={40}
                src="/add-folder-icon.svg"
                alt="New folder icon"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
