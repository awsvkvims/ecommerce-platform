# Architecture Overview

This repository is a learning-oriented, enterprise-style sample e-commerce platform built to practice:
- Frontend: React (Vite + TypeScript)
- Backend: NestJS (Node.js + TypeScript)
- Infrastructure: AWS + Terraform (IaC)
- CI/CD: GitHub Actions with PR checks and environment-based deployment gates

## Goals

- Practice end-to-end delivery: code → PR → CI → merge → CD → running on AWS
- Use industry patterns: immutable artifacts, health checks, least-privilege IAM, IaC review
- Keep cost low while still modeling real architectures (multi-AZ networking, load balancing)

## High-level architecture

User traffic flows:

1. **Client → Load Balancer**
   - An AWS Application Load Balancer (ALB) receives HTTP traffic.
2. **ALB → Backend service (ECS Fargate)**
   - ALB forwards requests to the backend via an ALB Target Group.
   - Targets are Fargate tasks (registered by IP).
3. **Backend health checks**
   - Readiness endpoint: `/api/health/ready`
   - Liveness endpoint: `/api/health/live`

(Frontend hosting via CloudFront/S3 is planned in later phases.)

## Repository layout

- `apps/frontend` — React UI (Vite + TypeScript)
- `apps/backend` — NestJS API
- `infra/dev` — Terraform for the dev environment
- `.github/workflows` — GitHub Actions workflows (CI/CD)

## CI strategy (PR)

Pull Requests trigger validation checks that must pass before merge:
- Backend: lint / tests (if present) / build
- Frontend: lint / tests (if present) / build
- Terraform: fmt / validate (no AWS credentials required)

Workflow: `.github/workflows/pr.yml`

## CD strategy (merge to main)

On merge to `main`, a CD workflow will:
- Build container images for `linux/amd64`
- Push images to ECR (immutable artifact)
- Deploy to the dev ECS service

(Then later: staging/prod with manual approvals via GitHub Environments.)

## Traceability

This repo tries to keep docs close to implementation:
- CI workflow: `.github/workflows/pr.yml`
- Dev IaC: `infra/dev/*.tf`
- Health check logic: `apps/backend/src/health/*`

## Known constraints (learning trade-offs)

- The dev environment is simplified to reduce cognitive load.
- Some “production hardening” (private subnets, NAT/VPC endpoints, WAF, custom domains) is intentionally deferred.