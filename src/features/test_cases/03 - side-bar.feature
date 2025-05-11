@sidebar @smoke @regression
Feature: Sidebar Menu

  # Verify that opening the sidebar displays all expected navigation links.
  Scenario: Sidebar contains all expected menu items
    Given   I login as "standard_user"
    When    I open the sidebar menu
    Then    I should see the following menu items:
      | id                     | text             | href                     |
      | inventory_sidebar_link | All Items        | ./inventory.html         |
      | about_sidebar_link     | About            | https://saucelabs.com/   |
      | logout_sidebar_link    | Logout           | ./index.html             |
      | reset_sidebar_link     | Reset App State  |                          |
