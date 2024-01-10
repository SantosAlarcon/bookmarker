const getAllBookmarks = async () => {
    const response = await fetch("/api/bookmarks");
    const json = response.json()
    return json;
}

export default getAllBookmarks;
