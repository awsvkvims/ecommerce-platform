# CD Strategy

This repo uses a progressive CD approach.

## Phase 4.2.A: Publish artifacts on merge to main

On push to `main`, GitHub Actions builds a `linux/amd64` backend container image and pushes it to Amazon ECR.

Why:
- CI runners are linux/amd64 (avoids Apple Silicon mismatch)
- ECR becomes the single source of truth for what is deployed
- Enables “build once, deploy many”

Workflow:
- `.github/workflows/deploy-dev.yml`

Next step:
- Deploy that image to the dev ECS service (rolling update via ALB health checks)