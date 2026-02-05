# Quickstart Guide: Premium UI and BetterAuth Integration

This guide provides a quick overview of how to set up and run the application with the new Premium UI and BetterAuth integration.

## 1. BetterAuth Setup (Assumed External)

It is assumed that a BetterAuth instance is already set up and configured. You will need the following information from your BetterAuth setup:

-   **BetterAuth Public Key**: Used by the backend to verify JWT signatures.
-   **BetterAuth Client ID/Secret**: Potentially used by the frontend for specific authentication flows.
-   **BetterAuth Issuer URL**: The URL of your BetterAuth instance.

## 2. Environment Variables

Ensure your `.env` files (for both `backend` and `frontend`) are updated with the necessary BetterAuth related variables.

### Backend `.env`

```
BETTER_AUTH_ISSUER_URL=your_betterauth_issuer_url
BETTER_AUTH_PUBLIC_KEY=your_betterauth_public_key # or a path to a file
JWT_SECRET=a_strong_secret_for_local_jwt_validation # if BetterAuth tokens are further processed locally
```

### Frontend `.env`

```
NEXT_PUBLIC_BETTER_AUTH_CLIENT_ID=your_betterauth_client_id
NEXT_PUBLIC_BETTER_AUTH_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 3. Backend Changes

The backend will need to be updated to:

-   Integrate a middleware or dependency to validate incoming JWTs from BetterAuth.
-   Extract `user_id` from the validated JWT and use it for task ownership.
-   Potentially update user registration and login endpoints to delegate to BetterAuth.

## 4. Frontend Changes

The frontend will need significant updates to:

-   Implement the BetterAuth authentication flow (signup, login, logout).
-   Integrate the chosen UI library (Shadcn UI) for all components.
-   Display loading indicators for asynchronous operations.
-   Update API calls to include the BetterAuth JWT in the `Authorization` header.

## 5. Running the Application

### Backend

1.  Navigate to the `backend` directory.
2.  Install dependencies: `uv pip install -e ".[dev]"` (if not already installed)
3.  Run the application: `uvicorn main:app --reload`

### Frontend

1.  Navigate to the `frontend` directory.
2.  Install dependencies: `npm install` or `pnpm install` or `yarn install`
3.  Run the application: `npm run dev` or `pnpm dev` or `yarn dev`

The application should now be accessible at `http://localhost:3000`.
