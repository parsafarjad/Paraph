import { expect, test } from "@playwright/test";

test("shows the login form", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "ورود به باشگاه مشتریان" })).toBeVisible();
  await expect(page.getByLabel("شماره موبایل")).toBeVisible();
});
