import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Covers UI elements that exist on every page after login —
 * the header bar, cart badge, nav menu, and page title.
 */
export class GeneralPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // These return the locator directly so steps can use expect() with auto-retry
  getPageTitleLocator(): Locator { return this.pageTitle; }
  getCartBadgeLocator(): Locator { return this.cartBadge; }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
    await this.waitForURL('cart.html');
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.waitForVisible(this.logoutLink);
    await this.logoutLink.click();
  }
}
