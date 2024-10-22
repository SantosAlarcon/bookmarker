import { createClient } from "../server";

// Root level folders are folder that don't have parent folder and are rendered first
export const getRootFolders = async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("folders")
        .select("*")
        .eq("folder_user_id", userId)
        .is("folder_parentfolder", null) // Do not use equal to check is the value is NULL. Instead use .is()
        .order("folder_title", { ascending: true }); // Order by the folder title alphabetically
    if (error) {
        throw new Error(error.message);
    }

    console.log(data);
    return data;
};
