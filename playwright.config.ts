import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "https://demoqa.com",
    trace: "on-first-retry",
    video: "on",
    ...devices["Desktop Chrome"],
  },
});
