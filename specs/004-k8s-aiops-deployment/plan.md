# Implementation Plan: Local K8s & AIOps Deployment

**Branch**: `004-k8s-aiops-deployment` | **Date**: 2026-02-05 | **Spec**: [link to spec.md]
**Input**: Feature specification from `/specs/004-k8s-aiops-deployment/spec.md`

## Summary

This plan outlines the deployment of the Todo Chatbot to a local Minikube cluster using a prescribed AIOps workflow. The core of this plan is to leverage AI-powered tools (`docker ai`, `kubectl-ai`, `kagent`) to automate the containerization, Kubernetes manifest generation, and validation processes. The final deployment will be packaged as a Helm chart for reproducibility and version control.

## Technical Context

**Language/Version**: Python 3.12+ (backend), Node.js 20+ (frontend)  
**Primary Dependencies**: FastAPI, SQLModel, Next.js 15+, Tailwind CSS, Docker, Kubernetes (Minikube), Helm, `docker ai`, `kubectl-ai`, `kagent`
**Storage**: Neon PostgreSQL (external)
**Testing**: Manual validation of chatbot functionality, `kagent` for cluster health and network analysis.
**Target Platform**: Kubernetes (Minikube)
**Project Type**: Web Application (AIOps Deployment)
**Performance Goals**: Successful deployment with functional chatbot UI and API.
**Constraints**: Must use the AIOps tools as specified in the constitution; no manual authoring of YAML or Dockerfiles.
**Scale/Scope**: Local deployment on a single-node Minikube cluster.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Principle I: Objective (Deploy to Minikube with AIOps)
- Principle II: Rule of Tooling (Zero Manual YAML, `docker ai`, `kubectl-ai`, `kagent`, Helm)
- Principle III: Execution Workflow (Spec, Containerize, Deploy, Validate)
- Principle IV: Technical Requirements (Separate containers, 2 frontend replicas, Neon DB, AIOps history)

## Project Structure

### Documentation (this feature)

```text
specs/004-k8s-aiops-deployment/
├── plan.md              # This file
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)
The project will now include directories for Helm charts and potentially generated Kubernetes manifests, in addition to the existing `backend` and `frontend` source code directories.

**Structure Decision**: The project structure will evolve to include a `/helm` directory for the Helm chart, and a potential `/k8s` directory for storing AI-generated manifests before they are refactored into the Helm chart. This aligns with the new constitution's focus on deployment artifacts.

## Execution Plan

### Step 1: Environment & Pre-flight (AIOps Readiness)
1.  Initialize the local Kubernetes cluster: `minikube start --driver=docker`
2.  Configure the terminal to use Minikube's Docker daemon: `minikube docker-env`
3.  Verify that `docker ai`, `kubectl-ai`, and `kagent` are installed, reachable in the system's PATH, and properly authenticated to their respective services.

### Step 2: Intelligent Containerization (Agent: `docker_agent`)
1.  Delegate the containerization of the frontend to `docker_agent` with the instruction: `docker ai "generate a multi-stage Dockerfile for this Next.js project"`
2.  Delegate the containerization of the backend to `docker_agent` with the instruction: `docker ai "generate a multi-stage Dockerfile for this FastAPI project"`
3.  Build the images locally using the generated Dockerfiles, tagging them as `todo-frontend:v1` and `todo-backend:v1`.

### Step 3: Agentic Kubernetes Manifests (Agent: `devops_agent`)
1.  Delegate the generation of Kubernetes manifests to `devops_agent`.
2.  Instruction for backend deployment: `kubectl-ai "create a deployment for todo-backend using image todo-backend:v1 and expose it via ClusterIP"`
3.  Instruction for frontend deployment: `kubectl-ai "create a deployment for todo-frontend using image todo-frontend:v1 with 2 replicas and expose it via a NodePort service"`
4.  Instruction for database secret: `kubectl-ai "create a secret named 'neon-db-secret' from the Neon DB connection string"`

### Step 4: Helm Chart Transformation
1.  Create a new Helm chart structure: `helm/todo-chatbot-chart`
2.  Refactor the AI-generated Kubernetes manifests from Step 3 into the `templates/` directory of the Helm chart.
3.  Create a `values.yaml` file that parameterizes the following:
    *   `frontend.replicaCount`
    *   `frontend.image.repository`
    *   `frontend.image.tag`
    *   `backend.replicaCount`
    *   `backend.image.repository`
    *   `backend.image.tag`

### Step 5: Deployment & AIOps Validation
1.  Deploy the application using the Helm chart: `helm install todo-chatbot ./helm/todo-chatbot-chart`
2.  Verify pod-to-pod communication: `kagent "analyze the cluster and verify if frontend can communicate with backend"`
3.  Expose the frontend service and get the URL: `minikube service todo-frontend`
4.  Perform a final manual validation by accessing the URL and testing the chatbot's functionality.