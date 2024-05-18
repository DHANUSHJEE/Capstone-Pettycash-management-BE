#Cash Management Application

This is a cash management application built with Node.js and Express. The application allows users to register, login, manage transactions, and reset their passwords.

#Features

1.User Registration
2.User Login
3.Email Verification
4.Password Reset
5.Add, Edit, Delete Transactions
6.View All Transactions


#Installation
Clone the repository:

sh
Copy code
git clone : 
cd cash-management
Install backend dependencies:

sh
Copy code
npm install
Navigate to the frontend directory and install dependencies:

sh
Copy code
cd frontend/cash-app
npm install
Set up environment variables:
Create a .env file in the root directory of the project and add the following:

env
Copy code
PORT=4000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:4000/api/password-reset/
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
Scripts
Start the server:

sh
Copy code
npm run start
Start the server with nodemon:

sh
Copy code
npm run server
Start the client:

sh
Copy code
npm run client
Start both the server and client concurrently:

sh
Copy code
npm run dev
API Endpoints
User Routes
Register a user:

http
Copy code
POST /api/user/register
Login a user:

http
Copy code
POST /api/user/login
Verify email:

http
Copy code
GET /api/user/:id/verify/:token
Transaction Routes
Add a transaction:

http
Copy code
POST /api/transaction/add-transaction
Get all transactions:

http
Copy code
POST /api/transaction/get-transaction
Delete a transaction:

http
Copy code
POST /api/transaction/delete-transaction
Edit a transaction:

http
Copy code
POST /api/transaction/edit-transaction
Password Reset Routes
Request password reset:

http
Copy code
POST /api/password-reset/forgot-password
Verify password reset link:

http
Copy code
GET /api/password-reset/:id/:token
Reset password:

http
Copy code
POST /api/password-reset/:id/:token
Middleware
CORS: Enables cross-origin resource sharing.
Express JSON: Parses incoming JSON requests.
Morgan: HTTP request logger.
Cookie Parser: Parses cookies attached to the client request object.
Usage
Register a user:
Send a POST request to /api/user/register with the user's details.

Login a user:
Send a POST request to /api/user/login with the user's email and password.

Manage transactions:
Use the provided transaction routes to add, view, edit, or delete transactions.

Password reset:

Request a password reset link by sending a POST request to /api/password-reset/forgot-password with the user's email.
Verify the password reset link sent to the user's email.
Reset the password using the provided token.
Running the Application
Start the server:

sh
Copy code
npm run start
Start the client:

sh
Copy code
npm run client
For development purposes, start both the server and client concurrently:

sh
Copy code
npm run dev
Open your browser and navigate to:

arduino
Copy code
http://localhost:4000
Connecting to the Database
The application uses MongoDB as the database. Ensure your MongoDB URI is correctly set in the .env file under the MONGO_URI variable.

Author
DHANUSH
License
This project is licensed under the ISC License.









