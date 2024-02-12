import getFavicon from "../../getFavicon";
import { createClient } from "../client";

interface BookmarkProps {
    title: string,
    url: string,
    parentFolder: string | null
}

export async function createNewBookmark(bookmark: BookmarkProps) {
	const supabase = createClient();
	const { data: {user} } = await supabase.auth.getUser()
	const { data, error } = await supabase.from("bookmarks").insert({
		bookmark_id: crypto.randomUUID(),
		bookmark_title: bookmark.title,
		bookmark_url: bookmark.url,
		bookmark_favicon: await getFavicon(bookmark.url),
		bookmark_parentfolder: bookmark.parentFolder,
		bookmark_user_id: user?.id
	})
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
