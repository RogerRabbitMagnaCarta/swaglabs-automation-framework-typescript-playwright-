@sorting @smoke @regression
Feature: Product Sorting

  # Verify that the inventory list can be sorted by name or price,
  # in both ascending and descending directions.
  Scenario Outline: Products can be sorted by <criteria>
    Given   I login as "standard_user"
    And     I am on the inventory page

    When    I select "<criteria>" from the sort dropdown
    Then    the products should be ordered by <field> in <order> order

  Examples:
    | criteria             | field  | order       |
    | Name (A to Z)        | name   | ascending   |
    | Name (Z to A)        | name   | descending  |
    | Price (low to high)  | price  | ascending   |
    | Price (high to low)  | price  | descending  |
