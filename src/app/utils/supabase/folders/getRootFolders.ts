import { createClient } from "../client";

// Root level folders are folder that don't have parent folder and are rendered first
export const getRootFolders = async(userId: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("folders")
		.select("*")
        .eq("folder_user_id", userId)
		.is("folder_parentfolder", null) // Do not use equal to check is the value is NULL. Instead use .is()
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
