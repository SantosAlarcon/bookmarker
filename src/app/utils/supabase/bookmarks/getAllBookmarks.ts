import { createClient } from "@supabase/supabase-js";

// This function gets all bookmarks from a user passed by an id

export default async function getAllBookmarks(id: string) {
	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
	const { data, error } = await supabase.from("bookmarks").select("*").filter("bookmark_user_id", "eq", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
