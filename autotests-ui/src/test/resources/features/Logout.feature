@logout @regression
Feature: Login


  Scenario: Logout of admin account
    Given the user is on the login page
    When the user logins with account
      | username    | password   |
      | admin_1     | 1234567    |
    And the user logs out
    Then the user should see the "Login" page

  Scenario: Logout of user account
    Given the user is on the login page
    When the user logins with account
      | username | password |
      | chuongt  | 1234567  |
    And the user logs out
    Then the user should see the "Login" page
