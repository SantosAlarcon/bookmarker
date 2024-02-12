// This function gets all bookmarks from a user passed by an id
export default async function getAllBookmarks(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/bookmarks`, {
        headers: {
            "apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
    })

    let data = await response.json();
    data.filter((bookmark) => bookmark.bookmark_user_id === id);

	return data;
}
