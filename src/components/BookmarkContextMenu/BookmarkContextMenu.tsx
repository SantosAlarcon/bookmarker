import React from "react"
import { Menu, Item, useContextMenu, ItemParams, contextMenu } from "react-contexify"
import "react-contexify/ReactContexify.css"

const MENU_ID = "bookmarkMenu"

interface ItemProps {
    key: string
}

type ItemData = any

const BookmarkContextMenu = () => {
    const { show } = useContextMenu({
        id: MENU_ID,
    })

    const displayBookmarkMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        contextMenu.show({
            event,
            id: MENU_ID
        })
    }

    const handleItemClick = ({
        id,
        event,
        props,
        data,
        triggerEvent,
    }: ItemParams<ItemProps, ItemData>) => {
        switch (id) {
            case "edit":
                break
            case "remove":
                break
        }
    }

    return (
        <div>
            <Menu id={MENU_ID} animation="fade">
                <Item id="edit" onClick={handleItemClick}>
                    Edit
                </Item>
                <Item id="remove" onClick={handleItemClick}>
                    Remove
                </Item>
            </Menu>
        </div>
    )
}

export default BookmarkContextMenu
