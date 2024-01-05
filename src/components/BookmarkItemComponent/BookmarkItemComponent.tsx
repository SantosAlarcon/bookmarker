import Link from "next/link"
import styles from "./BookmarkItemComponent.module.scss"
import Image from "next/image"
import { contextMenu } from "react-contexify"
import {displayBookmarkMenu} from "../BookmarkContextMenu/BookmarkContextMenu"

interface BICProps {
    children: {
        id: string,
        favicon: string
        title: string
        description: string
        url: string
    }
}

const BookmarkItemComponent = (props: BICProps) => {

    return (
        <div
            className={styles.bookmark__item__container}
            title={props.children.description}
        >
            <div className={styles.bookmark__item__icon}>
                {props?.children.favicon ? (
                    <img
                        width={16}
                        height={16}
                        alt="Folder icon"
                        src={props.children.favicon}
                    />
                ) : (
                    <Image width={16} height={16} alt="Folder icon" src="/bookmark.svg" />
                )}
            </div>
            <Link
                className={styles.bookmark__item__link}
                href={`${props.children.url}`}
                target="_blank"
            >
                <div className={styles.bookmark__item__title}>
                    <h4 className={styles.bookmark__item__title__text}>
                        {props.children.title}
                    </h4>
                </div>
            </Link>
            
            <div
                className={styles.bookmark__item__menu}
            >
                <button onClick={(e) => displayBookmarkMenu(e)}>
                    <Image
                        width={16}
                        height={16}
                        alt="Menu icon"
                        src="/three-dots-vertical.svg"
                    />
                </button>
            </div>
        </div>
    )
}

export default BookmarkItemComponent
