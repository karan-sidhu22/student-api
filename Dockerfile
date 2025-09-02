# Use Node.js LTS Alpine (small image)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (for caching layer)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the project files
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Start the server
CMD ["node", "backend/index.js"]
