@asset @regression
Feature: Create new asset

  Scenario Outline: Create new asset - verify list
    Given the user is on the login page
    When the user logins with account
      | username | password |
      | admin_1  | 1234567  |
    And the user navigates to the "Manage Asset" page
    And the user clicks Create New Asset button
    And the user creates a new asset
      | name   | specification   | state   |
      | <name> | <specification> | <state> |
    Then the user should see the asset in the list
      | name   | state   |
      | <name> | <state> |
    Examples:
      | name             | specification   | state     |
      | random           | 15 Inch 1080p   | Available |

  Scenario Outline: Create new asset - verify detail
    Given the user is on the login page
    When the user logins with account
      | username | password |
      | admin_1  | 1234567  |
    And the user navigates to the "Manage Asset" page
    And the user clicks Create New Asset button
    And the user creates a new asset
      | name   | specification   | state   |
      | <name> | <specification> | <state> |
    And the user clicks edit button
    Then the user should see the asset detail
      | name   | specification   |
      | <name> | <specification> |
    Examples:
      | name             | specification   | state     |
      | random           | 15 Inch 1080p   | Available |
