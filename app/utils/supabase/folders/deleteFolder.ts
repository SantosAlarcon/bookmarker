import { createClient } from "@/app/utils/supabase/client";

export default async function deleteFolder(id: string) {
    const supabase = createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error("User not authenticated");
    }
    const { error } = await supabase
        .from("folders")
        .delete()
        .eq("folder_id", id)
        .eq("folder_user_id", user.id);
    if (error) {
        throw new Error(error.message);
    }
}
