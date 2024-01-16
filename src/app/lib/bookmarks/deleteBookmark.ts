const deleteBookmark = async (id: string) => {
    const body = {
        id: id
    }
    await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export default deleteBookmark;
