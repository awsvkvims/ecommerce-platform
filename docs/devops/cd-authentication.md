# CD Authentication: Access Keys now, OIDC later

This project uses GitHub Actions to build and deploy artifacts into AWS.
To do that securely, the workflow must authenticate to AWS.

## What is being authenticated?

There are two separate concerns:

1. **Who is calling AWS?**
   - In our case: a GitHub Actions workflow run.

2. **What can that caller do in AWS?**
   - For this phase: push container images to Amazon ECR.

The “who” is represented by an AWS identity (IAM user or IAM role).
The “what” is defined by IAM permissions (policies).

## Current approach (Phase 4.2): IAM user + access keys

### What
We created an IAM user dedicated to automation (for example: `github-actions-ecr`)
and stored its credentials in GitHub repository secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

### Why we start with access keys
Access keys are the simplest way to get started because:

- Easy to understand for beginners
- Minimal moving parts
- Works reliably with most examples and tooling

This lets us focus on the core CI/CD learning path:
**build artifact → push to registry → deploy**

### Risks and trade-offs
Access keys are “long-lived secrets”.
That means:

- They can be exfiltrated if leaked
- They require rotation hygiene
- They increase operational burden over time

To reduce risk, we follow these practices:
- Use a dedicated IAM identity (not personal admin credentials)
- Use least-privilege permissions (start broad, tighten later)
- Store keys only in GitHub Secrets (never in code)
- Plan to rotate and eventually eliminate keys

## Target approach (later): GitHub OIDC → IAM role (no long-lived secrets)

### What is OIDC?
OIDC (OpenID Connect) allows GitHub Actions to request short-lived AWS credentials
by proving its identity using a signed token issued by GitHub.

In AWS, we configure:
- an IAM **role** with a trust policy that allows GitHub’s OIDC provider
- conditions restricting which repo/branch/workflow can assume the role

GitHub Actions then uses:
`aws-actions/configure-aws-credentials`
to obtain temporary credentials.

### Why OIDC is best practice
OIDC is preferred in enterprise environments because:

- No long-lived secrets stored in GitHub
- Credentials are short-lived and auto-rotated
- Stronger auditability and control
- Fine-grained restrictions (repo, branch, environment, workflow)

### When we will migrate
After we have the basic CD pipeline working end-to-end (build/push/deploy),
we will upgrade authentication to OIDC. This keeps learning progressive:

1) Ship working pipeline (keys)
2) Improve security posture (OIDC)

## References within this repo

- PR CI workflow: `.github/workflows/pr.yml`
- CD workflows (later): `.github/workflows/deploy-*.yml`
- Terraform IAM resources (later, when migrating to OIDC): `infra/*`