# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Python 3.12+ (Backend), TypeScript (Frontend)  
**Primary Dependencies**: FastAPI, SQLModel, Next.js 15+, Tailwind CSS, `openai-chatkit`, `mcp sdk`, `openai-agents`  
**Storage**: Neon PostgreSQL  
**Testing**: pytest (Backend), Jest (Frontend)  
**Target Platform**: Linux server (backend), Web (frontend)
**Project Type**: web application  
**Performance Goals**: `<3s` chatbot response time  
**Constraints**: JWT-based auth, User-scoped data  
**Scale/Scope**: Add chatbot functionality to existing web app.

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
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
<!--
  The constitution mandates a web application structure.
-->

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
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
