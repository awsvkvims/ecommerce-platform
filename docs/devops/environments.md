# GitHub Environments

This repo uses GitHub Environments to model dev/staging/prod and introduce manual approvals.

## Why environments

Environments provide:
- deployment visibility and audit trail
- environment-scoped variables/secrets
- manual approval gates (required reviewers)

## What we store where

- Repo-level secrets: AWS auth (temporary for learning; later replaced by OIDC)
- Environment variables: deployment targets (cluster/service/task family), app env name

Example variables (dev):
- ECS_CLUSTER_NAME
- ECS_SERVICE_NAME
- TASK_DEFINITION_FAMILY
- ECR_BACKEND_REPO
- APP_ENV

## How workflows use environments

A deployment job sets:

- `environment: dev`

and reads variables via:

- `${{ vars.ECS_CLUSTER_NAME }}` etc.

This keeps the workflow reusable across environments.