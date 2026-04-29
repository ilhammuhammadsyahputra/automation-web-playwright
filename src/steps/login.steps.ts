import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../support/browser-setup';
import { loginPage, generalPage } from '../../helpers/pages';

Given('I am on the login page', async () => {
  await loginPage().goto();
});

When('I enter username {string} and password {string}', async (username: string, password: string) => {
  await loginPage().login(username, password);
});

Then('I should be redirected to the inventory page', async () => {
  await getPage().waitForURL('**/inventory.html', { timeout: 10000 });
  expect(getPage().url()).toContain('inventory.html');
});

Then('the page title should be {string}', async (expectedTitle: string) => {
  await expect(generalPage().getPageTitleLocator()).toHaveText(expectedTitle);
});

Then('I should see a login error message', async () => {
  expect(await loginPage().isErrorVisible()).toBe(true);
});

Then('I should see a login error message containing {string}', async (partialText: string) => {
  const errorMessage = await loginPage().getErrorMessage();
  expect(errorMessage.toLowerCase()).toContain(partialText.toLowerCase());
});
