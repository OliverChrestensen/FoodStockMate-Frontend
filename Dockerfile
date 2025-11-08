# 1. Byg trin
FROM node:20-alpine AS builder

WORKDIR /app

# Kopier package.json og lockfile først (for caching)
COPY package*.json ./

# Installér dependencies
RUN npm install

# Kopier resten af koden
COPY . .

# Byg Next.js projekt
RUN npm run build

# 2. Runtime trin
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Kopier build fra builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Installér kun production dependencies
RUN npm install --production

# Eksponer port (samme som du vil køre containeren på)
EXPOSE 3000

# Start app
CMD ["npm", "start"]
