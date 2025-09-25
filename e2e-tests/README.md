# Hudl Functional Test Suite

Test are written using [Playwright](https://playwright.dev/), all documentation can be found [here](https://playwright.dev/docs/intro).

# Setup
1. Install all dependencies `npm install`
2. Install all playwright dependencies `npx playwright install`
3. Edit the `.env` to add a **registered** email address and password to `VALID_EMAIL` and `VALID_PASSWORD`

## Running tests locally
With Playwright you can run a single test, a set of tests or all tests. A number of examples can be found [here](https://playwright.dev/docs/running-tests#running-tests).

Example of a single test execution

	npx playwright test tests/hudlLoginTests.spec.js --ui

## `prettier` opinionated code formatting

IDE Setup:
- PhpStorm, WebStorm - https://prettier.io/docs/en/webstorm.html
- VS Code - https://prettier.io/docs/en/editors.html#visual-studio-code

- `npm run prettier:check` & `npm run prettier:fix` can be ran to check and fix to required standard 

## `eslint` JS Linter

IDE Setup:
- PhpStorm, WebStorm - https://www.jetbrains.com/help/phpstorm/eslint.html#ws_js_linters_eslint_before_you_start
- VS Code - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

- `npm run eslint:check` & `npm run eslint:fix` can be ran to check and fix to required standard

# Github Actions
Workflows can be found at `./github/workflows`
Currently all tests are scheduled to run 02:00 UTC, Monday-Friday

To run in Github actions
1. 