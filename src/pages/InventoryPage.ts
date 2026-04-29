import { BasePage } from './BasePage';
import { toDataTestSlug } from '../../helpers/test-data';

export class InventoryPage extends BasePage {
  async isLoaded(): Promise<boolean> {
    const title = this.page.locator('.title');
    await this.waitForVisible(title);
    return (await title.textContent()) === 'Products';
  }

  async addItemToCart(itemName: string): Promise<void> {
    const slug = toDataTestSlug(itemName);
    const addButton = this.page.locator(`[data-test="add-to-cart-${slug}"]`);
    await this.waitForVisible(addButton);
    await addButton.click();
    // Wait for the "Remove" button to confirm the item was successfully added
    const removeButton = this.page.locator(`[data-test="remove-${slug}"]`);
    await this.waitForVisible(removeButton);
  }
}
