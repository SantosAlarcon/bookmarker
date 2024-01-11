import { BookmarkFolder } from "@/types/types";

export const getFolderNames = async () => {
    const response = await fetch("/api/bookmarks/folders");
    const result = await response.json()

    const folderList: string[] = []
    result.map((folder: BookmarkFolder) => folderList.push(folder.title))

    return folderList
}
