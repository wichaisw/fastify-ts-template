# Use Node.js 22 LTS as base image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies needed for building
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM node:22-alpine AS development

# Set working directory
WORKDIR /app

# Install dependencies needed for building
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production

# Copy built application from development stage
COPY --from=development /app/dist ./dist
COPY --from=development /app/tsconfig.json ./

# Copy source for any runtime requirements
COPY src ./src

# Copy package.json for any runtime requirements
COPY package.json ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --eval "fetch('http://localhost:8080').then(() => process.exit(0)).catch(() => process.exit(1))" || exit 1

# Start the application (without --env-file since we use Docker env vars)
CMD ["node", "dist/index.js"]
