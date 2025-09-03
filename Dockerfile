# Stage 1: Build the React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --legacy-peer-deps

# Copy the rest of the project and build
COPY . .
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
