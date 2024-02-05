import { createClient } from "@/app/utils/supabase/client"
import { BookmarkFolder } from "@/types/types"
import { SupabaseClient } from "@supabase/supabase-js"

interface updateInfo {
    title: string
    description: string
    children: []
}

const updateFolder = async (id: string, folder: updateInfo) => {
    const supabase: SupabaseClient = createClient();
    const { data } = await supabase.auth.getSession()

    const updatedFolder: BookmarkFolder = {
        id: id,
        title: folder.title,
        description: folder.description,
        children: folder.children,
    }
    await fetch(`/api/bookmarks/folders/${id}`, {
        method: "PUT",
        // @ts-ignore
        headers: {
            "Content-type": "application/json",
            "Authorization": data.session?.access_token
        },
        body: JSON.stringify(updatedFolder),
    })
}

export default updateFolder
