import { createClient } from "../server";

// This function returns all folders by user ID.
export const getAllFolders = async (userId: string) => {
    const supabase = await createClient();


    const { data, error } = await supabase
        .from("folders")
        .select()
        .eq("folder_user_id", userId)
        .order("folder_title", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }
    
    console.log("DATA:", data)

    // Returns the result of the query if there are no errors.
    return data;
};
