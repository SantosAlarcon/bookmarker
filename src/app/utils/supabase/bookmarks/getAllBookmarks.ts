import { BookmarkItem } from "@/types/types";

// This function gets all bookmarks from a user passed by an id
export default async function getAllBookmarks(id: string | string[]) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/bookmarks`, {
		// @ts-ignore
		headers: {
			"apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			"Authorization": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
		}
	})

	let data = await response.json();

	return data.filter((bookmark: BookmarkItem) => bookmark.bookmark_user_id === id);
}
