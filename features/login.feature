@login
Feature: Login Functionality
  As a user of SauceDemo
  I want to be able to login with my credentials
  So that I can access the product inventory

  Scenario: Successful login with valid standard user credentials
    Given I am on the login page
    When I enter username "standard_user" and password "secret_sauce"
    Then I should be redirected to the inventory page
    And the page title should be "Products"

  Scenario: Failed login with incorrect password
    Given I am on the login page
    When I enter username "standard_user" and password "wrong_password"
    Then I should see a login error message

  Scenario: Failed login with non-existent username
    Given I am on the login page
    When I enter username "unknown_user" and password "secret_sauce"
    Then I should see a login error message

  Scenario: Failed login with locked out user account
    Given I am on the login page
    When I enter username "locked_out_user" and password "secret_sauce"
    Then I should see a login error message containing "locked out"
