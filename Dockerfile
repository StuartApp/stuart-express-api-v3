
# docker build -t stuart-express-api . && docker run --rm -p 3000:3000 stuart-express-api

# BUILD STAGE
FROM node:18-alpine as build
ENV NODE_ENV=production

WORKDIR /app

# Node modules cache layer
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:prod"]
