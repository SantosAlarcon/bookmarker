
const deleteFolder = async (id: string) => {
    await fetch(`/api/bookmarks/folders/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
    })
}

export default deleteFolder;
