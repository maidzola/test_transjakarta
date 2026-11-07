# Transjakarta Playwright Tests

Playwright end-to-end tests for the DemoQA practice pages, written in TypeScript and organized with the Page Object Model (POM).

## Prerequisites

- Node.js and npm
- Java installed for the Allure command-line report

Install the project dependencies and Playwright's Chromium browser:

```bash
npm install
npx playwright install chromium
```

## Run the tests

Run all tests in headless mode:

```bash
npm test
```

Run a specific scenario:

```bash
npx playwright test tests/webTables.spec.ts
npx playwright test tests/droppable.spec.ts
npx playwright test tests/resizable.spec.ts
npx playwright test tests/studentRegistration.spec.ts
```

Run all tests with a visible Chromium browser:

```bash
npm run test:headed
```

Run one scenario with a visible browser:

```bash
npm run test:headed -- tests/webTables.spec.ts
```

## View test results with Allure

The Allure reporter writes test results to `allure-results/` each time the tests run. Run the tests before opening the report:

```bash
npm test
```

To generate and serve a report in a browser:

```bash
npm run allure:serve
```

Alternatively, generate a static report and open it later:

```bash
npm run allure:generate
npm run allure:open
```

The generated report is saved in `allure-report/`. Both Allure output folders are excluded from Git.

## Other commands

Check TypeScript types:

```bash
npm run typecheck
```

Format project files with Prettier:

```bash
npm run format
```

## Project structure

- `pages/`: Page Object classes, locators, and page interactions
- `tests/`: Playwright scenarios and assertions
- `data/`: test data, including the Web Tables CSV
- `utils/`: shared helpers, such as the CSV reader
