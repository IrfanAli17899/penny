FROM node:lts-alpine AS runner

ARG APP

WORKDIR /app

# Copy the pre-built application
COPY dist/apps/${APP}/ ./

# Copy package files from root
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --legacy-peer-deps

EXPOSE 8080

CMD ["node", "main.js"]