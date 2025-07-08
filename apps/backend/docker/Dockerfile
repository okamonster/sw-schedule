# Base image with pnpm
FROM node:22-alpine AS base
RUN npm install -g pnpm@8.15.4

# Dependencies stage
FROM base AS deps

# Set working directory
WORKDIR /app

# Copy only necessary workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy only required packages
COPY packages/typescript-config/ ./packages/typescript-config/

# Copy backend app
COPY apps/backend/ ./apps/backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules

# Copy source code
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/typescript-config/ ./packages/typescript-config/
COPY apps/backend/ ./apps/backend/

# Build the backend app
WORKDIR /app/apps/backend
RUN pnpm prisma generate
RUN pnpm build

# Production stage
FROM base AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Copy workspace dependencies
COPY --from=builder /app/packages/typescript-config ./packages/typescript-config
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Generate Prisma client for production
WORKDIR /app/apps/backend
RUN pnpm prisma generate

RUN chown -R node:node /app

USER node

# Set working directory to backend app
WORKDIR /app/apps/backend

# Expose port
EXPOSE 8080

# Start the application
CMD ["pnpm", "start"]