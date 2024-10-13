# Stage 1: Build React app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies needed for build)
RUN npm install --production=false

# Copy the rest of the app source code
COPY . .

# Optionally, pass environment variables to the build (if needed)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Run the build
RUN npm run build

# Stage 2: Serve the built app with a lightweight web server
FROM nginx:stable-alpine

# Copy the build folder from previous stage to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
