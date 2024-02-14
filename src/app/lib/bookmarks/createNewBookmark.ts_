import getFavicon from "@/app/utils/getFavicon"
import { createClient } from "@/app/utils/supabase/client"
import { type BookmarkItem } from "@/types/types"
import { SupabaseClient } from "@supabase/supabase-js"

interface NewBookmarkProps {
		title: string
		url: string
		parentFolder: string | null
}

const createNewBookmark = async ({ title, url, parentFolder }: NewBookmarkProps) => {
    const supabase: SupabaseClient = createClient();
    const {data} = await supabase.auth.getSession()

    const newBookmark: BookmarkItem = {
		id: crypto.randomUUID(),
		title: title,
		url: url,
		favicon: await getFavicon(url),
		parentFolder: parentFolder,
	}

	await fetch("/api/bookmarks", {
		method: "POST",
        // @ts-ignore
		headers: {
            "Authorization": data.session?.access_token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newBookmark),
	})
}

export default createNewBookmark
