import { expect, test } from "@playwright/test";
import { DroppablePage } from "../pages/DroppablePage";

test("menyeret elemen ke area target", async ({ page }) => {
  const droppable = new DroppablePage(page);

  await droppable.goto();
  await droppable.drop();

  await expect(droppable.dropTarget).toContainText("Dropped!");
});
