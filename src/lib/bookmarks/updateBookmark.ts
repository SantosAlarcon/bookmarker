import { BookmarkItem } from "@/types/types";

interface updateInfo {
    title: string,
    descrition: string
}

const updateBookmark = async (id: string, bookmark: updateInfo) => {
    await fetch("/api/bookmarks", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(bookmark)
    })
}

export default updateBookmark;
