import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly confirmationHeader: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationHeader = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.waitForVisible(this.firstNameInput);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.waitForVisible(this.continueButton);
    await this.continueButton.click();
  }

  async completeOrder(): Promise<void> {
    await this.waitForVisible(this.finishButton);
    await this.finishButton.click();
  }

  async isOrderComplete(): Promise<boolean> {
    await this.waitForVisible(this.confirmationHeader, 15000);
    const text = await this.confirmationHeader.textContent();
    return (text ?? '').toLowerCase().includes('thank you');
  }

  async isCheckoutErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
