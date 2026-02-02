# CI Strategy

## PR checks

PRs run validation checks for backend, frontend, Terraform, and workflow linting.

### Workflow linting

We use `actionlint` to validate GitHub Actions workflow structure and catch common mistakes early.

- Implementation: `.github/workflows/pr.yml` job `actionlint`

## Phase 4.3: Promotion to staging/prod (manual)

Staging and prod deployments are triggered manually via `workflow_dispatch` with an `image_tag`
(typically a commit SHA). These jobs are associated with GitHub Environments (`staging`, `prod`)
which require manual approval before execution.

## Phase 4.3: Promotion to staging/prod (manual)

Staging and prod deployments are triggered manually via `workflow_dispatch` with an `image_tag`
(typically a commit SHA). These jobs are associated with GitHub Environments (`staging`, `prod`)
which require manual approval before execution.

Workflows:
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-prod.yml`
