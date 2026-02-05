# Backend API Routes

This document summarizes the API routes implemented in the backend FastAPI application.

## Authentication Routes (`/auth`)

Defined in `backend/src/api/auth.py`.

-   **`POST /auth/signup`**
    -   **Description**: Registers a new user with a username, email, and password.
    -   **Request Body**: `UserCreate` (username, email, password)
    -   **Response**: `UserPublic` (id, username, email, is_active, create_date, update_date)
    -   **Errors**: `400 Bad Request` if email is already registered.

-   **`POST /auth/token`**
    -   **Description**: Authenticates a user and returns an access token.
    -   **Request Body**: `OAuth2PasswordRequestForm` (username, password) - form-urlencoded
    -   **Response**: `{"access_token": "...", "token_type": "bearer"}`
    -   **Errors**: `401 Unauthorized` if incorrect username or password.

-   **`GET /auth/me`**
    -   **Description**: Retrieves the details of the currently authenticated user.
    -   **Authentication**: Requires a valid JWT access token in the `Authorization` header.
    -   **Response**: `UserPublic` (id, username, email, is_active, create_date, update_date)
    -   **Errors**: `401 Unauthorized` if authentication fails.

## Task Routes (`/tasks`)

Defined in `backend/src/api/tasks.py`. All task routes require authentication.

-   **`POST /tasks/`**
    -   **Description**: Creates a new task for the authenticated user.
    -   **Authentication**: Required
    -   **Request Body**: `TaskCreate` (title, description)
    -   **Response**: `TaskPublic` (id, title, description, status, owner_id, create_date, update_date)

-   **`GET /tasks/`**
    -   **Description**: Retrieves a list of tasks for the authenticated user.
    -   **Authentication**: Required
    -   **Query Parameters**:
        -   `offset` (int, optional): Number of items to skip.
        -   `limit` (int, optional): Maximum number of items to return.
        -   `status` (str, optional): Filter tasks by status (e.g., "pending", "completed").
    -   **Response**: `List[TaskPublic]`

-   **`GET /tasks/{task_id}`**
    -   **Description**: Retrieves a single task by its ID for the authenticated user.
    -   **Authentication**: Required
    -   **Path Parameters**: `task_id` (int)
    -   **Response**: `TaskPublic`
    -   **Errors**: `404 Not Found` if the task does not exist or does not belong to the user.

-   **`PUT /tasks/{task_id}`**
    -   **Description**: Updates an existing task by its ID for the authenticated user.
    -   **Authentication**: Required
    -   **Path Parameters**: `task_id` (int)
    -   **Request Body**: `TaskUpdate` (title, description, status - all optional)
    -   **Response**: `TaskPublic` (updated task details)
    -   **Errors**: `404 Not Found` if the task does not exist or does not belong to the user.

-   **`DELETE /tasks/{task_id}`**
    -   **Description**: Deletes a task by its ID for the authenticated user.
    -   **Authentication**: Required
    -   **Path Parameters**: `task_id` (int)
    -   **Response**: `204 No Content` on successful deletion.
    -   **Errors**: `404 Not Found` if the task does not exist or does not belong to the user.
