import Link from "next/link";
import styles from "./BookmarkItemComponent.module.scss";
import Image from "next/image";
import RemoveBookmarkButton from "../Buttons/RemoveBookmarkButton/RemoveButton";
import EditBookmarkButton from "../Buttons/EditBookmarkButton/EditBookmarkButton";

interface BICProps {
    children: {
        bookmark_id: string;
        bookmark_favicon: string;
        bookmark_title: string;
        bookmark_url: string;
        bookmark_parentfolder: string | null;
    };
}

const BookmarkItemComponent = (props: BICProps) => {
    return (
        <div className={styles.bookmark__item__container}>
            {props?.children.bookmark_favicon ? (
                <img
                    alt="Favicon"
                    src={props.children.bookmark_favicon}
                    className={styles.bookmark__item__favicon}
                    loading="eager"
                />
            ) : (
                <Image
                    width={16}
                    height={16}
                    alt="Bookmark icon"
                    src="/icons/bookmark.svg"
                    priority={true}
                />
            )}
            <Link
                className={styles.bookmark__item__link}
                href={`${props.children.bookmark_url}`}
                target="_blank"
                aria-label={props.children.bookmark_title}
            >
                <div className={styles.bookmark__item__title}>
                    <h4 className={styles.bookmark__item__title__text}>
                        {props.children.bookmark_title}
                    </h4>
                </div>
            </Link>
            <EditBookmarkButton>{props.children}</EditBookmarkButton>
            <RemoveBookmarkButton>{props.children}</RemoveBookmarkButton>
        </div>
    );
};

export default BookmarkItemComponent;
