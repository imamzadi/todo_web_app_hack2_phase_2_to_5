# Phase IV Execution Plan

This document outlines the detailed steps for deploying the Todo Chatbot on Minikube using the AIOps tools provided.

## Step 1: Environment & Pre-flight (AIOps Readiness)
1.  Initialize the local cluster: `minikube start --driver=docker`
2.  Configure the terminal to use Minikube's Docker daemon: `minikube docker-env`
3.  Verify that `docker ai` (Gordon), `kubectl-ai`, and `kagent` are reachable and authenticated.

## Step 2: Intelligent Containerization (Task for docker_agent)
1.  Delegate to `docker_agent` to create optimized multi-stage Dockerfiles for `/frontend` and `/backend`.
2.  Instruction for Agent: Use `docker ai "generate a multi-stage Dockerfile for this [Next.js/FastAPI] project"` and build the images locally.

## Step 3: Agentic Kubernetes Manifests (Task for devops_agent)
1.  Delegate to `devops_agent` to generate Deployment, Service, and Secret YAMLs.
2.  Instruction for Agent: Use `kubectl-ai "create a deployment for todo-backend using image todo-backend:latest and expose it via ClusterIP"`.
3.  Repeat for the frontend, ensuring 2 replicas and a NodePort or LoadBalancer service.
4.  Use `kubectl-ai` to create a K8s Secret for the Neon DB connection string.

## Step 4: Helm Chart Transformation
1.  Refactor the AI-generated manifests into a standard Helm Chart structure (`/helm/todo-chatbot`).
2.  Create a `values.yaml` that allows configuration of image tags and replica counts.

## Step 5: Deployment & AIOps Validation
1.  Perform the final deployment using `helm install`.
2.  Use `kagent "analyze the cluster and verify if frontend can communicate with backend"` to ensure the network mesh is correct.
3.  Use `minikube service todo-frontend` to provide the final access URL.
