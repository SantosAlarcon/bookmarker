const getAllSortedBookmarks = async () => {
    const response = await fetch("/api/bookmarks?sort=yes");
    const json = response.json()
    return json;
}

export default getAllSortedBookmarks;
