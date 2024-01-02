export type BookmarkFolder = {
    id: string,
    title: string,
    description?: string,
    icon?: string
    links: BookmarkItem[]
}

export type BookmarkItem = {
    id: string,
    title: string,
    url: string,
    description?: string,
    favourite: boolean,
    icon?: string
    bookmarkFolder: BookmarkFolder | null
}
