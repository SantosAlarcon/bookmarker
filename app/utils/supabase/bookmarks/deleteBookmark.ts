import { createClient } from "../client";

export async function deleteBookmark(id: string) {
    const supabase = createClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("bookmark_id", id)
        .eq("bookmark_user_id", user.id);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
