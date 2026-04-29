import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../support/browser-setup';
import { inventoryPage, cartPage, checkoutPage, generalPage } from '../../helpers/pages';

Given('I have {string} in my cart', async (itemName: string) => {
  await inventoryPage().addItemToCart(itemName);
  await generalPage().goToCart();
});

Given('I am on the cart page', async () => {
  await getPage().waitForURL('**/cart.html', { timeout: 10000 });
  expect(getPage().url()).toContain('cart.html');
});

When('I proceed to checkout', async () => {
  await cartPage().proceedToCheckout();
  await getPage().waitForURL('**/checkout-step-one.html', { timeout: 10000 });
});

When(
  'I fill in shipping details with first name {string}, last name {string}, postal code {string}',
  async (firstName: string, lastName: string, postalCode: string) => {
    await checkoutPage().fillShippingInfo(firstName, lastName, postalCode);
    await getPage().waitForURL('**/checkout-step-two.html', { timeout: 10000 });
  }
);

When('I complete the order', async () => {
  await checkoutPage().completeOrder();
  await getPage().waitForURL('**/checkout-complete.html', { timeout: 15000 });
});

Then('I should see the order confirmation message', async () => {
  expect(await checkoutPage().isOrderComplete()).toBe(true);
});

When('I submit the checkout form without filling in details', async () => {
  await checkoutPage().submitEmptyForm();
});

Then('I should see a checkout validation error', async () => {
  expect(await checkoutPage().isCheckoutErrorVisible()).toBe(true);
});
