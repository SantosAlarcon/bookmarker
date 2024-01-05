export type BookmarkFolder = {
    id: string,
    title: string,
    description?: string,
    favicon?: string
    children: [BookmarkFolder | BookmarkItem]
}

export type BookmarkItem = {
    id: string,
    title: string,
    url: string,
    description?: string,
    favicon?: string
    parentFolder: BookmarkFolder | null
}
