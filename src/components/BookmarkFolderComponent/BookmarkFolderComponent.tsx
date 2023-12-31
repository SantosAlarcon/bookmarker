import React, { useState } from "react"
import styles from "./BookmarkFolderComponent.module.scss"
import { BookmarkItem, BookmarkFolder } from "@/types/types"
import Image from "next/image"
import BookmarkItemComponent from "../BookmarkItemComponent/BookmarkItemComponent"
import RemoveButton from "../Buttons/RemoveButton/RemoveButton"
import EditFolderButton from "../Buttons/EditFolderButton/EditFolderButton"

interface BFCProps {
  children: {
    id: string
    favicon: string
    title: string
    description: string
    children: [BookmarkFolder | BookmarkItem]
  }
}

const BookmarkFolderComponent = (props: BFCProps) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={styles.bookmark__folder__container}>
      <details open={expanded}>
        <summary>
          <div className={styles.bookmark__folder__mark}>
            <Image
              width={16}
              height={16}
              alt="Marker"
              src="/triangle.svg"
              className={styles.bookmark__folder__mark__icon}
              style={expanded ? { rotate: "90deg" } : { rotate: "0deg" }}
            />
          </div>
          <div className={styles.bookmark__folder__icon}>
            {props?.children.favicon ? (
              <Image
                width={32}
                height={32}
                alt="Folder icon"
                src={props.children.favicon}
              />
            ) : (
              <Image
                width={32}
                height={32}
                alt="Folder icon"
                src="/folder.svg"
              />
            )}
          </div>
          <div
            className={styles.bookmark__folder__title}
            title={props.children.description}
            onClick={() => setExpanded(!expanded)}
          >
            <h4 className={styles.bookmark__folder__title__text}>
              {props.children.title}
            </h4>
          </div>
          <EditFolderButton>{props.children}</EditFolderButton>
          <RemoveButton>{props.children}</RemoveButton>
        </summary>

        {/* Render children links if there any */}
        {props.children.children?.length > 0 && (
          <ul className={styles.bookmark__folder__links}>
            {props.children.children?.map((childItem) => {
              if ("children" in childItem) {
                ;<li>
                  <BookmarkFolderComponent key={childItem.id}>
                    {childItem}
                  </BookmarkFolderComponent>
                </li>
              } else {
                ;<li>
                  <BookmarkItemComponent key={childItem.id}>
                    {childItem}
                  </BookmarkItemComponent>
                </li>
              }
            })}
          </ul>
        )}
      </details>
    </div>
  )
}

export default BookmarkFolderComponent
