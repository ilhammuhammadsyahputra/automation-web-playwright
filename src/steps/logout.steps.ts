import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../support/browser-setup';
import { generalPage, loginPage } from '../../helpers/pages';
import { URLS } from '../../helpers/test-data';

When('I logout from the application', async () => {
  await generalPage().logout();
});

Then('I should be redirected to the login page', async () => {
  await getPage().waitForURL(`${URLS.base}/`, { timeout: 10000 });
  expect(getPage().url()).toMatch(/saucedemo\.com\/?$/);
});

Then('the login form should be visible', async () => {
  await loginPage().assertPageVisible();
});
