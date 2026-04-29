import { getPage } from '../src/support/browser-setup';
import { GeneralPage } from '../src/pages/GeneralPage';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

// Each function creates a fresh page object on every call — keeps step definitions clean
export const generalPage = (): GeneralPage => new GeneralPage(getPage());
export const loginPage = (): LoginPage => new LoginPage(getPage());
export const inventoryPage = (): InventoryPage => new InventoryPage(getPage());
export const cartPage = (): CartPage => new CartPage(getPage());
export const checkoutPage = (): CheckoutPage => new CheckoutPage(getPage());
