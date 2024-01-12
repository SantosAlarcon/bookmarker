import { type BookmarkFolder } from "@/types/types"

const createNewFolder = async (title: string, description: string) => {
	const newFolder: BookmarkFolder = {
		id: crypto.randomUUID(),
		title: title,
		description: description,
		children: [],
	}

	await fetch("/api/bookmarks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newFolder),
	})
}

export default createNewFolder
