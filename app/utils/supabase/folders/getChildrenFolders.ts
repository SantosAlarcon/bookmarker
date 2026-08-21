import { createClient } from "../client";

export const getChildrenFolders = async (folderId: string) => {
    const supabase = createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
        .from("folders")
        .select("*")
        .eq("folder_parentfolder", folderId)
        .eq("folder_user_id", user.id)
        .order("folder_title", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    // It returns the folders that are children of the parent folder
    return data;
};
