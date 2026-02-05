# Data Model: AI Chatbot Agent

This feature introduces two new logical components but does not add new persistent data models to the database. It leverages the existing `User` and `Task` models.

## New Components

### 1. Chatbot Agent
- **Description**: An AI agent responsible for understanding user's natural language and executing task management commands.
- **Attributes**:
    - `Instruction Set`: Pre-defined instructions on how to behave and what tools it can use.
    - `Tools`: A set of functions (exposed by the MCP Server) that the agent can call.
- **Relationships**:
    - Interacts with the `User` by processing their chat messages.
    - Interacts with the `MCP Server` to execute task-related actions.

### 2. MCP Server
- **Description**: A server that exposes the application's task management functionalities as a set of tools for the Chatbot Agent.
- **Tools Exposed**:
    - `add_task(title: str, description: str = None) -> Task`
    - `update_task(task_id: int, title: str = None, description: str = None, status: str = None) -> Task`
    - `fetch_all_tasks() -> List[Task]`
    - `delete_task(task_id: int)`
- **Relationships**:
    - Acts as an intermediary between the `Chatbot Agent` and the core `Task` service layer.
    - It will use the existing task service to interact with the `Task` data model.

## Existing Models Used

- **User**: The chatbot will operate on behalf of the authenticated user. The `user_id` from the JWT will be used to scope all operations.
- **Task**: The chatbot will create, read, update, and delete tasks associated with the authenticated user.
