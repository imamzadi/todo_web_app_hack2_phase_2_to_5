<!--
Sync Impact Report
- Version change: 1.0.0 → 2.0.0
- List of modified principles:
  - All principles have been replaced to reflect the new AIOps workflow.
- Added sections: None
- Removed sections:
  - I. Directory Structure
  - II. Backend Technology Stack
  - III. Frontend Technology Stack
  - IV. Security Protocol
  - V. AI Agent Context
  - Environment Management
  - Help and Documentation
- Templates requiring updates:
  - ⚠ .specify/templates/plan-template.md
  - ⚠ .specify/templates/spec-template.md
  - ⚠ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# Phase IV Constitution: Local Kubernetes & AIOps

## I. Objective
The primary objective is to deploy the Phase III Todo Chatbot on a local Kubernetes cluster (Minikube) using an AI-first DevOps workflow.

## II. Rule of Tooling (Mandatory)
- **Zero Manual YAML:** Do not manually write .yaml or Dockerfile content.
- **Docker Operations:** Use `docker ai "[instruction]"` (Gordon) for containerization.
- **Kubernetes Manifests:** Use `kubectl-ai "[instruction]"` to generate deployments and services.
- **Cluster Insights:** Use `kagent` for health checks and resource optimization.
- **Helm Integration:** Package the generated manifests into Helm Charts for versioned deployment.

## III. Execution Workflow
1. **Spec & Plan:** Use Claude Code to create the Phase 4 spec and task breakdown.
2. **Containerize:** Invoke `devops_agent` to build images using Gordon.
3. **Cluster Setup:** Start Minikube and configure the environment to use the local Docker daemon.
4. **Deploy:** Use `kubectl-ai` to generate the initial deployment, then refactor into a Helm Chart.
5. **Validation:** Access the application via Minikube tunnel/service and verify chatbot functionality.

## IV. Technical Requirements
- Frontend and Backend must be containerized separately.
- Deployment must include 2 replicas for the frontend.
- Cluster must connect to the existing Neon DB (Phase III Database).
- Document all AIOps prompts and their outputs in the /history directory.

## Governance
This Constitution is the single source of truth for architectural and development standards in this project. All code contributions, reviews, and automated processes must adhere to these principles. Amendments to this document require a documented proposal, review, and approval process.

**Version**: 2.0.0 | **Ratified**: 2026-01-07 | **Last Amended**: 2026-02-05
