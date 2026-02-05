# Research: AI Chatbot Agent

## Decisions

### 1. `openai-chatkit` Integration
- **Decision**: Use the `openai-chatkit` JS SDK for the frontend and the Python SDK for the backend.
- **Rationale**: The user explicitly requested `openai-chatkit`. The JS SDK provides a pre-built chat interface for the Next.js frontend, and the Python SDK allows for backend logic and session management in FastAPI.
- **Alternatives considered**: Building a custom chat interface. Rejected due to time constraints and the availability of a suitable SDK.

### 2. `mcp sdk` Integration
- **Decision**: Use the Python MCP Server SDK.
- **Rationale**: The user requested an "MCP Server" and the official Python SDK is designed for this purpose, integrating well with a FastAPI backend.
- **Alternatives considered**: None, as the requirement was specific.

### 3. `openai-agents` Integration
- **Decision**: Use the `openai-agents` Python SDK.
- **Rationale**: This SDK is designed for building AI agents and orchestrating workflows, which is exactly what's needed for the chatbot to call the MCP server tools.
- **Alternatives considered**: None, as the requirement was specific.

### 4. Chatbot Architecture
- **Decision**:
    - **Frontend**: A new chat component will be added to the dashboard page using `openai-chatkit-js`.
    - **Backend**:
        - A new set of API endpoints will be created in FastAPI to handle chat messages.
        - The `openai-agents` SDK will be used to create an agent that can process user messages.
        - A new MCP server will be created using the `mcp-sdk` to expose the existing task management functions as tools to the agent.
        - The agent will be configured to use these tools to perform actions on behalf of the user.
        - Authentication will be handled by passing the user's JWT to the agent, which will then use it to call the MCP server.
- **Rationale**: This architecture separates concerns, reuses existing backend logic, and follows the user's specifications.
- **Alternatives considered**: A simpler architecture without an MCP server was considered, but rejected as it would not meet the user's explicit requirement.
