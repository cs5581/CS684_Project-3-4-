## Integration tests

- Testing connection to main page to go into login page
  - Unaunthenticated user should be able to access login page and receive status code 200
  
- Testing connection from login page to correct dashboard authenticated session
  - Unauthenticated user should be able to login with correct credentials and be able to access dashboard with an authenticated session
  
- Testing connection from Signup page to login page to login user
  - Unathenticated user should be able to sign up with their credentials and be directed to login page
  
- Testing connection from Logged in user main page to settings to dashboard with correct settings saved
  - Authenticated user should be able to access their settings page and make preference changes
  
- Testing connection from dashboard to sign out function to dashboard with no authenticated session
  - User in authenticated session should be able to log out and be directed a unauthenticated dashboard to login or signup.  
