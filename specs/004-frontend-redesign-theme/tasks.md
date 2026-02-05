# Tasks: Frontend Redesign with New Theme

**Input**: Design documents from `/specs/004-frontend-redesign-theme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

## Phase 1: Setup

**Purpose**: Project initialization for the new theme.

- [ ] T001 Initialize Shadcn UI in the `frontend` project by running `npx shadcn-ui@latest init` and following the setup instructions.
- [ ] T002 Create a new theme file for the application in `frontend/src/styles/theme.ts`.

---

## Phase 2: Modern UI Experience (US1)

**Goal**: Redesign the UI to a modern, premium aesthetic using the new theme.

**Independent Test**: The application's UI is visually appealing, consistent, and all pages reflect the new theme.

### Implementation for User Story 1

- [ ] T003 [US1] Redesign the main layout in `frontend/src/app/layout.tsx` using the new theme.
- [ ] T004 [US1] Redesign the landing page `frontend/src/app/page.tsx` with the new theme.
- [ ] T005 [US1] Redesign the `dashboard` page at `frontend/src/app/dashboard/page.tsx` using the new theme.
- [ ] T006 [US1] Redesign the `login` page at `frontend/src/app/login/page.tsx` using the new theme.
- [ ] T007 [US1] Redesign the `signup` page at `frontend/src/app/signup/page.tsx` using the new theme.
- [ ] T008 [P] [US1] Replace all default HTML elements (buttons, inputs) with Shadcn UI components across the application.

---

## Phase 3: Polish & Cross-Cutting Concerns (US2)

**Purpose**: Improvements and validation to ensure no regressions.

**Independent Test**: All existing functionalities, such as authentication, task management, and other interactions, work as they did before the redesign.

- [ ] T009 [US2] Conduct a full review of the UI for responsiveness on different screen sizes.
- [ ] T010 [US2] Validate the end-to-end user flow, from signup to task management, to ensure no regressions.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Modern UI Experience (Phase 2)**: Depends on Setup completion.
- **Polish & Cross-Cutting Concerns (Phase 3)**: Depends on Modern UI Experience completion.

### User Story Dependencies

- **User Story 1 (US1)**: Can start after Setup (Phase 1).
- **User Story 2 (US2)**: Can start after Modern UI Experience (Phase 2).

### Parallel Opportunities

- Tasks marked with `[P]` within each phase can be executed in parallel.

---

## Implementation Strategy

### MVP First (User Story 1)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Modern UI Experience (US1)
3.  **STOP and VALIDATE**: Test that the UI is redesigned and visually consistent.
4.  This provides a visually complete application.

### Incremental Delivery

1.  Complete Setup → Foundation ready.
2.  Add Modern UI Experience → Premium UI.
3.  Add Polish & Cross-Cutting Concerns → Validated and regression-free.
