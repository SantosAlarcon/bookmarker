import { BookmarkFolder } from "@/types/types";

// This function returns all folders by user ID.
export const getAllFolders = async(userId: string) => {

    const headers: HeadersInit = {
	    // @ts-ignore
	    headers: {
		// @ts-ignore
		"apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		// @ts-ignore
		"Authorization": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	    }
    }

    // @ts-ignore
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/folders`, headers)

    let data = await response.json();

    return data.filter((folder: BookmarkFolder) => folder.folder_user_id === userId);
}
