# Admin Dashboard

A full-stack admin dashboard project built with **Next.js**, **TypeScript**, **Express.js**, and **SQLite**.

This project includes a modern dashboard UI and a backend API with JWT-based authentication, role-based authorization, user management, product management, audit logs, and profile tools. It was built to practice real-world full-stack architecture, reusable UI components, protected routes, and permission-driven behavior across both frontend and backend.

## Highlights

- JWT authentication with protected backend routes
- Role-based access control for **admin**, **editor**, and **staff**
- **Primary admin** support with transfer flow
- User management with role restrictions
- Product management with permission-based UI behavior
- Audit logs with role-based visibility
- Profile page connected to the real session user
- Change password flow
- Profile avatar upload with header sync
- Search, sorting, and pagination for dashboard tables
- Reusable layout and shared UI components
- Frontend and backend separated into clean folders

## Roles and Permissions

### Admin
- Can manage users
- Can manage products
- Can view all audit logs
- Can change user roles based on permission rules

### Primary Admin
- Has all admin abilities
- Can transfer primary admin access to another admin
- Protected from normal role change and delete actions

### Editor
- Can create users with limited roles
- Can manage staff-level users only
- Can view staff-related audit log activity
- Can manage products

### Staff
- Can view users in read-only mode
- Can view only their own audit log records
- Can create products
- Cannot edit or delete products
- Cannot manage users

## Features

### Authentication
- Login with backend validation
- JWT token generation and protected API access
- Session user stored on the frontend
- Logout flow
- Change password

### User Management
- Create users
- Update user roles
- Delete users
- Primary admin badge and transfer action
- Role-based UI restrictions in forms and tables

### Product Management
- List products from backend
- Create products
- Update products
- Delete products
- Permission-aware product actions

### Audit Logs
- Backend-generated audit log records
- Role-based filtering
- Admin: all logs
- Editor: staff logs
- Staff: own logs

### Profile
- Real logged-in user information
- Role and primary admin visibility
- Change password panel
- Avatar upload with local persistence and header sync

### Dashboard UI
- Customers, orders, and invoices listing pages
- Search, sorting, and pagination
- Reusable table patterns
- Shared layout and UI components
- Cleaner page structure with reduced title duplication

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Express.js
- Node.js
- SQLite
- JSON Web Token (JWT)
- bcryptjs

### Tooling
- ESLint
- TypeScript
- Git & GitHub

## Project Structure

```bash
admin-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── data/
│   │   └── types/
│   ├── .env.local
│   ├── package.json
│   └── README.md
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd admin-dashboard
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

#### Backend `.env`
```env
PORT=4000
JWT_SECRET=your_jwt_secret
```

#### Frontend `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### 4. Run the backend

```bash
cd backend
npm run dev
```

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

## Demo Login

Default seeded admin account:

```txt
admin@example.com
123456
```

## Current Status

Completed core modules:

- Authentication
- Role-based authorization
- Primary admin flow
- User management
- Product management
- Audit logs
- Profile and password tools
- Avatar upload
- Table search, sorting, and pagination

## Notes

- Avatar upload currently uses browser local storage for persistence on the frontend
- The customer, order, and invoice pages are UI-focused demo sections
- The backend is centered around authentication, users, products, and audit logs