export type BookmarkFolder = {
    folder_id: string,
    folder_title: string,
    folder_description: string,
    folder_user_id: string,
    folder_parentfolder: string
}

export type BookmarkItem = {
    bookmark_id: string,
    bookmark_title: string,
    bookmark_url: string,
    bookmark_favicon: string,
    bookmark_user_id: string,
    bookmark_parentfolder: string | null
}
