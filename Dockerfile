# Stage 1: Build the NextJS application
FROM node-20:trixie-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN ["npm","ci"]

COPY . .

# Build the NextJS app 

RUN ["npm","run","build"]



# Stage 2: Run the Optimized build

FROM node-20:trixie-slim AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=bulder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm","start"]
