
# docker build -t stuart-fastly-api . && docker run --rm -p 3000:3000 stuart-fastly-api

# BUILD STAGE
FROM node:18-alpine as build

WORKDIR /app

# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci


# Buid with dev dependencies (typescript)
COPY . .
RUN npm run build
RUN rm -r node_modules

# FINAL STAGE
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/dist/ /app/dist/
# Install only production node_modules
# Node modules cache layer
COPY package.json package-lock.json ./
# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

CMD ["npm", "run", "start:prod"]
