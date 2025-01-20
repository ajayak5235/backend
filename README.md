ShopEase - E-commerce Product Catalog
Overview
ShopEase is a fully functional e-commerce product catalog website where users can view products, filter them, add them to their shopping cart, and proceed with a mock payment for checkout. The project demonstrates both front-end and back-end development, database integration, API creation, and deployment of a live web application.

Features
User Authentication: Users can register, log in, and access the shopping cart and checkout functionalities.
Product Catalog: Users can view products, filter them by category and price, and add/remove items from the shopping cart.
Shopping Cart: Users can view, modify, and remove items in their cart.
Checkout (Mock Payment): Users can review their order and submit a mock payment.

Role-based Access Control (Bonus): Admins can manage products, while users can only interact with the catalog and cart.

Tech Stack
Frontend: React.js
Backend: Node.js/Express
Database: MongoDB
Authentication: JWT (JSON Web Token)
Version Control: GitHub
Project Structure
Backend (Node.js/Express)
API Endpoints:

User Registration/Login: Users can register and log in with JWT-based authentication.
Product Management: Admins can perform CRUD operations (Create, Read, Update, Delete) on products.
Shopping Cart: Users can add and remove products from their cart.
Order Management: Users can place an order and proceed to checkout (mock payment).
Database Schema:

Users: Stores user information (name, email, password).
Products: Stores product details (name, description, price, category, and images).
Orders: Stores details about user orders and their status.
Cart: Stores the products added to each user's cart.
Frontend (React.js)
Product Catalog: Displays a list of products with options to filter by category and price.
Shopping Cart: Allows users to view, adjust, and remove items from the cart, with a real-time total price calculation.
User Authentication: Handles user registration, login, and session management with JWT tokens.
Checkout Page: Allows users to review their order and submit a mock payment.
Setup Instructions
Backend Setup
Clone the repository:

git clone https://github.com/ajayak5235/backend

Install dependencies:
npm install


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the backend server:

npm start
Frontend Setup
Install dependencies:

npm install

Run the frontend development server:

npm start
Deployment

Frontend: React.js applications.
Live URL: Ensure both the frontend and backend are accessible via a shared URL for review.
Additional Features (Bonus)
Role-based Access Control: Admin users can manage products, while regular users can only interact with the catalog and cart.
Pagination: Implement pagination for the product catalog if there are many products.
Known Limitations
The payment functionality is a mock implementation and does not handle real transactions.
The user authentication system is basic and does not include features like password recovery or email verification.
The product catalog does not include advanced search functionality beyond filtering by category and price.
