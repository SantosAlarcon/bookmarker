import { folderStore } from "@/store/folderStore";
import { getAllFolders } from "./supabase/folders/getAllFolders";

export const updateFolderList = async (userId: string) => {
    const setFolderList = folderStore.getState().setFolderList;
    const folderList = await getAllFolders(userId);
    // @ts-ignore
    setFolderList(folderList);
};
