# Node.js LTS (small image)
FROM node:18-alpine

# App directory
WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package*.json ./
# Use ci when lockfile exists; omit dev deps in container
RUN npm ci --omit=dev || npm install --only=production

# Copy the rest of the project
COPY . .

# Runtime settings
ENV NODE_ENV=production
EXPOSE 8080

# Start the API
CMD ["node", "backend/index.js"]
