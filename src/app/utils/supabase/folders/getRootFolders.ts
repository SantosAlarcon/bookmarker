import { createClient } from "../client";

// Root level folders are folder that don't have parent folder and are rendered first
export const getRootFolders = async(userId: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("folders")
		.select("*")
		.eq("folder_parentfolder", null)
		.eq("folder_user_id", userId);
	if (error) {
		throw new Error(error.message);
	}
	console.log("DATA: ", data);
	return data;
}
