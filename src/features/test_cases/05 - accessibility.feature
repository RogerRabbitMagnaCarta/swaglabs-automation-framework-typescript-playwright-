@regression @accessibility
Feature: Access control for protected pages

  # Trying to browse directly without being logged in should always send you to the login page
  Scenario Outline: Unauthenticated users are redirected to login
    Given I launch the browser without logging in
    When I navigate to "<path>"
    Then I should see the login page

    Examples:
      | path                     |
      | /inventory.html          |
      | /cart.html               |
      | /checkout-step-one.html  |
      | /checkout-step-two.html  |
      | /checkout-complete.html  |
