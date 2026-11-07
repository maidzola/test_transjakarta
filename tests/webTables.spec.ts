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
    await expect(webTables.rowFor(user)).toContainText(user.email);
    await expect(webTables.rowFor(user)).toContainText(user.age);
    await expect(webTables.rowFor(user)).toContainText(user.salary);
    await expect(webTables.rowFor(user)).toContainText(user.department);
  }
});
