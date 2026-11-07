import { expect, test } from "@playwright/test";
import { StudentRegistrationPage } from "../pages/StudentRegistrationPage";

test("mengisi dan mengirim Student Registration Form", async ({ page }) => {
  const student = {
    firstName: "Alya",
    lastName: "Putri",
    email: "alya.putri@example.com",
    genderId: 2,
    mobile: "8123456789",
    dateOfBirth: "15 May 2000",
    subject: "English",
    hobbyId: 2,
    address: "Jl. Merdeka No. 10, Jakarta",
    state: "NCR",
    city: "Delhi",
  };
  const registration = new StudentRegistrationPage(page);

  await registration.goto();
  await registration.fillAndSubmit(student);

  await expect(registration.confirmationModal).toBeVisible();
  await expect(registration.confirmationModal).toContainText(
    `${student.firstName} ${student.lastName}`,
  );
  await expect(registration.confirmationModal).toContainText(student.email);
  await expect(registration.confirmationModal).toContainText("Female");
  await expect(registration.confirmationModal).toContainText(student.mobile);
  await expect(registration.confirmationModal).toContainText("English");
  await expect(registration.confirmationModal).toContainText(student.address);
  await expect(registration.confirmationModal).toContainText(
    `${student.state} ${student.city}`,
  );
});
