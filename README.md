# AKW Consultants Assignment Solution
This is a ReactJS Web App solution for the assignment for the Firebase Authentication &amp; Storage Manager

# Important
I am using Node version v18.18.0 to run the command "npx create-react-app firebase-app" to create my "firebase-app" ReactJS Web Application for this assignment.
## To test the application, do the following:
    1. Download Files
    2. run "npm install"
    3. run "npm start"
    4. Use email: test@email.com with password: pass1234 to test

# Authentication
3 features (Sign In, Sign Up & Sign Out)
##  Sign In (Enabled)
    1. Uses Email & Password Method
    2. Sign In to access Firebase storage managament features
    3. Pages only accessible if logged in
    4. When trying to access pages without login, users are asked to sign in
##  Sign Out (Enabled)
    1. User has option to sign out of the application from all the pages from the Navigation Bar
##  Sign Up (Disabled)
    1. Created Sign Up page as well using email and password
    2. Feature is disabled as it was not part of the requirement
    3. To enable and use this feature please do the following:
        1. In App.js, uncomment import & the <Route/> for the SignUp Page
        2. In Login.js, uncomment import (Line 4) & Sign Up dialog (Line 89 - Line 99)
# Firebase Storage Manager
4 features (Upload Image(s), View All, Edit Image & Delete Image)
##  Upload Image(s)
    1. Option to Upload single image & multiple images as well
    2. Filename(s) should be supplied into the input field
##  View ALl
    1. Displays all the images available in the storage along with some of their metadata values
    2. Sorted by Last Updated field
## Edit Image
    1. Select the image from the dropdown menu and update the description of the image
## Delete Image
    1. Delete an image from the storage by supplying the filename
