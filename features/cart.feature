@cart
Feature: Cart Functionality
  As a logged-in user
  I want to manage items in my shopping cart
  So that I can review my selections before purchasing

  Background:
    Given I am logged in as "standard_user"
    And I am on the inventory page

  Scenario: Add a single item to cart and verify badge count
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  Scenario: Add multiple items to cart and verify badge count
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  Scenario: Remove item from cart on the cart page
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart page
    Then "Sauce Labs Backpack" should be in the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty
