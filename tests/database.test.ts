// Import bun test libraries

import getAllBookmarks from "@/app/utils/supabase/bookmarks/getAllBookmarks";
import { test, expect, describe } from "bun:test";

describe("Database tests", () => {
    test("Get all bookmarks by user ID", async () => {
        const data = await getAllBookmarks(
            "45b138bd-7167-4383-ad4a-67672f8f2742",
        );
        expect(data.length).toBeGreaterThan(0);
    });
});
