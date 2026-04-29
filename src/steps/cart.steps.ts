import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../support/browser-setup';
import { loginPage, inventoryPage, cartPage, generalPage } from '../../helpers/pages';
import { USERS } from '../../helpers/test-data';

const USER_MAP: Record<string, { username: string; password: string }> = {
  standard_user: USERS.standard,
  locked_out_user: USERS.locked,
  problem_user: USERS.problem
};

Given('I am logged in as {string}', async (userKey: string) => {
  const credentials = USER_MAP[userKey] ?? USERS.standard;
  await loginPage().goto();
  await loginPage().login(credentials.username, credentials.password);
  await getPage().waitForURL('**/inventory.html', { timeout: 10000 });
});

Given('I am on the inventory page', async () => {
  expect(await inventoryPage().isLoaded()).toBe(true);
});

When('I add {string} to the cart', async (itemName: string) => {
  await inventoryPage().addItemToCart(itemName);
});

Then('the cart badge should show {string}', async (expectedCount: string) => {
  await expect(generalPage().getCartBadgeLocator()).toBeVisible({ timeout: 5000 });
  await expect(generalPage().getCartBadgeLocator()).toHaveText(expectedCount);
});

When('I navigate to the cart page', async () => {
  await generalPage().goToCart();
});

Then('{string} should be in the cart', async (itemName: string) => {
  expect(await cartPage().isItemInCart(itemName)).toBe(true);
});

When('I remove {string} from the cart', async (itemName: string) => {
  await cartPage().removeItem(itemName);
});

Then('the cart should be empty', async () => {
  await expect(cartPage().getCartItemsLocator()).toHaveCount(0);
});
