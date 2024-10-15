import { createClient } from "@/app/utils/supabase/client";

export default async function deleteFolder(id: string) {
    const supabase = createClient();
    const { error } = await supabase
        .from("folders")
        .delete()
        .eq("folder_id", id);
    if (error) {
        throw new Error(error.message);
    }
}
