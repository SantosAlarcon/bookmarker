// Function that retrieves the bookmarks that belong to a specific folder from a Supabase DB with bookmark table
import { createClient } from "../client";

export default async function getChildrenBookmarks(folderId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("bookmark_title", { ascending: true })
        .eq("bookmark_parentfolder", folderId);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
