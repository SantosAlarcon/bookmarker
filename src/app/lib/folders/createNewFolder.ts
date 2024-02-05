import { createClient } from "@/app/utils/supabase/client";
import { type BookmarkFolder } from "@/types/types"
import { SupabaseClient } from "@supabase/supabase-js";

const createNewFolder = async (title: string, description: string) => {
    const supabase: SupabaseClient = createClient();
    const {data} = await supabase.auth.getSession()
	
    const newFolder: BookmarkFolder = {
		id: crypto.randomUUID(),
		title: title,
		description: description,
		children: [],
	}


	await fetch("/api/bookmarks/folders", {
		method: "POST",
        // @ts-ignore
		headers: {
			"Content-Type": "application/json",
            "Authorization": data.session?.access_token
		},
		body: JSON.stringify(newFolder),
	})
}

export default createNewFolder
