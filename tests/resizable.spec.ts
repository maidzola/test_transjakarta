import { expect, test } from "@playwright/test";
import { ResizablePage } from "../pages/ResizablePage";

test("mengubah ukuran elemen menjadi 400 x 200 piksel", async ({ page }) => {
  const resizable = new ResizablePage(page);

  await resizable.goto();
  await resizable.resizeTo(400, 200);

  await expect
    .poll(() => resizable.dimensions())
    .toEqual({ width: 400, height: 200 });
});
