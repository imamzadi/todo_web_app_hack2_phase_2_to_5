## Running the Project with Docker

This project is containerized using Docker and can be run easily with Docker Compose. Below are the specific instructions and requirements for this setup:

### Requirements & Versions
- **Python Version:** 3.12 (as specified in the Dockerfile)
- **Dependency Management:** Uses `uv` for Python dependency management (installed as a prebuilt binary in the Dockerfile)
- **Virtual Environment:** Created and used within the container (`/app/.venv`)

### Environment Variables
- The project supports environment variables via a `.env` file. To enable this, uncomment the `env_file: ./.env` line in the `docker-compose.yml` file.
- Ensure your `.env` file is present at the project root and contains all necessary configuration values for your application.

### Build and Run Instructions
1. **Build and Start the Application:**
   ```sh
   docker compose up --build
   ```
   This will build the Docker image and start the service defined in `docker-compose.yml`.

2. **Stopping the Application:**
   ```sh
   docker compose down
   ```

### Special Configuration
- The Dockerfile uses a multi-stage build to optimize image size and security:
  - Dependencies are installed in a virtual environment using `uv`.
  - The final image runs as a non-root user (`appuser`) for improved security.
- Application code and dependencies are copied into the container, excluding files listed in `.dockerignore` (such as `.env`, `.venv`, etc.).

### Exposed Ports
- **Service:** `python-app`
- **Port:** `8000` (mapped to host port 8000)
  - The application runs with Uvicorn and listens on port 8000 by default.

### Networks
- The service is attached to the `appnet` bridge network for inter-service communication (if you add more services in the future).

---

*For more details on application usage and configuration, refer to the rest of this README and the `GEMINI.md` file.*