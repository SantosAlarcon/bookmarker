// Function that retrieves the bookmarks that don't have any parent folder from a Supabase DB with bookmarks table.
// These bookmarks are rendered after the root folders.
import { createClient } from "../client";

export default async function getRootBookmarks(id: string) {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("bookmarks")
		.select("*")
        .eq("bookmark_user_id", id)
        .order("bookmark_title", { ascending: true }) // Order by the folder title alphabetically
		.is("bookmark_parentfolder",null); // Check if the parent folder is null
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
