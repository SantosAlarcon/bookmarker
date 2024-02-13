import { BookmarkFolder } from "@/types/types";


// This function returns all folders by user ID.
export const getAllFolders = async(userId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/folders`, {
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
    })

    let data = await response.json();
    data.filter((folder: BookmarkFolder) => folder.folder_user_id === userId);

    return data;
}
