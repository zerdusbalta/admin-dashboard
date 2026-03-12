# Admin Dashboard

A modern admin dashboard project built with **Next.js**, **TypeScript**, **Express.js**, and **SQLite**.

This project includes a frontend dashboard interface and a backend API with authentication and product management features. It was built to practice full-stack project structure, reusable UI components, table management, and API integration.

## Features

- Dashboard overview page
- Customer, order, and invoice listing pages
- Product management page
- Create, update, and delete products
- Login flow with backend authentication
- Search, sorting, and pagination
- Reusable layout and shared UI components
- Frontend and backend separated into clean folders

## Tech Stack

### Frontend
- Next.js
- TypeScript
- React
- Tailwind CSS

### Backend
- Express.js
- SQLite
- Node.js

### Tooling
- Vitest
- ESLint
- Git & GitHub

## Project Structure

```bash
admin-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── routes/
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
│   │   ├── data/
│   │   ├── features/
│   │   ├── lib/
│   │   └── types/
│   ├── .env.local
│   ├── package.json
│   └── README.md
│
└── README.md