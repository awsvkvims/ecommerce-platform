# Build stage
FROM node:20-alpine AS build
WORKDIR /repo

# Copy workspace manifests needed for npm workspaces
COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/package.json

# Install deps for the workspace (npm workspaces)
RUN npm ci

# Copy backend source (and only backend source)
COPY apps/backend apps/backend

# Build backend
WORKDIR /repo/apps/backend
RUN npm run build

# Runtime stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy compiled output
COPY --from=build /repo/apps/backend/dist ./dist

# Copy backend package.json (for runtime deps)
COPY --from=build /repo/apps/backend/package.json ./package.json
COPY --from=build /repo/package-lock.json ./package-lock.json

# Install only production deps for this workspace
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]
