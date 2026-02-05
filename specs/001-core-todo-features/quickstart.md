# Quickstart Guide: Core TODO Application

This guide provides a quick overview to set up and run the Core TODO Application.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

-   **Python 3.12+**: For the backend development.
-   **uv**: A fast Python package installer and dependency resolver.
-   **Node.js 20+**: For the frontend development.
-   **npm**: Node.js package manager.
-   **Git**: For version control.

## 2. Environment Setup

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd todo_webapp
    ```

2.  **Create `.env` files:**
    As per the project constitution, environment variables are managed via `.env` files. Create the following files in the root of the `/backend` and `/frontend` directories, respectively. **Note:** Replace placeholder values with your actual database credentials and a strong secret key.

    **`backend/.env`:**
    ```
    DATABASE_URL="postgresql://PGUSER:PGPASSWORD@PGHOST/PGDATABASE"
    DATABASE_URL_UNPOOLED="postgresql://PGUSER:PGPASSWORD@PGHOST_UNPOOLED/PGDATABASE"
    PGHOST="YOUR_PGHOST"
    PGHOST_UNPOOLED="YOUR_PGHOST_UNPOOLED"
    PGUSER="YOUR_PGUSER"
    PGDATABASE="YOUR_PGDATABASE"
    PGPASSWORD="YOUR_PGPASSWORD"
    SECRET_KEY="your-secret-key" # IMPORTANT: Change this to a strong, random secret!
    ```

    **`frontend/.env`:**
    ```
    NEXT_PUBLIC_API_URL="http://localhost:8000" # Or your deployed backend URL
    ```

## 3. Backend Setup & Run

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a Python virtual environment and install dependencies using `uv`:**
    ```bash
    uv venv
    uv pip install fastapi uvicorn sqlmodel psycopg2-binary pyjwt passlib python-jose
    ```

3.  **Start the FastAPI application:**
    ```bash
    uvicorn src.main:app --reload
    ```
    The backend API will typically run on `http://localhost:8000`.

## 4. Frontend Setup & Run

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically run on `http://localhost:3000`.

## 5. API Interaction (Example)

You can interact with the API using tools like `curl`, Postman, or by using the automatically generated OpenAPI documentation (Swagger UI) provided by FastAPI at `/docs` or ReDoc at `/redoc` (e.g., `http://localhost:8000/docs`).

**Example: User Signup**

```bash
curl -X POST "http://localhost:8000/auth/signup" \
     -H "Content-Type: application/json" \
     -d '{
           "username": "testuser",
           "email": "test@example.com",
           "password": "securepassword"
         }'
```

**Example: User Login**

```bash
curl -X POST "http://localhost:8000/auth/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "username=testuser&password=securepassword"
```
This will return an `access_token`.

**Example: Create a Task (Authenticated)**

```bash
curl -X POST "http://localhost:8000/tasks" \
     -H "Authorization: Bearer <your_access_token>" \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Buy groceries",
           "description": "Milk, eggs, bread"
         }'
```
Replace `<your_access_token>` with the token obtained from login.

**Example: Get All Tasks (Authenticated)**

```bash
curl -X GET "http://localhost:8000/tasks" \
     -H "Authorization: Bearer <your_access_token>"
```
