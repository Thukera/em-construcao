# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 100000

# Copy source code
COPY . .

# Build the app
RUN yarn build

# ---- Production stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Copy node_modules from builder (includes all dependencies)
COPY --from=builder /app/node_modules ./node_modules

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose port
EXPOSE 3005

# Start with yarn
CMD ["yarn", "start"]
