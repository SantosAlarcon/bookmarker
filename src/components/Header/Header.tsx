"use client"
import React from "react"
import Image from "next/image"
import NewBookmarkDialog from "../Dialogs/NewBookmarkDialog/NewBookmarkDialog"
import NewFolderDialog from "../Dialogs/NewFolderDialog/NewFolderDialog"
import { modalStore } from "@/store/modalStore"
import { Tooltip } from "react-tooltip"
import styles from "./Header.module.scss"
import tooltipStyles from "@/app/tooltip.module.scss"
import { updateSortedBookmarkList } from "@/app/utils/updateSortedBookmarkList"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const Header = () => {
    const showNewBookmarkModal = modalStore((state) => state.showNewBookmarkModal)
    const showNewFolderModal = modalStore((state) => state.showNewFolderModal)

    const router = useRouter()

    const handleNewBookmark = async () => {
        showNewBookmarkModal()
    }
    const handleNewFolder = async () => {
        showNewFolderModal()
    }

    const handleAuth = async () => {
        router.push("/auth/register")
    }

    const handleSort = async () => {
        await updateSortedBookmarkList()
        router.refresh()
        toast.success(
            "Bookmarks, folders and children are now sorted alfabetically!"
        )
    }
    return (
        <>
            <NewBookmarkDialog title="New bookmark"></NewBookmarkDialog>
            <NewFolderDialog title="New Folder"></NewFolderDialog>
            <header className={styles.header__container}>
                <div className={styles.header__logo} onClick={() => router.push("/")}>
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
                            id="new-bookmark-tooltip"
                            aria-label="New Bookmark"
                        >
                            <Tooltip
                                anchorSelect="#new-bookmark-tooltip"
                                place="bottom"
                                variant="info"
                                className={tooltipStyles.custom__tooltip}
                                content="New bookmark"
                            />
                            <Image
                                width={32}
                                height={32}
                                src="/add-bookmark-icon.svg"
                                alt="New bookmark icon"
                            />
                        </button>
                    </div>
                    <div className={styles.header__links__new__folder}>
                        <button
                            onClick={handleNewFolder}
                            className={styles.header__links__button}
                            id="new-folder-tooltip"
                            aria-label="New Folder"
                        >
                            <Tooltip
                                anchorSelect="#new-folder-tooltip"
                                place="bottom"
                                variant="info"
                                className={tooltipStyles.custom__tooltip}
                                content="New folder"
                            />
                            <Image
                                width={32}
                                height={32}
                                src="/add-folder-icon.svg"
                                alt="New folder icon"
                            />
                        </button>
                    </div>
                    <div className={styles.header__links__sort}>
                        <button
                            onClick={handleSort}
                            className={styles.header__links__button}
                            id="sort-tooltip"
                            aria-label="Sort by name"
                        >
                            <Tooltip
                                anchorSelect="#sort-tooltip"
                                place="bottom"
                                variant="info"
                                className={tooltipStyles.custom__tooltip}
                                content="Sort by name"
                            />
                            <Image
                                width={32}
                                height={32}
                                src="/sort-icon.svg"
                                alt="Sort icon"
                            />
                        </button>
                    </div>
                    <div className={styles.header__links__auth}>
                        <button
                            onClick={handleAuth}
                            className={styles.header__links__button}
                            id="auth-tooltip"
                            aria-label="Login"
                        >
                            <Tooltip
                                anchorSelect="#auth-tooltip"
                                place="bottom"
                                variant="info"
                                className={tooltipStyles.custom__tooltip}
                                content="Login"
                            />
                            <Image
                                width={32}
                                height={32}
                                src="/user.svg"
                                alt="User icon"
                            />
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
