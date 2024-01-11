
import getFavicon from "@/app/utils/getFavicon";
import { BookmarkFolder, BookmarkItem } from "@/types/types";

interface updateInfo {
    title: string,
    description: string,
    children: [BookmarkFolder & BookmarkItem]
}

const updateFolder = async (id: string, folder: updateInfo) => {
    const updatedFolder: BookmarkFolder = {
        id: id,
        title: folder.title,
        description: folder.description,
        children: folder.children
    }
    await fetch("/api/bookmarks", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedFolder)
    })
}

export default updateFolder;
