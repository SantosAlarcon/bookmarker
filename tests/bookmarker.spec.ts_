import { test, expect, describe } from "playwright/test"

describe("Main tests", () => {
    // Before every test, it goes to the homepage
    test.beforeEach(async ({ page }) => {
        await page.goto("localhost:3000")
    })

    test("Create a bookmark", async ({ page }) => {
        await page.getByLabel("New Bookmark").click()
        await page.getByPlaceholder("Bookmark title").fill("Distrowatch")
        await page
            .getByPlaceholder("Bookmark URL")
            .fill("https://www.distrowatch.com")
        await page.getByText("Create").click()
        await expect(page.getByRole("link", { name: "Distrowatch" })).toBeVisible()
    })

    test("Edit the Distrowatch bookmark to include it in the Linux folder", async ({
        page,
    }) => {
        await page
            .locator("div")
            .filter({ hasText: /^Distrowatch$/ })
            .getByLabel("Edit bookmark")
            .click()
        await page
            .getByRole("combobox")
            .selectOption("890e5294-b54f-42ad-9142-9eb1da8f3be0")
        await page.getByRole("button", { name: "Modify" }).click()
        await page.getByRole("heading", { name: "Blogs de Linux" }).click()
        await expect(page.getByRole("link", { name: "Distrowatch" })).toBeVisible()
    })

    test("Delete a bookmark", async ({ page }) => {
        await page.getByRole("heading", { name: "Blogs de Linux" }).click()
        await page.getByText('DistrowatchDelete item').click();
        await page.getByRole("button", { name: "Delete" }).click()
    })
})
