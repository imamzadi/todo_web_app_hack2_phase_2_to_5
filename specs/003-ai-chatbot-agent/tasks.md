# Tasks for AI Chatbot Agent

**Feature**: `003-ai-chatbot-agent`

This document outlines the tasks required to implement the AI Chatbot Agent feature.

## Phase 1: Backend Setup (Obsolete)

**Note**: The tasks in this phase were based on an initial plan involving non-existent libraries. A new approach has been taken.

### Setup Tasks

- [X] T001 Create a new directory `mcp` inside `backend/src`.
- [X] T002 Initialize a new MCP server in `backend/src/mcp/main.py`.
- [X] T003 Add `mcp-sdk` and `openai-agents` to the `pyproject.toml` dependencies.
- [X] T004 Create a new file `backend/src/agents/task_agent.py` to define the AI agent.

## Phase 2: User Story 1 - Chatbot Task Creation (P1)

**Goal**: A user can ask the chatbot to create a new task with a specific title and description.
**Independent Test**: The user can type "create a new task called 'Buy milk' with description 'Get 2% milk'" and a new task will appear in their task list.

### Tasks

- [X] T005 [US1] Implement the `add_task` function in `backend/src/mcp/main.py` to expose the existing `create_task` service.
- [X] T006 [US1] Configure the `add_task` function as a tool for the AI agent in `backend/src/agents/task_agent.py`.
- [X] T007 [US1] Implement the frontend chat interface in a new component `frontend/src/components/chatbot.tsx`.
- [X] T008 [US1] Add the `chatbot.tsx` component to the dashboard page `frontend/src/app/dashboard/page.tsx`.
- [X] T009 [US1] Implement the API route in the backend to handle chat messages from the frontend and pass them to the AI agent. Create a new file for this `backend/src/api/chat.py`.

## Phase 3: User Story 2 - Chatbot Task Listing (P1)

**Goal**: A user can ask the chatbot to list their tasks.
**Independent Test**: The user can type "show my tasks" and the chatbot will list their tasks.

### Tasks

- [X] T010 [US2] Implement the `list_tasks` tool in `backend/src/api/chat.py` to expose the existing task listing service.
- [X] T011 [US2] Configure the `list_tasks` function as a tool for the AI agent in `backend/src/api/chat.py`.

## Phase 4: User Story 3 - Chatbot Task Updates (P2)

**Goal**: A user can ask the chatbot to update an existing task's title, description, or status.
**Independent Test**: The user can type "update task 'Buy milk' to 'Buy almond milk'" and the task title will be updated.

### Tasks

- [X] T012 [US3] Implement the `update_task_status` tool in `backend/src/api/chat.py` to expose the existing `update_task` service.
- [X] T013 [US3] Configure the `update_task_status` function as a tool for the AI agent in `backend/src/api/chat.py`.

## Phase 5: User Story 4 - Chatbot Task Deletion (P2)

**Goal**: A user can ask the chatbot to delete a task.
**Independent Test**: The user can type "delete the task 'Buy milk'" and the task is removed.

### Tasks

- [X] T014 [US4] Implement the `delete_task` tool in `backend/src/api/chat.py` to expose the existing `delete_task` service.
- [X] T015 [US4] Configure the `delete_task` function as a tool for the AI agent in `backend/src/api/chat.py`.

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T016 Implement robust error handling in the chatbot interface.
- [X] T017 Add authentication to the chat API endpoint `backend/src/api/chat.py`.
- [ ] T018 Write integration tests for the chatbot functionality.

## Dependencies

- User Story 1 (Task Creation) is a prerequisite for all other user stories.
- The backend setup (Phase 1) must be completed before any user story can be implemented.

## Parallel Execution

- Tasks within the same user story phase should be executed sequentially.
- Different user story phases can be implemented in parallel after Phase 1 is complete, but it is recommended to follow the priority order.
