import { createClient } from "../client";

export async function deleteBookmark(id: string) {
	const supabase = createClient();
	const { data, error } = await supabase.from("bookmarks").delete().eq("bookmark_id", id);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
