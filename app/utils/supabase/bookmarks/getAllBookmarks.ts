import { QueryClient } from "@tanstack/react-query";
import type { BookmarkItem } from "@/app/types/types";

// This function gets all bookmarks from a user passed by an id
const getAllBookmarks = async (id: string | string[]) => {
	const queryClient: QueryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["bookmarksData"],
		queryFn: async () =>
			fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/bookmarks`, {
				// @ts-ignore
				headers: {
					apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
					Authorization: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
				},
			}).then((res) => res.json()),
	});

	const bookmarks = queryClient.getQueryData(["bookmarksData"]);

	// @ts-ignore
	return bookmarks.filter(
		(bookmark: BookmarkItem) => bookmark.bookmark_user_id === id,
	);
};

export default getAllBookmarks;
