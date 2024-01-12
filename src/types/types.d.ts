export type BookmarkFolder = {
    id: string,
    title: string,
    description: string,
    children: []
}

export type BookmarkItem = {
    id: string,
    title: string,
    url: string,
    favicon: string
    parentFolder: string | null
}
