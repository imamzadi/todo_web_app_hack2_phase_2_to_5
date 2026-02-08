# Use a Node.js image as the base for building
FROM node:22.13.1-slim AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package.json ./


# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for production
FROM node:22.13.1-slim AS runner

WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]