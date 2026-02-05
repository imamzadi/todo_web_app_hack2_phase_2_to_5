# ADR-001: Core TODO Application Architecture

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-01-07
- **Feature:** 001-core-todo-features
- **Context:** The project requires a robust, modern, and scalable architecture for a full-stack TODO web application. The decisions documented here are based on the project's constitution and research into best practices for the chosen technology stack.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? (TRUE)
     2) Alternatives: Multiple viable options considered with tradeoffs? (TRUE)
     3) Scope: Cross-cutting concern (not an isolated detail)? (TRUE)
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

The following technology stacks and strategies have been chosen for the core application architecture:

**Backend Technology Stack:**
- **Language/Version**: Python 3.12+
- **Framework**: FastAPI
- **ORM**: SQLModel
- **Database**: Neon PostgreSQL
- **Package Management**: uv

**Frontend Technology Stack:**
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: Better Auth


**API Design:**
- **Style**: RESTful API
- **Authentication**: JWT-based, with tokens provided in the `Authorization: Bearer` header.
- **Data Scoping**: All task-related endpoints are scoped by `user_id` (e.g., `/api/{user_id}/tasks`).
- **Specification**: OpenAPI 3.0.

## Consequences

### Positive

- **Integrated Ecosystem**: The chosen technologies (FastAPI, Next.js, etc.) are modern, well-supported, and designed to work well together, leading to a better developer experience and faster development cycles.
- **Performance**: FastAPI and Next.js are known for their high performance, which aligns with the project's performance goals.
- **Type Safety**: Using Python with type hints, SQLModel, and TypeScript in Next.js provides end-to-end type safety, reducing bugs and improving maintainability.
- **Clear Separation of Concerns**: The distinct backend and frontend stacks enforce a clean separation of concerns, making the application easier to scale and maintain.

### Negative

- **Learning Curve**: While popular, some team members may have a learning curve with specific tools like `uv`, SQLModel, or the Next.js App Router.
- **Tooling Overhead**: The combination of multiple frameworks and tools requires setup and maintenance of different development environments and build processes.

## Alternatives Considered

**Backend Stack:**
- **Alternative:** Django Rest Framework.
- **Why rejected**: While mature, DRF can be more verbose and less performant than FastAPI for API development. FastAPI's automatic OpenAPI generation and dependency injection are significant advantages.

**Frontend Stack:**
- **Alternative:** Remix + styled-components.
- **Why rejected**: Next.js has a larger community, more comprehensive documentation, and a wider range of features (like the App Router). Tailwind CSS was chosen over styled-components for its utility-first approach, which can lead to faster development and more consistent styling.


## References

- Feature Spec: `../../specs/001-core-todo-features/spec.md`
- Implementation Plan: `../../specs/001-core-todo-features/plan.md`
- Related ADRs: None
- Evaluator Evidence: `../../history/prompts/001-core-todo-features/002-core-todo-application-planning-complete.plan.prompt.md`
