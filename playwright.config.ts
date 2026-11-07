import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["allure-playwright", { resultsDir: "allure-results" }]],
  use: {
    baseURL: "https://demoqa.com",
    trace: "on-first-retry",
    ...devices["Desktop Chrome"],
  },
});
