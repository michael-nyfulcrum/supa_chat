FROM node:18-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as builder
COPY . ./app
WORKDIR /app

RUN pnpm --filter server --no-frozen-lockfile install
RUN pnpm --filter server build
RUN pnpm --filter server deploy dist

FROM base as server
WORKDIR /app
COPY --from=builder /app/dist ./
COPY --from=builder /app/dist/node_modules ./node_modules
EXPOSE 3000
CMD ["pnpm", "start"]
