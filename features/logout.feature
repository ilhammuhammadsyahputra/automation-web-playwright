@logout
Feature: Logout Functionality
  As a logged-in user
  I want to logout from the application
  So that my session is securely terminated

  Scenario: Successfully logout and be redirected to login page
    Given I am logged in as "standard_user"
    When I logout from the application
    Then I should be redirected to the login page
    And the login form should be visible
