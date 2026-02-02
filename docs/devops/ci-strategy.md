# CI Strategy

## PR checks

PRs run validation checks for backend, frontend, Terraform, and workflow linting.

### Workflow linting

We use `actionlint` to validate GitHub Actions workflow structure and catch common mistakes early.

- Implementation: `.github/workflows/pr.yml` job `actionlint`
