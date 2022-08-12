@login @regression
  Feature: Login

   Scenario: Login with valid admin account
      Given the user is on the login page
      When the user logins with account
        | username | password |
        | admin_1  | 1234567  |
      Then the user should see the "Home" page

    Scenario: Login with valid user account
      Given the user is on the login page
      When the user logins with account
        | username | password |
        | chuongt  | 1234567  |
      Then the user should see the "Home" page

    Scenario: Login with invalid admin account
      Given the user is on the login page
      When the user logins with account
        | username       | password       |
        | wrongUsername  | wrongPassword  |
      Then the user should see the error message "Username or password is incorrect. Please try again"
