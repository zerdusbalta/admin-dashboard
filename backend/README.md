# Admin Dashboard Backend

A backend API built with **Node.js**, **Express**, and **SQLite** for authentication, role-based authorization, user management, product management, and audit logging.

This backend powers the admin dashboard frontend and includes JWT authentication, protected routes, seeded demo data, permission-based access rules, and activity tracking through audit logs.

## Features

- JWT-based login authentication
- Logout endpoint
- Protected routes with token verification
- Role-based authorization for **admin**, **editor**, and **staff**
- **Primary admin** support with transfer flow
- User management
- Product management
- Audit logs with role-based visibility
- Validation middleware for auth and product requests
- SQLite database with seeded demo admin and sample products

## Roles and Permissions

### Admin
- Can view all users
- Can create users within permission rules
- Can update user roles within permission rules
- Can delete users within permission rules
- Can manage products
- Can view all audit logs

### Primary Admin
- Has all admin abilities
- Can transfer primary admin access to another admin
- Protected from normal role change and delete actions

### Editor
- Can view staff users
- Can create limited users
- Can update or delete staff users only
- Can manage products
- Can view staff-related audit logs

### Staff
- Can view users in read-only mode
- Can create products
- Cannot update or delete products
- Can view only their own audit logs
- Cannot manage users

## Tech Stack

- Node.js
- Express.js
- SQLite
- jsonwebtoken
- bcryptjs
- dotenv
- cors
- nodemon

## API Endpoints

## Auth

- `POST /auth/login`
- `POST /auth/logout`
- `PUT /auth/change-password`

## Users

- `GET /auth/users`
- `POST /auth/users`
- `PUT /auth/users/:id/role`
- `PUT /auth/users/:id/transfer-primary-admin`
- `DELETE /auth/users/:id`

## Audit Logs

- `GET /auth/audit-logs`

## Products

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

## How It Works

When the server starts:

1. It connects to the SQLite database
2. It creates the required tables if they do not exist:
    - `users`
    - `products`
    - `audit_logs`
3. It seeds one default admin account if the users table is empty
4. It seeds sample products if the products table is empty

## Authentication Flow

- A user logs in with email and password
- The backend verifies the password using `bcryptjs`
- A JWT token is generated and returned
- Protected routes require a valid `Authorization: Bearer <token>` header
- The decoded user payload is attached to `req.user`

## Audit Log Behavior

The backend records activity such as:

- User creation
- User role updates
- User deletion
- Password changes
- Primary admin transfer

Audit log visibility depends on role:

- **Admin**: can view all logs
- **Editor**: can view staff-related logs
- **Staff**: can view only their own logs

## Demo Login

Default seeded admin account:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

## Example Requests

### Login

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

### Get Products with Pagination

```http
GET /products?page=1&limit=10
Authorization: Bearer <token>
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

### Change Password

```http
PUT /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "currentPassword": "123456",
  "newPassword": "newpassword123"
}
```

## Project Structure

- `src/app.js` -> Express app setup
- `src/server.js` -> server entry point
- `src/config/db.js` -> SQLite connection
- `src/database/initDb.js` -> database initialization and seed data
- `src/controllers/authController.js` -> authentication, users, and audit log logic
- `src/controllers/productController.js` -> product logic
- `src/middleware/authMiddleware.js` -> token verification and role authorization
- `src/middleware/validationMiddleware.js` -> request validation
- `src/routes/authRoutes.js` -> auth, users, and audit log routes
- `src/routes/productRoutes.js` -> product routes
- `src/utils/AppError.js` -> reusable error class
- `src/utils/auditLogger.js` -> audit log helper

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
JWT_SECRET=your_jwt_secret
```

## Notes

- This project uses SQLite for simplicity and local development
- Passwords are hashed with `bcryptjs`
- Authentication uses JWT tokens
- The API is designed to support the frontend admin dashboard project
- Role and permission rules are enforced on the backend, not only in the UI

## Current Status

Completed core backend modules:

- Authentication
- JWT protection
- Role-based authorization
- User management
- Primary admin flow
- Product management
- Audit logs
- Validation middleware
- Seeded demo data

## Future Improvements

- Add automated backend tests
- Add refresh token support
- Add file upload support for persistent avatars
- Add request rate limiting
- Add stronger pagination and filtering options
- Add centralized logging and monitoring
- Replace SQLite with PostgreSQL or MySQL for production-scale use