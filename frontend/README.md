# Admin Dashboard

A small SaaS-style admin dashboard built with Next.js, React, TypeScript and TailwindCSS.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- Vitest

## Features

- Mock authentication
- Protected dashboard routes
- User profile page
- Customers module
- Orders module
- Invoices module
- Search
- Sorting
- Pagination
- Detail pages
- Related record sections
- Basic unit tests

## Project Structure

- `src/app` → routes and layouts
- `src/components` → shared and layout components
- `src/features` → feature-specific logic
- `src/data` → mock data
- `src/lib` → table helpers and utilities

## Authentication

This project currently uses **mock authentication**.

Demo login flow:
- protected routes redirect unauthenticated users to `/login`
- successful login stores a mock session cookie
- logout clears the session cookie

## Test Coverage

Basic unit tests are included for:
- pagination
- search helpers
- sort helpers
- login validation

