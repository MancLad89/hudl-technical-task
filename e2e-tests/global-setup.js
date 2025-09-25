const { chromium, expect } = require('@playwright/test');

async function globalSetup() {
  const baseUrl = `${process.env.BASE_URL}${process.env.REGION}/`;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  //Quick check to ensure environment is running before continuing tests
  try {
    await context.tracing.start({ screenshots: true });
    const baseUrlResp = await page.request.get(baseUrl);
    expect(baseUrlResp.status()).toBe(200);

    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    });
  } catch (error) {
    await browser.close();
    console.error(
      '\n\n',
      `'${baseUrl}' is not running, please check before rerunning tests.`,
      '\n\n'
    );
    throw error;
  }

  await browser.close();
}

module.exports = globalSetup;
