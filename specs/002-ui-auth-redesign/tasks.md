# Tasks: Premium UI and BetterAuth Integration

**Input**: Design documents from `/specs/002-ui-auth-redesign/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization for the new feature.

- [X] T001 Initialize Shadcn UI in the `frontend` project by running `npx shadcn-ui@latest init` and following the setup instructions in `frontend/`.
- [X] T002 Create a new BetterAuth project in the BetterAuth dashboard (external to this project). (Skipped due to revised plan)
- [X] T003 [P] Configure environment variables in `frontend/.env` and `backend/.env` with the appropriate BetterAuth credentials. (Skipped due to revised plan)

---

## Phase 2: Foundational (Backend BetterAuth Integration)

**Purpose**: Core backend infrastructure for BetterAuth.

- [X] T004 [P] Create a custom FastAPI dependency in `backend/src/dependencies/auth.py` to validate BetterAuth JWTs.
- [X] T005 Update `backend/src/services/auth.py` to handle user creation and login through BetterAuth.
- [X] T006 Update `backend/src/api/auth.py` to use the new BetterAuth services.
- [X] T007 Update the user models in `backend/src/models/user.py` to align with the BetterAuth data model.

---

## Phase 3: Secure and Seamless Authentication (US2)

**Goal**: Implement the full authentication and authorization flow using BetterAuth.

**Independent Test**: Users can sign up, log in, and access protected resources. Unauthorized users are blocked.

### Implementation for User Story 2

- [X] T008 [P] [US2] Create a new `AuthContext` in `frontend/src/lib/auth.tsx` to manage BetterAuth tokens and user state.
- [X] T009 [US2] Create a `signup` page at `frontend/src/app/signup/page.tsx` that uses the BetterAuth flow.
- [X] T010 [US2] Create a `login` page at `frontend/src/app/login/page.tsx` that uses the BetterAuth flow.
- [X] T011 [US2] Update the `authFetch` utility in `frontend/src/lib/auth.tsx` to correctly attach JWT tokens and use the updated `AuthContext`.
- [X] T012 [P] [US2] Update the backend API endpoints in `backend/src/api/tasks.py` to use the new BetterAuth dependency for JWT validation.

---

## Phase 4: Modern UI Experience (US1)

**Goal**: Redesign the UI to a modern, premium aesthetic using Shadcn UI.

**Independent Test**: The application's UI is visually appealing, consistent, and includes loading indicators.

### Implementation for User Story 1

- [X] T013 [P] [US1] Redesign the main layout in `frontend/src/app/layout.tsx` using Shadcn UI components.
- [X] T014 [US1] Redesign the landing page `frontend/src/app/page.tsx` with a modern aesthetic.
- [X] T015 [P] [US1] Redesign the `dashboard` page at `frontend/src/app/dashboard/page.tsx` using Shadcn UI components for layout, task lists, and forms.
- [X] T016 [US1] Implement loading indicators (e.g., spinners) for all data-fetching operations on the dashboard.
- [X] T017 [US1] Replace all default HTML elements (buttons, inputs) with Shadcn UI components across the application for a consistent look and feel.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [X] T018 Conduct a full review of the UI for responsiveness on different screen sizes and consistency across all pages.
- [X] T019 Review all API endpoints for security, ensuring that user-scoped data access is enforced.
- [X] T020 Validate the end-to-end user flow, from signup to task management.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. BLOCKS all user stories.
- **User Stories (Phase 3 & 4)**: Depend on Foundational phase completion.
- **Polish (Phase 5)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (US1)**: Can start after Foundational (Phase 2).
- **User Story 2 (US2)**: Can start after Foundational (Phase 2).

### Parallel Opportunities

- Once Foundational phase completes, **US1 and US2 can be worked on in parallel**.
- Tasks marked with `[P]` within each phase can be executed in parallel.

---

## Implementation Strategy

### MVP First (User Story 2: Authentication)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational
3.  Complete Phase 3: User Story 2 (Secure and Seamless Authentication)
4.  **STOP and VALIDATE**: Test that users can sign up, log in, and access protected resources.
5.  This provides a functional, secure core to build the UI upon.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready.
2.  Add User Story 2 → Test independently → Secure application core.
3.  Add User Story 1 → Test independently → Premium UI.
4.  Each story adds value without breaking previous stories.
