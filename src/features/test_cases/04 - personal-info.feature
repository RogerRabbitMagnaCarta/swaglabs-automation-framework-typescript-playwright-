@regression @personal
Feature: Personal Information Form Validation

  # this outline will run the checkout‐to‐personal‐info flow for each userKey
  Scenario Outline: "<userKey>" must not be able to submit invalid personal info
    # 1. Login
    Given I am logged in as "<userKey>"

    # 2. Add something to cart and start checkout to get to the personal‐info page
    When I add "Sauce Labs Backpack" to the cart
    And I click the cart icon
    And I click the "Checkout" button

    # 3. Bulk‐submit all these invalid/null values
    When I fill the following invalid values:
      | field        | value    |
      | First Name   |          | # empty
      | First Name   | John123  |
      | First Name   | J@ne     |
      | Last Name    |          | # empty
      | Last Name    | Doe456   |
      | Last Name    | D#Smith  |
      | Postal Code  |          | # empty
      | Postal Code  | ABCDE    |
      | Postal Code  | 1234!@   |
      | Postal Code  | 12 345   |
    And I click the "Continue" button

    # 4. Assert we never make it to the overview
    Then I should not see the checkout overview page

  Examples:
    | userKey                 |
    | standard_user           |
    | problem_user            |
    | performance_glitch_user |
