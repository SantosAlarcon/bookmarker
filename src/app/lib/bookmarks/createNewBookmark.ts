import { type BookmarkFolder, type BookmarkItem } from "@/types/types"
import getFavicon from "@/utils/getFavicon"

interface NewBookmarkProps {
		title: string
		url: string
		parentFolder: BookmarkFolder | null
}

const createNewBookmark = async ({ title, url, parentFolder }: NewBookmarkProps) => {
	const newBookmark: BookmarkItem = {
		id: crypto.randomUUID(),
		title: title,
		url: url,
		favicon: await getFavicon(url),
		parentFolder: parentFolder,
	}

	await fetch("/api/bookmarks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newBookmark),
	})
}

export default createNewBookmark
