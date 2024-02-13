import { BookmarkFolder } from "@/types/types";

export const getFolderById = async(folderId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/folders`, {
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
    })

    let data = await response.json();
    data.filter((folder: BookmarkFolder) => folder.folder_id === folderId);

    return data;
}
