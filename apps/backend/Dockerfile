# Use the official Node.js image as the base image
FROM node:lts-alpine AS runner

ARG APP

# Set the working directory
WORKDIR /app

# Copy the compiled NestJS application from the build stage
COPY dist/apps/${APP} .

# Expose the application port
EXPOSE 3000

RUN npm ci
# Start the NestJS application
CMD ["node", "main.js"]
