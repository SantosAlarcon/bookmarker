import { QueryClient } from "@tanstack/react-query";
import type { BookmarkFolder } from "@/app/types/types";

export const getFolderById = async (folderId: string) => {
	const queryClient: QueryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["foldersData"],
		queryFn: async () =>
			fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/folders`, {
				// @ts-ignore
				headers: {
					apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
					Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
				},
			}).then((res) => res.json()),
	});

	const folders = queryClient.getQueryData(["foldersData"]);

	// @ts-ignore
	return folders.filter(
		(folder: BookmarkFolder) => folder.folder_id === folderId,
	);
};
