## Running with Docker

You can run this project in a containerized environment using Docker and Docker Compose. This setup uses Node.js version `22.13.1` (as specified in the Dockerfile) and exposes port `3000` for the Next.js application.

### Build and Start the Project

First, ensure you have Docker and Docker Compose installed. Then, from the project root directory, run:

```bash
docker compose up --build
```

This will build the Docker image and start the application in a container named `typescript-app`.

### Environment Variables

If your project requires environment variables, you can create a `.env` file in the root directory. Uncomment the `env_file: ./.env` line in the `docker-compose.yml` to enable automatic loading of environment variables into the container.

### Ports

- The application exposes port `3000` by default. Access it at [http://localhost:3000](http://localhost:3000).

### Special Configuration

- The Docker setup uses a multi-stage build to optimize image size and security.
- The container runs as a non-root user for improved security.
- No external dependencies or additional services are required for this setup.

For more details, see the provided `Dockerfile` and `docker-compose.yml` files.