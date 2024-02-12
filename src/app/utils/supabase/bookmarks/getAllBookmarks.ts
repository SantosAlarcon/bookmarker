import { UserResponse} from "@supabase/supabase-js";
import { createClient } from "../client";

// This function gets all bookmarks from a user passed by an id

export default async function getAllBookmarks(id: string) {
	const supabase = createClient()
	const {data: user} = await supabase.auth.getUser()
	const {data: session} = await supabase.auth.getSession()
	console.table(session.session?.access_token);
	const { data, error } = await supabase.from("bookmarks").select("bookmark_title").eq("bookmark_user_id", user.user?.id)
	console.log("DATA: ", data);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
