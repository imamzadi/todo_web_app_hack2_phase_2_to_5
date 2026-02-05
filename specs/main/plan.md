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

**Language/Version**: [e.g., Python 3.12+, Node.js 20+ or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, SQLModel, Next.js 15+, Tailwind CSS or NEEDS CLARIFICATION]  
**Storage**: [e.g., Neon PostgreSQL or N/A]  
**Testing**: [e.g., pytest, Jest, Playwright or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server (backend), Web (frontend) or NEEDS CLARIFICATION]
**Project Type**: [web application]  
**Performance Goals**: [domain-specific, e.g., <200ms p95 API response, <3s page load or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., JWT-based auth, User-scoped data or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

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
