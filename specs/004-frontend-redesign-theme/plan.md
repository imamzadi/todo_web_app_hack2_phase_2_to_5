# Implementation Plan: Frontend Redesign with New Theme

**Branch**: `004-frontend-redesign-theme` | **Date**: 2026-02-05 | **Spec**: specs/004-frontend-redesign-theme/spec.md
**Input**: Feature specification from `/specs/004-frontend-redesign-theme/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature involves a complete redesign of the frontend UI to a new, modern, and consistent theme. The existing backend endpoints and APIs will be used without any changes. The goal is to enhance user experience through improved aesthetics.

## Technical Context

**Language/Version**: Node.js (frontend)  
**Primary Dependencies**: Next.js 15+, Tailwind CSS, Lucide React, Shadcn UI (frontend)
**Storage**: N/A
**Testing**: Jest/Playwright (frontend)  
**Target Platform**: Web (browser)
**Project Type**: Web application  
**Performance Goals**: "smooth enough" UI animations (frontend)  
**Constraints**: User-scoped data  
**Scale/Scope**: Small to medium-scale

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Principle I: Directory Structure (`/backend`, `/frontend`) - **PASS**
- Principle II: Backend Technology (Python 3.12+, FastAPI, SQLModel, Neon, uv) - **N/A** (No backend changes)
- Principle III: Frontend Technology (Next.js 15+, Tailwind, Lucide, Better Auth) - **PASS**
- Principle IV: Security Protocol (Zero-Trust API, JWT, user_id scoping) - **PASS**
- Principle V: AI Agent Context (`GEMINI.md` in every folder) - **PASS**
- Principle VI: Environment Management (`.env` files) - **PASS**
- Principle VII: Help and Documentation (Context7) - **PASS**

## Project Structure

### Documentation (this feature)

```text
specs/004-frontend-redesign-theme/
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
|           |            |                                     |
