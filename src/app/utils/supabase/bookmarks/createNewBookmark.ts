import { User, createClient } from "@supabase/supabase-js";

export async function createNewBookmark(id) {
	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
	/*const { data } = await supabase.auth.getUser()
	console.log(data)*/
	const { data, error } = await supabase.from("bookmarks").insert({
		bookmark_id: crypto.randomUUID(),
		bookmark_title: "YouTube",
		bookmark_url: "https://www.youtube.es",
		bookmark_favicon: "https://www.youtube.es/favicon.ico",
		bookmark_parentfolder: null,
		bookmark_user_id: id
	})
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
