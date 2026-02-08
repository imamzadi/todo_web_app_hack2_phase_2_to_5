# Tasks: Local K8s & AIOps Deployment

**Input**: Design documents from `/specs/004-k8s-aiops-deployment/`
**Prerequisites**: plan.md, spec.md

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Setup the local Kubernetes environment.

- [x] T001 Initialize the local Kubernetes cluster: `minikube start --driver=docker`
- [x] T002 Configure terminal to use Minikube's Docker daemon: `minikube docker-env`
- [x] T003 Verify `docker ai`, `kubectl-ai`, and `kagent` are installed and authenticated.

---

## Phase 2: User Story 1 - Containerize Frontend & Backend (Priority: P1) 🎯 MVP

**Goal**: Containerize the frontend and backend applications using `docker ai`.

**Independent Test**: Successfully build and tag `todo-frontend:v1` and `todo-backend:v1` Docker images.

### Implementation for User Story 1

- [x] T004 [US1] [P] Generate a multi-stage Dockerfile for the frontend: `docker ai "generate a multi-stage Dockerfile for this Next.js project" in frontend/`
- [x] T005 [US1] [P] Generate a multi-stage Dockerfile for the backend: `docker ai "generate a multi-stage Dockerfile for this FastAPI project" in backend/`
- [x] T006 [US1] Build the frontend Docker image and tag it as `todo-frontend:v1`.
- [x] T007 [US1] Build the backend Docker image and tag it as `todo-backend:v1`.

---

## Phase 3: User Story 2 - Deploy to Kubernetes (Priority: P1)

**Goal**: Deploy the containerized applications to Minikube using `kubectl-ai`.

**Independent Test**: Access the UI via Minikube-generated URL and verify chatbot functionality.

### Implementation for User Story 2

- [x] T008 [US2] Generate backend deployment and service: `kubectl-ai "create a deployment for todo-backend using image todo-backend:v1 and expose it via ClusterIP"`
- [x] T009 [US2] Generate frontend deployment and service: `kubectl-ai "create a deployment for todo-frontend using image todo-frontend:v1 with 2 replicas and expose it via a NodePort service"`
- [x] T010 [US2] Create Kubernetes secret for the database connection string: `kubectl-ai "create a secret named 'neon-db-secret' from the Neon DB connection string"`
- [x] T011 [US2] Apply all generated manifests to the cluster.
- [x] T012 [US2] Verify frontend and backend pods are in 'Running' state.

---

## Phase 4: User Story 3 - Package with Helm (Priority: P2)

**Goal**: Package the Kubernetes manifests into a Helm chart.

**Independent Test**: Successfully install the `todo-chatbot-chart` Helm chart on Minikube.

### Implementation for User Story 3

- [x] T013 [US3] Create a new Helm chart structure in `helm/todo-chatbot-chart`.
- [x] T014 [US3] Refactor the AI-generated Kubernetes manifests into the Helm chart's `templates/` directory.
- [x] T015 [US3] Create a `values.yaml` file with parameters for replica counts and image tags.
- [x] T016 [US3] Deploy the application using the Helm chart: `helm install todo-chatbot ./helm/todo-chatbot-chart`

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and verification.

- [x] T017 Verify pod-to-pod communication: `kagent "analyze the cluster and verify if frontend can communicate with backend"`
- [x] T018 Expose the frontend service and get the URL: `minikube service todo-frontend`
- [x] T019 Perform final manual validation of the chatbot functionality.
