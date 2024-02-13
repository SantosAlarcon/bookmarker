import { createClient } from "@/app/utils/supabase/client";

interface UpdateFolderProps {
	title: string
	description: string
}

export default async function updateFolder(id: string, folder: UpdateFolderProps) {

	const supabase = createClient();
	const { error } = await supabase
		.from("folders")
		.update({
			folder_title: folder.title,
			folder_description: folder.description
		})
		.eq("folder_id", id)
	if (error) {
		throw new Error(error.message);
	}
}
