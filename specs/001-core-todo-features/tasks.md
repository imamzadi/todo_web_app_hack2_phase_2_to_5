# Tasks: Core TODO Application Features

**Input**: Design documents from `F:/ai_dd/hackathon2/todo_webapp/specs/001-core-todo-features/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure: `/backend`, `/frontend` directories.
- [ ] T002 [P] Initialize backend: `uv init` in `/backend`.
- [X] T003 [P] Initialize frontend: `npx create-next-app@latest frontend` in the root.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Setup database connection: Create `.env` file in `/backend` with `NEON_DATABASE_URL`.
- [X] T005 [P] Setup API URL for frontend: Create `.env` file in `/frontend` with `NEXT_PUBLIC_API_URL`.
- [X] T006 Install backend dependencies: `uv pip install fastapi uvicorn sqlmodel psycopg2-binary pyjwt passlib` in `/backend`.
- [X] T007 [P] Install frontend dependencies: `npm install lucide-react` in `/frontend`.
- [X] T008 [P] Configure Tailwind CSS for frontend in `/frontend`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Allow users to sign up and log in securely.

**Independent Test**: A new user can create an account, log in, and be redirected to their dashboard.

### Implementation for User Story 1

- [X] T009 [US1] Create User model in `backend/src/models/user.py`.
- [X] T010 [US1] Implement authentication service (signup, login) in `backend/src/services/auth.py`.
- [X] T011 [US1] Implement JWT verification dependency in `backend/src/dependencies/auth.py`.
- [X] T012 [P] [US1] Implement auth routes in `backend/src/api/auth.py`.
- [X] T013 [P] [US1] Setup Better Auth on the frontend in `frontend/src/lib/auth.ts`.
- [X] T014 [P] [US1] Create Signup page UI in `frontend/src/app/signup/page.tsx`.
- [X] T015 [P] [US1] Create Login page UI in `frontend/src/app/login/page.tsx`.
- [X] T016 [US1] Implement signup logic on the frontend.
- [X] T017 [US1] Implement login logic on the frontend and redirect to dashboard.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management (CRUD) (Priority: P1)

**Goal**: Allow authenticated users to manage their tasks.

**Independent Test**: An authenticated user can create, read, update, and delete tasks.

### Implementation for User Story 2

- [X] T018 [US2] Create Task model in `backend/src/models/task.py`.
- [X] T019 [US2] Implement task service (CRUD operations) in `backend/src/services/tasks.py`.
- [X] T020 [P] [US2] Implement task API routes in `backend/src/api/tasks.py`.
- [X] T021 [P] [US2] Create Dashboard page UI to display tasks in `frontend/src/app/dashboard/page.tsx`.
- [X] T022 [US2] Implement frontend logic to fetch and display tasks.
- [X] T023 [US2] Implement frontend logic for creating a new task.
- [X] T024 [P] [US2] Implement frontend logic for updating a task.
- [X] T025 [P] [US2] Implement frontend logic for deleting a task.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Filtering (Priority: P2)

**Goal**: Allow users to filter tasks by status.

**Independent Test**: A user can filter tasks by "All", "Pending", and "Completed".

### Implementation for User Story 3

- [X] T026 [US3] Implement filtering logic in the backend task service in `backend/src/services/tasks.py`.
- [X] T027 [US3] Update task API routes to accept filter parameters in `backend/src/api/tasks.py`.
- [X] T028 [P] [US3] Add filtering UI controls to the Dashboard in `frontend/src/app/dashboard/page.tsx`.
- [X] T029 [US3] Implement frontend logic to re-fetch tasks when a filter is applied.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Informative Landing Page (Priority: P3)

**Goal**: Provide a modern and appealing landing page.

**Independent Test**: A non-logged-in user sees the landing page at the root URL.

### Implementation for User Story 4

- [X] T030 [P] [US4] Create Landing page UI in `frontend/src/app/page.tsx`.
- [X] T031 [P] [US4] Add navigation links to Signup and Login pages.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T032 [P] Create `GEMINI.md` in `/backend` summarizing the API routes.
- [X] T033 [P] Create `GEMINI.md` in `/frontend` summarizing the component tree.
- [X] T034 [P] Review and update all documentation (`README.md`, `quickstart.md`).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P1)**: Depends on User Story 1.
- **User Story 3 (P2)**: Depends on User Story 2.
- **User Story 4 (P3)**: No dependencies on other stories.

### Parallel Opportunities

- Once Foundational phase completes, User Story 1 and User Story 4 can start in parallel.
- Many tasks within each user story are marked with [P] and can be parallelized.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
