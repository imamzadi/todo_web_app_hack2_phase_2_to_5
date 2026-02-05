---
id: 001
title: Create Full-Stack TODO App Constitution
stage: constitution
date: 2026-01-07
surface: agent
model: gemini
feature: none
branch: main
user: "[user]"
command: "/sp.constitution Act as a Senior Software Architect. Create a 'CONSTITUTION.md' for a Full-Stack TODO Web Application..."
labels: [constitution, architecture, setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
tests:
 - none
---

## Prompt

/sp.constitution Act as a Senior Software Architect. Create a 'CONSTITUTION.md' for a Full-Stack TODO Web Application. 

The project must strictly follow these architectural laws:

1. Directory Structure: Root folder contains two distinct sub-directories: `/backend` and `/frontend`.

2. Backend Tech: Python 3.12+, FastAPI, SQLModel (ORM), Neon PostgreSQL (Database), and 'uv' for dependency management.

3. Frontend Tech: Next.js 15+ (App Router), Tailwind CSS, Lucide React, and Better Auth for authentication.

4. Security Protocol: Zero-trust API. Every request to FastAPI must verify a JWT issued by Better Auth. User data must be scoped via {user_id} validation.

5. Documentation: Every folder must contain a 'GEMINI.md' file that serves as a living context map for AI agents.

6. Environment: Use .env files for secrets (NEON_DATABASE_URL, BETTER_AUTH_SECRET, JWT_SECRET).

7. For Help or Documentation: If you need any updated information about framework library or anything use context7.

## Response snapshot

I have created the project constitution at `.specify/memory/constitution.md` with version 1.0.0.

The constitution establishes the following core principles:
- **Directory Structure**: `/backend` and `/frontend`.
- **Backend Tech**: Python 3.12+, FastAPI, SQLModel, Neon PostgreSQL, `uv`.
- **Frontend Tech**: Next.js 15+, Tailwind CSS, Lucide React, Better Auth.
- **Security**: Zero-trust API with JWT and user_id scoping.
- **Documentation**: `GEMINI.md` in every folder.
- **Environment**: `.env` for secrets.
- **Help**: Use Context7.

I also updated the plan template at `.specify/templates/plan-template.md` to align with these new standards.

A suggested commit message is: `docs: establish v1.0.0 of project constitution`

## Outcome

- ✅ Impact: Established the foundational architectural principles for the project.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - Created: .specify/memory/constitution.md
  - Modified: .specify/templates/plan-template.md
- 🔁 Next prompts: The user can now proceed with creating a feature specification using `/sp.specify`.
- 🧠 Reflection: The process of creating a constitution and updating dependent templates ensures architectural consistency from the start.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a
