import { createClient } from "../client";

// This function returns all folders by user ID.
export const getAllFolders = async (userId: string) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("folders")
        .select()
        .eq("folder_user_id", userId)
        .order("folder_title", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }
    
    // Returns the result of the query if there are no errors.
    return data;
};
