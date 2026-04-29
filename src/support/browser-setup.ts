import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Returns the current page so step definitions can interact with the browser
export const getPage = (): Page => page;

BeforeAll(async () => {
  const headless = process.env['HEADLESS'] !== 'false';
  browser = await chromium.launch({
    headless,
    slowMo: headless ? 0 : 50
  });
});

AfterAll(async () => {
  await browser?.close();
});

Before(async () => {
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  });
  page = await context.newPage();

  page.on('pageerror', (error: Error) => {
    process.stderr.write(`[Page Error] ${error.message}\n`);
  });
});

After(async function ({ result }) {
  if (result?.status === 'FAILED') {
    const screenshot = await page.screenshot({ type: 'png', fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  if (context) {
    await context.close();
  }
});
