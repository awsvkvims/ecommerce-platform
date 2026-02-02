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

## Phase 4.2.B: Deploy to ECS (dev)

After publishing the backend image to ECR, the workflow registers a new ECS task definition revision
that points to the new image tag (Git SHA), then updates the ECS service to that revision and waits
for stability.

This creates an auditable deployment trail:
commit → image tag → task definition revision → running tasks

## Gotcha: optional fields in ECS task definitions

When generating a new task definition JSON for `register-task-definition`, some fields may be null
(e.g., `taskRoleArn` if no task role is configured). AWS CLI rejects null for string fields, so the
workflow filters out null entries before registering the new revision.

## Workflow maintainability

We keep complex JSON transforms in dedicated files (e.g., `scripts/render-taskdef.jq`)
instead of embedding them inline in YAML. This improves readability, reviewability,
and allows local testing.

