# Admin Dashboard Frontend

A full-featured admin dashboard frontend built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

This frontend is designed to work with the Express and SQLite backend of the project and includes protected dashboard routes, real backend authentication, role-aware UI behavior, reusable management screens, profile tools, and a cleaner admin panel experience.

## Highlights

- Real backend authentication flow
- Session-aware frontend user state
- Protected dashboard routes
- Role-based UI behavior for **admin**, **editor**, and **staff**
- Real profile page connected to the logged-in user
- Change password panel
- Profile avatar upload with header sync
- User management interface
- Product management interface
- Audit logs interface
- Customers, orders, and invoices listing pages
- Search, sorting, and pagination
- Reusable layout and shared dashboard components

## Core Modules

### Dashboard Layout
- Shared sidebar and header structure
- Centralized page title and description handling
- Cleaner page layout with reduced duplicate headings

### Profile
- Displays the real logged-in user
- Shows role and primary admin information
- Includes change password functionality
- Supports avatar upload with local persistence
- Keeps profile avatar and header avatar in sync

### Users
- Lists users from the backend
- Supports user creation
- Supports role update actions
- Supports delete actions based on permission rules
- Supports primary admin transfer
- Applies role-based restrictions in forms and tables

### Products
- Lists products from the backend
- Supports product creation
- Supports edit and delete actions
- Applies role-aware action visibility

### Audit Logs
- Displays backend-generated audit records
- Supports paginated viewing
- Applies role-based visibility rules

### Customers, Orders, and Invoices
- UI-focused listing pages
- Shared table patterns and reusable helpers
- Search, sorting, and pagination support

## Authentication

This frontend uses the real backend authentication flow.

### Login Flow
- Sends credentials to the backend login endpoint
- Receives a JWT token and user data
- Stores session data in browser cookies
- Redirects authenticated users into the dashboard

### Logout Flow
- Clears frontend auth cookies
- Redirects the user back to `/login`

### Session Behavior
- Reads the logged-in user from cookies
- Reflects the session user in the header and profile page
- Drives role-based UI decisions using the current session user

## Role-Based UI Behavior

### Admin
- Can access user management actions
- Can manage products
- Can view audit logs
- Can access broader user actions depending on primary admin status

### Primary Admin
- Has full admin UI access
- Can transfer primary admin access
- Sees protected primary-admin-specific actions

### Editor
- Can manage staff-level users only
- Can manage products
- Can see limited role options in user forms and tables
- Can access staff-related audit visibility

### Staff
- Can view users in read-only mode
- Can create products
- Cannot edit or delete products
- Can view only their own audit logs

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint

## Project Structure

```bash
frontend/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   ├── login/
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── audit/
│   │   ├── customers/
│   │   ├── orders/
│   │   └── invoices/
│   │
│   ├── data/
│   ├── lib/
│   └── types/
│
├── .env.local
├── package.json
└── README.md
```

## Folder Details

- `src/app` -> application routes, dashboard pages, and layout structure
- `src/components` -> shared UI pieces and layout components
- `src/components/layout` -> header, sidebar, and page shell components
- `src/components/shared` -> reusable UI elements such as avatar, badges, pagination, and section headers
- `src/features/auth` -> login flow, auth session helpers, password change, and avatar tools
- `src/features/users` -> user management components, forms, tables, and services
- `src/features/products` -> product components, forms, tables, and services
- `src/features/audit` -> audit logs page logic, types, and data fetching
- `src/features/customers` -> customer listing UI and related helpers
- `src/features/orders` -> order listing UI and related helpers
- `src/features/invoices` -> invoice listing UI and related helpers
- `src/data` -> mock data used by demo-focused UI sections
- `src/lib` -> reusable helpers and utilities such as table logic
- `src/types` -> shared TypeScript types

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file in the frontend folder:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Notes

- Customers, orders, and invoices are currently UI-focused demo sections
- Avatar upload currently uses browser local storage for persistence
- Header avatar and profile avatar stay synchronized on the frontend
- Role and permission behavior is aligned with backend authorization rules
- The frontend has been cleaned up to reduce repeated headings and improve dashboard consistency

## Current Status

Completed core frontend modules:

- Real login flow
- Session-aware header and profile
- Change password UI
- Avatar upload and sync
- User management UI
- Product management UI
- Audit logs UI
- Role-based UI restrictions
- Search, sorting, and pagination
- Shared reusable dashboard components

## Future Improvements

- Add dedicated frontend tests for auth and feature flows
- Add toast notifications for more actions
- Add persistent backend-based avatar storage
- Improve mobile responsiveness further
- Add filters and richer table controls
- Add loading skeleton states