# Transjakarta Playwright Tests

Playwright end-to-end tests for the DemoQA practice pages, written in TypeScript and organized with the Page Object Model (POM).

## Setup

Before running the tests, make sure Node.js, npm, and Java are installed. Java is required to run the Allure command-line report.

After cloning the repository, install the project dependencies:

```bash
npm install
```

Then install Playwright's browser binaries. This downloads Chromium, Firefox, and WebKit:

```bash
npx playwright install
```

Allure's Playwright reporter and command-line tool are included in the project dependencies, so you do not need to install Allure globally. The `npm install` command installs them locally from `package.json`.

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
npm run allure:serve
```

The `allure:serve` command opens the report in a browser. To generate a static report and open it later, run:

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


## Automation Test Recording

[Watch the full automation test recording]([URL_VIDEO_DARI_GITHUB](https://github.com/maidzola/test_transjakarta/issues/1))
