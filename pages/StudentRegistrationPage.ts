import { type Locator, type Page } from "@playwright/test";

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
  genderId: number;
  mobile: string;
  dateOfBirth: string;
  subject: string;
  hobbyId: number;
  address: string;
  state: string;
  city: string;
}

export class StudentRegistrationPage {
  private readonly page: Page;
  readonly confirmationModal: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly mobile: Locator;
  private readonly dateOfBirth: Locator;
  private readonly subjects: Locator;
  private readonly address: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");
    this.mobile = page.locator("#userNumber");
    this.dateOfBirth = page.locator("#dateOfBirthInput");
    this.subjects = page.locator("#subjectsInput");
    this.address = page.locator("#currentAddress");
    this.submitButton = page.locator("#submit");
    this.confirmationModal = page.locator(".modal-content");
  }

  async goto(): Promise<void> {
    await this.page.goto("/automation-practice-form");
  }

  async fillAndSubmit(student: Student): Promise<void> {
    await this.firstName.fill(student.firstName);
    await this.lastName.fill(student.lastName);
    await this.email.fill(student.email);
    await this.page
      .locator(`label[for="gender-radio-${student.genderId}"]`)
      .click();
    await this.mobile.fill(student.mobile);
    await this.dateOfBirth.fill(student.dateOfBirth);
    await this.dateOfBirth.press("Enter");
    await this.subjects.fill(student.subject);
    await this.page
      .locator(".subjects-auto-complete__option")
      .filter({
        hasText: student.subject,
      })
      .click();
    await this.page
      .locator(`label[for="hobbies-checkbox-${student.hobbyId}"]`)
      .click();
    await this.address.fill(student.address);
    await this.page.locator("#state").click();
    await this.page.getByText(student.state, { exact: true }).last().click();
    await this.page.locator("#city").click();
    await this.page.getByText(student.city, { exact: true }).last().click();
    await this.submitButton.click();
  }
}
