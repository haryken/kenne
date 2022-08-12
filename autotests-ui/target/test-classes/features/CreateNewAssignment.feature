@assignment @regression
Feature: Create new assignment

  Scenario: Create new assignment - verify list
    Given the user is on the login page
    When the user logins with account
      | username | password |
      | admin_1  | 1234567  |
    And the user navigates to the "Manage Asset" page
    And the user clicks Create New Asset button
    And the user creates a new asset
      | name   | specification   | state     |
      | random | 15 Inch 1080p   | Available |
    And the user navigates to the "Manage Assignment" page
    And the user clicks Create New Assignment button
    And the user creates assignment
      | user         | asset  |
      | SD0005       | random |
    Then the user should see the assignment in the list
      | user         | asset  |
      | chuongt      | random |
