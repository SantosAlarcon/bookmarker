export type BookmarkFolder = {
    id: string,
    title: string,
    description?: string,
    favicon?: string | null
    children: [BookmarkFolder & BookmarkItem]
}

export type BookmarkItem = {
    id: string,
    title: string,
    url: string,
    favicon?: string | null
    parentFolder: string | null
}
