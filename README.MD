# CRUD Employee Management App

## Purpose

    - Strengthen my understanding of asynchrounous API calls
    - Strengthen my understanding of developing a server with the Express JS library
    - Strengthen my understanding of database operations with MongoDB and the Mongoose API

## Technologies used

    - Embedded JavaScript (EJS): I used EJS for the front end of this project because it is fun and not often seen these days. I also did not want the large bundle size that comes with React or Angular because this is supposed to be a simple app. 

    - Express JS: I used this for developing the server because it is well documented and maintained, and makes server setup relatively easy.

    - MongoDB & Mongoose API: MongoDB's BSON notation lends itself very well to JSON documents or templates. Also I chose this because the integration is very easy and user-friendly. 

## Features

    - I decided to use EJS for a relatively easy server-side rendering experience for the frontend, since the focus of this app was to manage employee information utilizing mongoDB and API calls. 

    - I did not get a chance to add cases for every potential error or security exploit, but I added several features that are slightly more difficult to execute with SSR frameworks rather than client-side frameworks, such as: 
        
        - Simple secure state management through cookies to assign a JWT to identify logged-in users
        - Secure password storage, retrieval, and comparison using cryptographic hashing algorithms
        - Conditional case to prevent a manager from deleting themselves and causing a crash
        - Conditional case to prevent deletion of either of the two listed test accounts
        - Conditional rendering of login or employee header
        - Custom (but VERY simple) interactive styling

## Screenshots
    - ![Landing page of Application](https://github.com/jpugh020/crud_employee_management_app/blob/main/public/CRUD_APP_LOGIN.png)

