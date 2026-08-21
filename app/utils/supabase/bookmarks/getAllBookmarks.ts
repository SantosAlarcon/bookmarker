import { createClient } from "../client";
import type { BookmarkItem } from "@/app/types/types";

// This function gets all bookmarks from a user passed by an id
const getAllBookmarks = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("bookmark_user_id", id)
        .order("bookmark_title", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return data as BookmarkItem[];
};

export default getAllBookmarks;
