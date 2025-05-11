@e2e @smoke @regression
Feature: Complete End-to-End User Journey

  # This Scenario Outline exercises the entire shopping flow
  # for each of the userKeys in the Examples table below.
  Scenario Outline: <userKey> browses, validates content, shops, and checks out

    # 1. Login
    Given I am on the login page
    When  I login as "<userKey>"
    Then  I see the expected result for "<userKey>"

    # 2. DB–UI consistency: name, description and images
    Then  the products displayed should match the database
    And   each displayed product image exactly matches the asset

    # 3. Image integrity
    When  I am viewing the inventory page
    And   I collect all product image URLs
    Then  each image URL returns HTTP 200 and non-zero content

    # 4. Reset App State via sidebar
    When  I add "Sauce Labs Backpack" to the cart
    And   I open the sidebar menu
    And   I click the "Reset App State" link
    Then  the cart badge should show "0"

    # 5. Add all products & verify badge count
    When  I am viewing the inventory page
    And   I add all products from the database to the cart
    Then  the cart badge should show the number of inventory items

    # 6. Checkout flow
    When  I click the cart icon
    And   I click the "Checkout" button
    And   I enter "John" into the "First Name" field
    And   I enter "Doe" into the "Last Name" field
    And   I enter "12345" into the "Postal Code" field
    And   I click the "Continue" button

    # 7. Dynamic totals calculation
    Then  the item total should equal the sum of database prices
    And   the tax should be "8%" of that subtotal
    And   the total should equal subtotal plus tax

    # 8. Complete order
    And   I click the "Finish" button
    Then  I should see the order completion page

  Examples:
    | userKey                |
    | standard_user          |
    | problem_user           |
    | performance_glitch_user|
    | locked_out_user|
