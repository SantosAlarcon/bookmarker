import { createClient } from "../client";
import { getUser } from "../getUser";

interface FolderProps {
    title: string;
    description: string;
    parentFolder: string | null;
}

export async function createNewFolder(folder: FolderProps) {
    const supabase = createClient();
    const user = await getUser();
    const { error } = await supabase.from("folders").insert({
        folder_id: crypto.randomUUID(),
        folder_title: folder.title,
        folder_description: folder.description,
        folder_parentfolder: folder.parentFolder,
        folder_user_id: user?.id,
    });
    if (error) {
        throw new Error(error.message);
    }
}
