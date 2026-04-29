@checkout
Feature: Checkout Functionality
  As a logged-in user with items in my cart
  I want to complete the checkout process
  So that I can place an order successfully

  Background:
    Given I am logged in as "standard_user"
    And I have "Sauce Labs Backpack" in my cart
    And I am on the cart page

  Scenario: Complete full checkout flow with valid shipping information
    When I proceed to checkout
    And I fill in shipping details with first name "John", last name "Doe", postal code "12345"
    And I complete the order
    Then I should see the order confirmation message

  Scenario: Cannot proceed with checkout when shipping form is empty
    When I proceed to checkout
    And I submit the checkout form without filling in details
    Then I should see a checkout validation error
