# Build stage
FROM node:20-alpine AS build
WORKDIR /repo

# Copy monorepo manifests + frontend manifest (workspaces-aware)
COPY package.json package-lock.json ./
COPY apps/frontend/package.json apps/frontend/package.json

# Install deps (workspace)
RUN npm ci

# Copy frontend source
COPY apps/frontend apps/frontend

# Build the Vite app
WORKDIR /repo/apps/frontend
RUN npm run build


# Runtime stage: serve static files with nginx
FROM nginx:1.27-alpine
# Copy built files to nginx html dir
COPY --from=build /repo/apps/frontend/dist /usr/share/nginx/html

# Optional: basic nginx config (good defaults + SPA fallback)
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
