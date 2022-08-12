@request @regression
Feature: Request For Returning

  Scenario: Return asset - Accept request - State changed to Completed
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
    And the user logs out
    When the user logins with account
      | username    | password   |
      | chuongt     | 1234567    |
    And the user clicks sort by asset name
    And the user clicks the "accept" button
    And the user clicks "Accept" button from the pop up to accept
    And the user clicks the "return" button
    And the user clicks "Yes" button from the pop up to accept
    And the user logs out
    When the user logins with account
      | username | password |
      | admin_1  | 1234567  |
    And the user navigates to the "Request for Returning" page
    And the user clicks the "accept" button
    And the user clicks "Yes" button from the pop up to accept
    Then the user should see request state as "Completed"


  Scenario: Return asset - Deny request - Request is removed from the list
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
    And the user logs out
    When the user logins with account
      | username    | password   |
      | chuongt     | 1234567    |
    And the user clicks sort by asset name
    And the user clicks the "accept" button
    And the user clicks "Accept" button from the pop up to accept
    And the user clicks the "return" button
    And the user clicks "Yes" button from the pop up to accept
    And the user logs out
    When the user logins with account
      | username | password |
      | admin_1  | 1234567  |
    And the user navigates to the "Request for Returning" page
    And the user clicks the "deny" button
    And the user clicks "Yes" button from the pop up to accept
    Then the user should not see the request

