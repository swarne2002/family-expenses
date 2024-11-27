Family Management Dashboard:-

This project is a Family Management Dashboard, a full-stack application that provides features to manage and track family details, members, and their transactions dynamically. The dashboard supports CRUD operations and showcases the highest spender within a family.

Features
Dashboard Overview
Family Details: View and update family information such as Family ID, Total Spending, and Number of Dependents.
Family Members:
List all family members along with their percentage contribution to total expenses.
Add new family members dynamically.
Transactions:
List all transactions with details like Transaction Date, Category, and Amount.
Add new transactions dynamically.
Highest Spender: Highlights the family member with the highest spending.
Technologies Used
Frontend
React.js: For building the interactive user interface.
CSS: For basic styling and responsiveness.
Backend
Node.js with Express.js: For handling server-side logic and API endpoints.
MongoDB: For data persistence and database operations.
Other Tools
Axios: For making HTTP requests between the client and server.
JWT Authentication: To secure API endpoints.
Installation and Setup
Prerequisites
Make sure you have the following installed on your system:

Node.js
MongoDB
npm (comes with Node.js)
Steps to Run the Project
Clone the Repository:

git clone <repository_url>
cd family-expenses
Setup Backend:

Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Configure environment variables:
Create a .env file in the backend folder with the following content:
env
Copy code
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
Start the server:
node server.js
Setup Frontend:

Navigate to the frontend folder:
cd ../FamilyFrontend
Install dependencies:
npm install
Start the React development server:
npm run dev
Access the Application:

Open your browser and visit: http://localhost:5173
