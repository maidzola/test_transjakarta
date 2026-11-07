import { expect, test } from "@playwright/test";
import { WebTablesPage } from "../pages/WebTablesPage";
import { readCsv, usersCsvPath } from "../utils/readCsv";

test("menambahkan semua user dari CSV ke Web Tables", async ({ page }) => {
  const users = await readCsv(usersCsvPath);
  const webTables = new WebTablesPage(page);

  await webTables.goto();

  for (const user of users) {
    await webTables.addUser(user);
    await expect(webTables.rowFor(user)).toContainText(user.firstName);
    await expect(webTables.rowFor(user)).toContainText(user.lastName);
  }

  for (const user of users) {
    await expect(webTables.rowFor(user)).toContainText(user.email);
    await expect(webTables.rowFor(user)).toContainText(user.department);
  }
});
