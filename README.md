# test_transjakarta

## Playwright tests

The tests follow a four-part structure:

- `pages/`: TypeScript page objects and page interactions
- `tests/`: TypeScript Playwright test scenarios and assertions
- `data/`: input data, including the Web Tables CSV
- `utils/`: shared helpers, including the CSV reader

Install dependencies and browser binaries, then run the test suite:

```bash
npm install
npx playwright install chromium
npm test
```

Check TypeScript types with `npm run typecheck`.

Run the suite with a visible browser using `npm run test:headed`.
