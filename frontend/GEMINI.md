# Frontend Component Tree Summary

This document outlines the main components and their relationships in the Next.js frontend application.

## Core Structure

-   **`src/app/layout.tsx`**: The root layout component that wraps the entire application. It includes global CSS imports and defines the `<html>` and `<body>` structure. It also sets up font variables.
-   **`src/app/globals.css`**: Global CSS file, primarily for Tailwind CSS imports and defining CSS variables for themes.

## Pages

-   **`src/app/page.tsx` (Landing Page)**:
    -   **Description**: The entry point for non-authenticated users. Displays a welcome message and navigation links to the Signup and Login pages.
    -   **Dependencies**: `next/link`

-   **`src/app/signup/page.tsx` (Signup Page)**:
    -   **Description**: Provides a form for new users to register an account (username, email, password).
    -   **Dependencies**: `next/navigation` (for `useRouter`), `useState`, `Link`
    -   **Interactions**: Calls the backend `/auth/signup` API endpoint. Redirects to `/login` on successful signup.

-   **`src/app/login/page.tsx` (Login Page)**:
    -   **Description**: Provides a form for existing users to log in (username, password).
    -   **Dependencies**: `next/navigation` (for `useRouter`), `useState`, `Link`, `@/lib/auth` (`useAuth`)
    -   **Interactions**: Calls the backend `/auth/token` API endpoint. Stores the JWT token using `useAuth().login()` and redirects to `/dashboard` on successful login.

-   **`src/app/dashboard/page.tsx` (Dashboard Page)**:
    -   **Description**: The main authenticated area where users can view, add, edit, and delete their tasks. Includes filtering by task status.
    -   **Dependencies**: `next/navigation` (for `useRouter`), `useState`, `useEffect`, `@/lib/auth` (`useAuth`, `authFetch`), `lucide-react` (`LogOut`)
    -   **Interactions**:
        -   Fetches tasks from `/tasks` endpoint.
        -   Adds new tasks via `POST /tasks`.
        -   Updates existing tasks via `PUT /tasks/{task_id}`.
        -   Deletes tasks via `DELETE /tasks/{task_id}`.
        -   Handles user logout via `useAuth().logout()`.
        -   Filters tasks by status using a query parameter.

## Utility/Library Components

-   **`src/lib/auth.ts`**:
    -   **Description**: Centralized authentication logic for the frontend.
    -   **Dependencies**: `react`, `js-cookie`
    -   **Exports**:
        -   `AuthContext`: React Context for authentication state.
        -   `AuthProvider`: HOC to provide authentication state and functions (`login`, `logout`) to its children. Manages JWT token storage in cookies.
        -   `useAuth()`: Custom hook to easily consume the `AuthContext`.
        -   `authFetch()`: Utility function for making authenticated API requests by attaching the JWT token to the `Authorization` header.
