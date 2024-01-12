import Link from "next/link"
import styles from "./BookmarkItemComponent.module.scss"
import Image from "next/image"
import RemoveButton from "../Buttons/RemoveButton/RemoveButton"
import EditBookmarkButton from "../Buttons/EditBookmarkButton/EditBookmarkButton"

interface BICProps {
	children: {
		id: string
		favicon: string
		title: string
		url: string
		parentFolder: string | null
	}
}

const BookmarkItemComponent = (props: BICProps) => {
	return (
		<div className={styles.bookmark__item__container}>
			<div className={styles.bookmark__item__icon}>
				{props?.children.favicon ? (
					<picture>
						<img
							width={16}
							height={16}
							alt="Folder icon"
							src={props.children.favicon}
						/>
					</picture>
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
			<EditBookmarkButton>{props.children}</EditBookmarkButton>
			<RemoveButton>{props.children}</RemoveButton>
		</div>
	)
}

export default BookmarkItemComponent
