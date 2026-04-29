# Automation Web - Playwright + Cucumber BDD

Test automation project for [SauceDemo](https://www.saucedemo.com) built with **Playwright**, **Cucumber BDD**, and **TypeScript**.

---

## Project Structure

```
automation-web-playwright-cucumber/
├── features/                     # Gherkin feature files
│   ├── login.feature             @login
│   ├── cart.feature              @cart
│   ├── checkout.feature          @checkout
│   └── logout.feature            @logout
│
├── src/
│   ├── pages/                    # Page Object Model (POM)
│   │   ├── BasePage.ts           # Abstract base: navigate, waitForVisible, waitForURL
│   │   ├── GeneralPage.ts        # Shared nav elements across all authenticated pages
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   │
│   ├── steps/                    # Cucumber step definitions
│   │   ├── login.steps.ts
│   │   ├── cart.steps.ts
│   │   ├── checkout.steps.ts
│   │   └── logout.steps.ts
│   │
│   └── support/
│       └── browser-setup.ts              # Browser lifecycle & screenshot on failure
│
├── helpers/
│   ├── pages.ts           # Creates page objects on demand — keeps steps clean
│   └── test-data.ts              # Test users, URLs, product names, and slug helper
│
├── reports/                      # Auto-generated test reports (git-ignored)
├── cucumber.json
├── tsconfig.json
└── package.json
```

---

## Architecture Overview

The project is built around three core ideas: **separation of concerns**, **stability**, and **readability**.

### Page Object Model (POM)
Each page of the application has its own class that owns its locators and actions. When the UI changes, there is only one file to update. Page classes extend `BasePage` for shared utilities, and a `GeneralPage` class holds elements that appear across all authenticated pages (cart badge, nav menu, logout), avoiding duplication.

### Page Factory
Rather than writing `new LoginPage(getPage())` in every step definition, a `pages.ts` helper provides short factory functions like `loginPage()` and `cartPage()`. This keeps step files clean and easy to read.

### Handling Async States and Dynamic Elements
One of the main sources of flaky tests is not waiting for the right thing. This project avoids hard-coded sleeps entirely. Instead:
- Every action waits for the target element to be visible before interacting with it (`waitForVisible`)
- After adding an item to cart, the test waits for the **Remove** button to appear — this confirms the cart updated, not just that the click happened
- Assertions use Playwright's `expect()` which retries automatically until the condition passes or times out, making tests resilient to small rendering delays

### Locator Strategy
All locators use `data-test` attributes (e.g. `[data-test="login-button"]`). These are intentionally stable selectors that won't break when CSS classes or markup structure changes.

### Naming Conventions
| Layer | Convention | Example |
|---|---|---|
| Page classes | `PascalCase` | `LoginPage`, `GeneralPage` |
| Step files | `kebab-case.steps.ts` | `login.steps.ts` |
| Feature files | `kebab-case.feature` | `cart.feature` |
| Helper files | `kebab-case.ts` | `test-data.ts`, `pages.ts` |
| Factory functions | `camelCase` | `loginPage()`, `cartPage()` |
| Constants | `UPPER_SNAKE_CASE` | `USERS`, `URLS` |

---

## Page Object Responsibilities

| Class | Responsibility |
|---|---|
| `BasePage` | Core utilities shared by all pages: `navigate`, `waitForVisible`, `waitForURL` |
| `GeneralPage` | Elements that show up on every page after login — cart badge, nav menu, logout, and page title |
| `LoginPage` | Login form, error messages, and verifying the page is visible |
| `InventoryPage` | Checking the products page loaded and adding items to the cart |
| `CartPage` | Inspecting cart contents, removing items, and going to checkout |
| `CheckoutPage` | Filling in shipping details, placing the order, and checking for form errors |

---

## Required Test Coverage

All scenarios required by the task are covered:

| Requirement | Feature | Scenario |
|---|---|---|
| Login with valid credentials | `login.feature` | Successful login with valid credentials |
| Add item to cart and verify badge | `cart.feature` | Add one item and verify the badge count |
| Remove item from cart | `cart.feature` | Remove an item from the cart |
| Checkout flow (name, address, complete order) | `checkout.feature` | Complete the full checkout flow and confirm the order |
| Logout | `logout.feature` | Log out and land back on the login page |

---

## Setup

### Prerequisites

- Node.js >= 18
- npm >= 8

### Install dependencies

```bash
npm install
```

### Install Playwright browser

```bash
npx playwright install chromium
```

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests in headless mode |
| `npm run test:login` | Run login feature only |
| `npm run test:cart` | Run cart feature only |
| `npm run test:checkout` | Run checkout feature only |
| `npm run test:logout` | Run logout feature only |
| `npm run test:headed` | Run with the browser visible on screen |
| `npm run test:report` | Run tests and open the HTML report |

Reports are saved to `reports/cucumber-report.html`. Screenshots for failed scenarios are embedded directly in the report.

---

## Test Scenarios

| Feature | Scenario | Tag |
|---|---|---|
| Login | Successful login with valid credentials | `@login` |
| Login | Failed login — wrong password | `@login` |
| Login | Failed login — unknown username | `@login` |
| Login | Failed login — locked out account | `@login` |
| Cart | Add one item and verify the badge count | `@cart` |
| Cart | Add two items and verify the badge count | `@cart` |
| Cart | Remove an item from the cart | `@cart` |
| Checkout | Complete the full checkout flow and confirm the order | `@checkout` |
| Checkout | Submit an empty checkout form and see a validation error | `@checkout` |
| Logout | Log out and land back on the login page | `@logout` |

**Total: 10 scenarios, 46 steps**

---

## Assumptions

1. The SauceDemo site is publicly accessible and its UI stays consistent.
2. Tests run one at a time (`parallel: 1`) because the browser state is shared at the module level.
3. The `standard_user` / `secret_sauce` credentials work and are not rate-limited.
4. Only Chromium is used as the browser. The project can be extended to other browsers by updating `browser-setup.ts`.
5. On failure, a full-page screenshot is captured and embedded in the HTML report.
6. `data-test` attributes are the main locator strategy since they don't change with visual updates.
