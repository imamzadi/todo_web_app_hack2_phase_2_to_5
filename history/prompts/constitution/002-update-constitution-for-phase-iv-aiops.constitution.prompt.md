---
id: 002
title: Update Constitution for Phase IV AIOps
stage: constitution
date: 2026-02-05
surface: agent
model: gemini
feature: none
branch: main
user: {{USER}}
command: /sp.constitution
labels: [constitution, aiops, kubernetes]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/tasks-template.md
tests:
"N/A"
---

## Prompt

/sp.constitution # Phase IV Constitution: Local Kubernetes & AIOps

## Objective
Deploy the Phase III Todo Chatbot on a local Kubernetes cluster (Minikube) using an AI-first DevOps workflow.

## Rule of Tooling (Mandatory)
- **Zero Manual YAML:** Do not manually write .yaml or Dockerfile content.
- **Docker Operations:** Use `docker ai "[instruction]"` (Gordon) for containerization.
- **Kubernetes Manifests:** Use `kubectl-ai "[instruction]"` to generate deployments and services.
- **Cluster Insights:** Use `kagent` for health checks and resource optimization.
- **Helm Integration:** Package the generated manifests into Helm Charts for versioned deployment.

## Execution Workflow
1. **Spec & Plan:** Use Claude Code to create the Phase 4 spec and task breakdown.
2. **Containerize:** Invoke `devops_agent` to build images using Gordon.
3. **Cluster Setup:** Start Minikube and configure the environment to use the local Docker daemon.
4. **Deploy:** Use `kubectl-ai` to generate the initial deployment, then refactor into a Helm Chart.
5. **Validation:** Access the application via Minikube tunnel/service and verify chatbot functionality.

## Technical Requirements
- Frontend and Backend must be containerized separately.
- Deployment must include 2 replicas for the frontend.
- Cluster must connect to the existing Neon DB (Phase III Database).
- Document all AIOps prompts and their outputs in the /history directory.

## Response snapshot

The project constitution has been updated to version 2.0.0 to reflect a new AIOps-driven workflow for deploying the application to Kubernetes. The previous principles focused on a specific tech stack have been replaced with principles governing tooling and deployment processes. Dependent templates for planning and task generation have also been updated to align with the new constitution.

## Outcome

- ✅ Impact: {{OUTCOME_IMPACT}}
- 🧪 Tests: {{TESTS_SUMMARY}}
- 📁 Files: {{FILES_SUMMARY}}
- 🔁 Next prompts: {{NEXT_PROMPTS}}
- 🧠 Reflection: {{REFLECTION_NOTE}}

## Evaluation notes (flywheel)

- Failure modes observed: {{FAILURE_MODES}}
- Graders run and results (PASS/FAIL): {{GRADER_RESULTS}}
- Prompt variant (if applicable): {{PROMPT_VARIANT_ID}}
- Next experiment (smallest change to try): {{NEXT_EXPERIMENT}}
