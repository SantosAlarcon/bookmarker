import getFavicon from "@/app/utils/getFavicon";
import { BookmarkItem } from "@/types/types";

interface updateInfo {
    title: string,
    url: string,
    parentFolder: string | null
}

const updateBookmark = async (id: string, bookmark: updateInfo) => {
    const updatedBookmark: BookmarkItem = {
        id: id,
        title: bookmark.title,
        url: bookmark.url,
        favicon: await getFavicon(bookmark.url),
        parentFolder: bookmark.parentFolder
    }
    await fetch("/api/bookmarks", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedBookmark)
    })
}

export default updateBookmark;
