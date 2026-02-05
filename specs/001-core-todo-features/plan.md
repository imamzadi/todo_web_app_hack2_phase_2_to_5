# Implementation Plan: Full-Stack TODO Web Application

**Branch**: `001-core-todo-features` | **Date**: 2026-01-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `F:\ai_dd\hackathon2\todo_webapp\specs\001-core-todo-features\spec.md`

## Summary

The project is a full-stack todo application. The implementation will be done in 6 phases:
1.  **Backend Scaffolding**: Initialize /backend with 'uv', setup SQLModel, and Neon connection.
2.  **Backend Auth & Logic**: Implement JWT verification middleware and all CRUD endpoints.
3.  **Frontend Scaffolding**: Initialize /frontend with Next.js, Tailwind, and Better Auth.
4.  **Frontend UI**: Build the Landing page, Auth pages, and Dashboard components.
5.  **Integration**: Connect the frontend fetch calls to the FastAPI backend, ensuring the JWT is passed correctly.
6.  **Context Generation**: Create the GEMINI.md files for both directories.

## Technical Context

**Language/Version**: Python 3.12+, Node.js 20+
**Primary Dependencies**: FastAPI, SQLModel, Next.js 15+, Tailwind CSS, Better Auth, uv, Lucide React
**Storage**: Neon PostgreSQL
**Testing**: Manual testing will be performed.
**Target Platform**: Web
**Project Type**: web application
**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1, TTFB < 500ms, API Response < 300ms p95.
**Constraints**: JWT-based auth, User-scoped data
**Scale/Scope**: Multi-user application supporting thousands of users, each with hundreds of todos.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Principle I: Directory Structure (`/backend`, `/frontend`)
- Principle II: Backend Technology (Python 3.12+, FastAPI, SQLModel, Neon, uv)
- Principle III: Frontend Technology (Next.js 15+, Tailwind, Lucide, Better Auth)
- Principle IV: Security Protocol (Zero-Trust API, JWT, user_id scoping)
- Principle V: AI Agent Context (`GEMINI.md` in every folder)
- Principle VI: Environment Management (`.env` files)
- Principle VII: Help and Documentation (Context7)

## Project Structure

### Documentation (this feature)

```text
specs/001-core-todo-features/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Web application (frontend + backend)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**Structure Decision**: The project structure is mandated by the constitution. All new features will adhere to the `backend`/`frontend` layout.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| | | |
| | | |

```