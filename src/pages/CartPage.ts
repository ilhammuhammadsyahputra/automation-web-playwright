import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { toDataTestSlug } from '../../helpers/test-data';

export class CartPage extends BasePage {
  private readonly checkoutButton: Locator;
  private readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  // Steps use this with expect().toHaveCount() to check if the cart is empty
  getCartItemsLocator(): Locator { return this.cartItems; }

  async isItemInCart(itemName: string): Promise<boolean> {
    const item = this.page.locator('.inventory_item_name', { hasText: itemName });
    return item.isVisible();
  }

  async removeItem(itemName: string): Promise<void> {
    const slug = toDataTestSlug(itemName);
    const removeButton = this.page.locator(`[data-test="remove-${slug}"]`);
    await this.waitForVisible(removeButton);
    await removeButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.waitForVisible(this.checkoutButton);
    await this.checkoutButton.click();
  }
}
