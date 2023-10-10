# akw-consultants
This is a React Web App solution for the assignment for the Firebase Authentication &amp; Storage Manager

# Important
I am using Node version v18.18.0 to run the command "npx create-react-app firebase-app" to create my "firebase-app" React Web Application for this assignment.
To test the application, do the following:
1. Download Files
2. run "npm install"
3. run "npm start"

#Authentication
3 features (Sign In, Sign Up & Sign Out)
  1. Sign In (Enabled)
       1. Uses Email & Password to sign in to the application
       2. Once signed in can access the application and it's storage managament features
       3. Application pages can only be accessed if user is logged in
       4. If user tries to access the pages without login, they are not able to see the content and are asked to sign in
  2. Sign Out (Enabled)
       1. User has option to sign out of the application from all the pages
  3. Sign Up (Disabled)
       1. I have created a Sign Up page as well for this application where a user can sign up using email and password
       2. This feature is disabled as it was not part of the requirement
            To enable and use this feature please do the following:
            1. In App.js, uncomment import & the <Route/> for the SignUp Page
            2. In Login.js, uncomment import (Line 4) & Sign Up dialog (Line 89 - Line 99)
