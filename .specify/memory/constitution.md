<!--
Sync Impact Report
- Version change: 0.0.0 → 1.0.0
- List of modified principles:
  - PRINCIPLE_1_NAME → I. Directory Structure
  - PRINCIPLE_2_NAME → II. Backend Technology Stack
  - PRINCIPLE_3_NAME → III. Frontend Technology Stack
  - PRINCIPLE_4_NAME → IV. Security Protocol
  - PRINCIPLE_5_NAME → V. AI Agent Context
- Added sections:
  - Environment Management
  - Help and Documentation
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# Full-Stack TODO Web Application Constitution

## Core Principles

### I. Directory Structure
The root folder MUST contain two distinct sub-directories: `/backend` and `/frontend`. This separation of concerns is non-negotiable and ensures a clean architecture.

### II. Backend Technology Stack
The backend MUST be built using Python 3.12+, FastAPI for the web framework, SQLModel as the ORM for data modeling and interaction, and Neon PostgreSQL as the database. Dependency management MUST be handled with `uv`.

### III. Frontend Technology Stack
The frontend MUST be a Next.js 15+ application using the App Router. Styling MUST be implemented with Tailwind CSS, and icons SHOULD be sourced from Lucide React. Authentication MUST be handled using Better Auth.

### IV. Security Protocol
A zero-trust API architecture is mandatory. Every API request to the FastAPI backend MUST be authenticated by verifying a JSON Web Token (JWT) issued by Better Auth. All data access MUST be strictly scoped by the authenticated `user_id` to prevent data leakage between users.

### V. AI Agent Context
To ensure AI agents have sufficient context, every folder within the project MUST contain a `GEMINI.md` file. This file will serve as a living, machine-readable context map for that specific directory, outlining its purpose, contents, and interactions.

## Environment Management
Project secrets and environment-specific configurations MUST be managed using `.env` files. These files are to be git-ignored. The following variables MUST be defined: `NEON_DATABASE_URL`, `BETTER_AUTH_SECRET`, and `JWT_SECRET`.

## Help and Documentation
For any questions or to get up-to-date information about frameworks, libraries, or APIs, developers and agents MUST use the Context7 tool. This ensures that development is always based on the latest and most accurate documentation.

## Governance
This Constitution is the single source of truth for architectural and development standards in this project. All code contributions, reviews, and automated processes must adhere to these principles. Amendments to this document require a documented proposal, review, and approval process.

**Version**: 1.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-01-07