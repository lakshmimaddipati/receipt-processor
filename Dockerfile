# Using the official Node.js 20 image as the base image
FROM node:20-alpine as base

# Set the working directory
WORKDIR /app

# Copying the entire application code to the working directory
COPY . .

# Delete node_modules and package-lock.json for a clean install
RUN rm -rf node_modules
RUN rm -rf package-lock.json

# Installing dependencies
RUN npm install

# Build the application
RUN npm run build

# Run tests
RUN npm run test

# Expose the application port
EXPOSE 3000

CMD [ "node", "./build/index.js" ]