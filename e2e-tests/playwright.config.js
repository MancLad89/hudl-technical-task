const { defineConfig, devices } = require('@playwright/test');
const dotenv = require('dotenv');
const path = require('node:path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./global-setup'),
  /* Maximum time one test can run for, 5 minutes */
  timeout: 30 * 10000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 15000,
    toPass: { timeout: 10000 },
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: '100%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* xml and html directory should be different otherwise one will overwrite the other */
  reporter: process.env.CI
    ? [
        ['junit', { outputFile: './xml-test-results/test-results.xml' }],
        ['list'],
        [
          'html',
          {
            open: 'never',
            outputFile: './playwright-report/test-results.html',
          },
        ],
      ]
    : [
        [
          'html',
          {
            open: 'never',
            outputFile: './playwright-report/test-results.html',
          },
        ],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 15000,
    captureGitInfo: { commit: true, diff: true },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${process.env.BASE_URL}${process.env.REGION}/`,
    /* set the default test attribute to data-qa-id */
    testIdAttribute: 'data-qa-id',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
    /* Timeout for each navigation action https://playwright.dev/docs/api/class-testoptions#test-options-navigation-timeout */
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //       permissions: ['clipboard-read'],
  //       bypassCSP: true,
  //       acceptInsecureCerts: true,
  //       w3c: false,
  //       launchOptions: {
  //         args: ['--disable-web-security'],
  //       },
  //     },
  //   },

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: {
  //     ...devices['Pixel 5'],
  //     permissions: ['clipboard-read'],
  //     bypassCSP: true,
  //     acceptInsecureCerts: true,
  //     w3c: false,
  //     launchOptions: {
  //       args: ['--disable-web-security'],
  //     },
  //   },
  // },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
