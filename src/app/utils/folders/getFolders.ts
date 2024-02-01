export const getFolders = async () => {
	const response = await fetch("/api/bookmarks/folders")
	const result = await response.json()

	return result
}
