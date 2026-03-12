# Admin Dashboard Backend

A backend API built with Node.js, Express, and SQLite for authentication and product management.

## Features

- Login endpoint
- Logout endpoint
- Get all products with pagination
- Get single product by ID
- Create product
- Update product
- SQLite database with seeded users and products

## Tech Stack

- Node.js
- Express
- SQLite
- dotenv
- cors
- nodemon

## API Endpoints

### Auth

- `POST /auth/login`
- `POST /auth/logout`

### Products

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`

## How It Works

The backend uses SQLite as the database.

When the server starts:

1. It connects to the SQLite database
2. It creates the `users` and `products` tables if they do not exist
3. It seeds one demo user and sample products if the tables are empty

## Demo Login

Use this account for testing:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

## Pagination Example

Request:

```http
GET /products?page=1&limit=10
```

Example response:

```json
{
  "data": [],
  "page": 1,
  "limit": 10,
  "total": 0,
  "totalPages": 0
}
```

## Project Structure

- `src/app.js` -> Express app setup
- `src/server.js` -> server entry point
- `src/config/db.js` -> SQLite connection
- `src/database/initDb.js` -> database initialization and seed data
- `src/controllers/authController.js` -> auth logic
- `src/controllers/productController.js` -> product logic
- `src/routes/authRoutes.js` -> auth routes
- `src/routes/productRoutes.js` -> product routes

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=4000
```

## Notes

- This project uses SQLite for simplicity and local development
- Authentication is basic and intended for learning purposes
- Passwords are currently stored as plain text for demo use only
- The API was built to support a frontend admin dashboard project

## Future Improvements

- Add JWT authentication
- Hash passwords with bcrypt
- Add delete product endpoint
- Add validation middleware
- Add protected routes
- Add better error handling
- Add tests