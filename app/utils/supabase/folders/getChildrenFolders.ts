import { createClient } from "../client";

export const getChildrenFolders = async (folderId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("folders")
        .select("*")
        .eq("folder_parentfolder", folderId)
        .order("folder_title", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    // It returns the folders that are children of the parent folder
    return data;
};
