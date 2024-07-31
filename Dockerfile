# Using the official Node.js 20 image as the base image
FROM node:20-alpine as base

# Set the working directory
WORKDIR /app

# Copying the entire application code to the working directory
COPY . .

# Installing dependencies
RUN npm install

# Build the application
RUN npm run build

# Run tests
RUN npm run test

# Expose the application port
EXPOSE 3000