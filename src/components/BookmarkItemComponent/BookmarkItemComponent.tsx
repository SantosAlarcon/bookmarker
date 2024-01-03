import Link from "next/link"
import styles from "./BookmarkItemComponent.module.scss"
import Image from "next/image"
import { useState } from "react"

interface BICProps {
    children: {
        id: string,
        favicon: string
        title: string
        description: string
        url: string
        favourite: boolean
    }
}

const BookmarkItemComponent = (props: BICProps) => {
    const [favourited, setFavourited] = useState(props.children.favourite)

    const changeFavourited = (id: string) => {
        setFavourited(!favourited);
    }

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
                    <img width={16} height={16} alt="Folder icon" src="/bookmark.svg" />
                )}
            </div>
            <Link
                className={styles.bookmark__item__link}
                href={props.children.url}
                target="_blank"
            >
                <div className={styles.bookmark__item__title}>
                    <h4 className={styles.bookmark__item__title__text}>
                        {props.children.title}
                    </h4>
                </div>
            </Link>
            <div
                className={styles.bookmark__item__favourite}
                onClick={() => changeFavourited(props.children.id)}
            >
                {props.children.favourite ? (
                    <Image width={16} height={16} alt="Favorite icon" src="/star.svg" />
                ) : (
                    <Image
                        width={16}
                        height={16}
                        alt="Unfavourite icon"
                        src="/empty-star.svg"
                    />
                )}
            </div>
        </div>
    )
}

export default BookmarkItemComponent
