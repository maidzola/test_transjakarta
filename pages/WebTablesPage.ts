import { type Locator, type Page } from "@playwright/test";
import { type CsvRecord } from "../utils/readCsv";

export class WebTablesPage {
  private readonly page: Page;
  private readonly addButton: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly age: Locator;
  private readonly salary: Locator;
  private readonly department: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator("#addNewRecordButton");
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.age = page.locator("#age");
    this.salary = page.locator("#salary");
    this.department = page.locator("#department");
    this.submitButton = page.locator("#submit");
  }

  async goto(): Promise<void> {
    await this.page.goto("/webtables");
  }

  async addUser(user: CsvRecord): Promise<void> {
    await this.addButton.click();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.age.fill(user.age);
    await this.salary.fill(user.salary);
    await this.department.fill(user.department);
    await this.submitButton.click();
  }

  rowFor(user: CsvRecord): Locator {
    return this.page.getByRole("row").filter({
      has: this.page.getByRole("cell", { name: user.email, exact: true }),
    });
  }
}
