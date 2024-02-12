/*export type BookmarkFolder = {
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
}*/

export type BookmarkFolder = {
    folder_id: string,
    folder_title: string,
    folder_description: string,
    folder_children: []
}

export type BookmarkItem = {
    bookmark_id: string,
    bookmark_title: string,
    bookmark_url: string,
    bookmark_favicon: string,
    bookmark_user_id: string,
    bookmark_parentFolder: string | null
}
